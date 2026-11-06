/* =========================================================
   SoundWave — Tương tác giao diện (không cần thư viện)
   ========================================================= */
(function () {
  "use strict";

  var ICON_PLAY = "▶";
  var ICON_PAUSE = "❚❚";

  /* ---------- 1. Menu mobile ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.textContent = open ? "✕" : "☰";
    });
  }

  /* ---------- 2. Trình phát nhạc cố định ở đáy (phát âm thanh thật bằng <audio>) ---------- */
  var player = document.querySelector(".player");
  var audio = new Audio();
  audio.preload = "metadata";
  audio.src = "audio/indie.wav"; // bài mặc định: Đèn Đường Tháng Mười (Indie)
  audio.volume = 0.7;
  var state = { playing: false, source: null };

  function fmt(sec) {
    if (!isFinite(sec)) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function renderProgress() {
    if (!player) return;
    var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 + "%" : "0%";
    player.querySelectorAll(".js-progress").forEach(function (bar) {
      bar.style.width = pct;
    });
    var cur = player.querySelector(".js-current");
    var dur = player.querySelector(".js-duration");
    if (cur) cur.textContent = fmt(audio.currentTime);
    if (dur) dur.textContent = fmt(audio.duration);
  }

  audio.addEventListener("timeupdate", renderProgress);
  audio.addEventListener("loadedmetadata", renderProgress);

  function setPlayingUI() {
    if (!player) return;
    var mainBtn = player.querySelector(".js-player-toggle");
    mainBtn.textContent = state.playing ? ICON_PAUSE : ICON_PLAY;
    mainBtn.setAttribute("aria-label", state.playing ? "Tạm dừng" : "Phát");
    mainBtn.classList.toggle("is-playing", state.playing);
    player.querySelector(".player-track").classList.toggle("is-playing", state.playing);

    document.querySelectorAll("[data-play]").forEach(function (btn) {
      var active = state.playing && btn === state.source;
      btn.classList.toggle("is-playing", active);
      btn.textContent = active ? ICON_PAUSE : ICON_PLAY;
    });
  }

  function play() {
    audio.play().then(function () {
      state.playing = true;
      setPlayingUI();
    }).catch(function () {
      state.playing = false;
      setPlayingUI();
    });
  }

  function pause() {
    audio.pause();
    state.playing = false;
    setPlayingUI();
  }

  function loadTrack(btn) {
    if (!player) return;
    var d = btn.dataset;
    player.querySelector(".js-title").textContent = d.title || "SoundWave";
    player.querySelector(".js-artist").textContent = d.artist || "";
    if (d.cover) player.querySelector(".js-cover").src = d.cover;
    audio.src = d.src;
    audio.currentTime = 0;
    state.source = btn;
    renderProgress();
  }

  function skip(step) {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-play]"));
    if (!buttons.length) return;
    var idx = buttons.indexOf(state.source);
    loadTrack(buttons[(idx + step + buttons.length) % buttons.length]);
    play();
  }

  // Hết bài thì tự chuyển sang bài tiếp theo
  audio.addEventListener("ended", function () {
    skip(1);
  });

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-play]");
    if (!btn) return;
    e.preventDefault();
    if (btn === state.source) {
      state.playing ? pause() : play();
    } else {
      loadTrack(btn);
      play();
    }
  });

  if (player) {
    player.querySelector(".js-player-toggle").addEventListener("click", function () {
      state.playing ? pause() : play();
    });

    player.querySelectorAll(".js-skip").forEach(function (b) {
      b.addEventListener("click", function () {
        skip(b.dataset.dir === "prev" ? -1 : 1);
      });
    });

    // Bấm vào thanh tiến trình để tua
    var seek = player.querySelector(".progress-bar");
    if (seek) {
      seek.addEventListener("click", function (e) {
        if (!audio.duration) return;
        var rect = seek.getBoundingClientRect();
        audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
      });
    }

    // Thanh âm lượng
    var volume = document.getElementById("volume");
    if (volume) {
      volume.addEventListener("input", function () {
        audio.volume = volume.value / 100;
      });
    }
    renderProgress();
  }

  /* ---------- 3. Nút Theo dõi / Yêu thích ---------- */
  document.querySelectorAll("[data-follow]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var on = btn.classList.toggle("is-active");
      btn.textContent = on ? "✓ Đang theo dõi" : "+ Theo dõi";
      btn.setAttribute("aria-pressed", String(on));
      var counter = btn.dataset.follow ? document.querySelector(btn.dataset.follow) : null;
      if (counter) {
        var base = parseInt(counter.dataset.base, 10);
        counter.textContent = (base + (on ? 1 : 0)).toLocaleString("vi-VN");
      }
    });
  });

  document.querySelectorAll("[data-like]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var on = btn.classList.toggle("is-active");
      btn.textContent = on ? "♥" : "♡";
      btn.setAttribute("aria-pressed", String(on));
    });
  });

  /* ---------- 4. Trang tìm kiếm: lọc / sắp xếp / đổi kiểu xem ---------- */
  var searchForm = document.getElementById("search-form");

  if (searchForm) {
    var kw = document.getElementById("q");
    var genre = document.getElementById("genre");
    var year = document.getElementById("year");
    var sort = document.getElementById("sort");
    var results = document.getElementById("results");
    var countEl = document.getElementById("result-count");
    var kwEl = document.getElementById("result-keyword");
    var empty = document.getElementById("empty-state");
    var grid = results.querySelector(".card-grid");
    var tbody = results.querySelector("tbody");
    var chips = document.querySelectorAll(".chip[data-genre]");

    // Nhận tham số từ URL, ví dụ search.html?genre=lofi hoặc ?q=mua
    var params = new URLSearchParams(window.location.search);
    if (params.get("q")) kw.value = params.get("q");
    if (params.get("genre")) genre.value = params.get("genre");

    function normalize(str) {
      return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
    }

    function sortItems(container, selector) {
      var items = Array.prototype.slice.call(container.querySelectorAll(selector));
      items.sort(function (a, b) {
        if (sort.value === "newest") return b.dataset.date.localeCompare(a.dataset.date);
        if (sort.value === "az") return a.dataset.title.localeCompare(b.dataset.title, "vi");
        return parseInt(b.dataset.plays, 10) - parseInt(a.dataset.plays, 10);
      });
      items.forEach(function (el) { container.appendChild(el); });
    }

    function applyFilters() {
      var q = normalize(kw.value.trim());
      var g = genre.value;
      var y = year.value;
      var visible = 0;

      grid.querySelectorAll(".card").forEach(function (card) {
        var text = normalize(card.dataset.title + " " + card.dataset.artist);
        var ok = (!q || text.indexOf(q) !== -1) &&
          (!g || card.dataset.genre === g) &&
          (!y || card.dataset.date.slice(0, 4) === y);
        card.hidden = !ok;
        var row = tbody.querySelector('[data-id="' + card.dataset.id + '"]');
        if (row) row.hidden = !ok;
        if (ok) visible++;
      });

      sortItems(grid, ".card");
      sortItems(tbody, "tr");

      countEl.textContent = visible;
      kwEl.textContent = kw.value.trim() ? ' cho từ khóa "' + kw.value.trim() + '"' : "";
      empty.classList.toggle("is-visible", visible === 0);

      chips.forEach(function (c) {
        c.classList.toggle("is-active", c.dataset.genre === g);
      });
    }

    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      applyFilters();
    });
    kw.addEventListener("input", applyFilters);
    [genre, year, sort].forEach(function (el) {
      el.addEventListener("change", applyFilters);
    });
    searchForm.addEventListener("reset", function () {
      setTimeout(applyFilters, 0);
    });

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        genre.value = chip.dataset.genre;
        applyFilters();
      });
    });

    document.querySelectorAll("[data-view]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var table = btn.dataset.view === "table";
        results.classList.toggle("view-table", table);
        document.querySelectorAll("[data-view]").forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
      });
    });

    applyFilters();
  }

  /* ---------- 5. Form liên hệ (giả lập gửi) ---------- */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      var msg = document.getElementById("form-success");
      msg.classList.add("is-visible");
      msg.focus();
      contactForm.reset();
    });
  }
})();
