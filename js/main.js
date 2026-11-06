// ===== DỮ LIỆU MẪU (tên bài hát / nghệ sĩ hư cấu) =====
const gradients = [
  "linear-gradient(135deg,#ff6a88,#ff99ac)",
  "linear-gradient(135deg,#6a11cb,#2575fc)",
  "linear-gradient(135deg,#f7971e,#ffd200)",
  "linear-gradient(135deg,#00c9ff,#92fe9d)",
  "linear-gradient(135deg,#fc466b,#3f5efb)",
  "linear-gradient(135deg,#11998e,#38ef7d)",
  "linear-gradient(135deg,#ee0979,#ff6a00)",
  "linear-gradient(135deg,#8e2de2,#4a00e0)",
];
const emojis = ["🎧", "🎸", "🎹", "🎤", "🎷", "🥁", "🎻", "🌙"];

// embedId: mã bài hát lấy từ link nhúng https://zingmp3.vn/embed/song/<embedId>
const songs = [
  { title: "Bài hát nhúng từ Zing MP3", artist: "Phát qua trình nhúng", dur: 0, embedId: "ZWJkTj44qD2t" },
  // src: file nhạc thật trong thư mục audio/ (thời lượng tự đọc từ file)
  { title: "Groovy Hip Hop – Mellow Chillout", artist: "Badsovnds", dur: 0, src: "audio/badsovnds-groovy-hip-hop-sample-chop-mellow-chillout-527100.mp3" },
  { title: "Groovy Hip Hop – Relaxing Thunder", artist: "Badsovnds", dur: 0, src: "audio/badsovnds-groovy-sample-chop-hip-hop-relaxing-thunder-527150.mp3" },
  { title: "Sitar Type Beat", artist: "Chưa rõ nghệ sĩ", dur: 0, src: "audio/u_67ccao27gv-sitar-type-beat-322065.mp3" },
  { title: "Magma (142 BPM)", artist: "Chưa rõ nghệ sĩ", dur: 0, src: "audio/u_vld2chgq8f-magma-prod-2025-sample-142bpm-459102.mp3" },
  { title: "Mưa Trên Phố Cũ", artist: "Lam Anh", dur: 214 },
  { title: "Gió Mùa Thu", artist: "Hải Đăng", dur: 198 },
  { title: "Đêm Không Ngủ", artist: "Mây Trắng", dur: 232 },
  { title: "Chạy Về Phía Nắng", artist: "Kiến Vàng", dur: 187 },
  { title: "Lofi Chiều Thứ Bảy", artist: "LowTides", dur: 245 },
  { title: "Nhịp Tim Thành Phố", artist: "DJ Sông", dur: 176 },
  { title: "Hẹn Em Ở Ga Cuối", artist: "Minh Khang", dur: 221 },
  { title: "Bầu Trời Xanh Mới", artist: "Lam Anh, Hải Đăng", dur: 203 },
  { title: "Cà Phê Sáng", artist: "Mây Trắng", dur: 190 },
  { title: "Sóng Biển Xa", artist: "Hải Đăng", dur: 227 },
  { title: "Phố Đèn Vàng", artist: "LowTides", dur: 199 },
  { title: "Ngày Mai Nắng Lên", artist: "Kiến Vàng, Lam Anh", dur: 212 },
  { title: "Thư Gửi Mùa Hạ", artist: "Minh Khang", dur: 238 },
  { title: "Vũ Điệu Đêm", artist: "DJ Sông", dur: 181 },
  { title: "Lặng Im", artist: "Mây Trắng", dur: 205 },
];
const albums = ["Mùa Thu Kể Chuyện (Single)", "Hành Trình", "Đêm Thành Phố", "Nắng (EP)", "Tuyển Tập Lofi Vol.2", "Nhịp Điệu Mới"];
const trends = ["▲ 2", "▼ 1", "—", "▲ 5", "▼ 3", "▲ 1", "—", "▲ 4"];

const playlists = [
  { title: "Chill Cuối Tuần", desc: "Thư giãn nhẹ nhàng với những giai điệu acoustic" },
  { title: "Nhạc Trẻ Hot", desc: "Những bản hit V-Pop đang được nghe nhiều nhất" },
  { title: "Lofi Học Bài", desc: "Tập trung học tập và làm việc hiệu quả" },
  { title: "Ballad Buồn", desc: "Lắng đọng cùng những bản ballad sâu lắng" },
  { title: "EDM Sôi Động", desc: "Năng lượng bùng nổ cho buổi tập gym" },
];
const top100 = [
  { title: "Top 100 Nhạc Trẻ", desc: "Lam Anh, Hải Đăng, Mây Trắng..." },
  { title: "Top 100 Pop Âu Mỹ", desc: "Tuyển tập pop quốc tế nổi bật" },
  { title: "Top 100 Rap Việt", desc: "Kiến Vàng, DJ Sông..." },
  { title: "Top 100 Indie", desc: "LowTides, Minh Khang..." },
  { title: "Top 100 Acoustic", desc: "Mộc mạc và chân thật" },
];
const banners = [
  { title: "Tuyển Tập Mùa Thu", sub: "Giai điệu cho ngày se lạnh" },
  { title: "Nghệ Sĩ Mới", sub: "Khám phá tài năng trẻ" },
  { title: "Hit Tháng 11", sub: "Những bài hát đang thịnh hành" },
  { title: "Radio Đêm", sub: "Phát sóng 24/7" },
  { title: "Workout Mix", sub: "Tiếp thêm năng lượng" },
];

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const $ = (id) => document.getElementById(id);

// ===== RENDER =====
function renderBanner() {
  if (!$("bannerTrack")) return;
  $("bannerTrack").innerHTML = banners
    .map((b, i) => `<div class="banner-item" style="background:${gradients[(i + 3) % gradients.length]}">
        <h3>${b.title}</h3><p>${b.sub}</p></div>`)
    .join("");
}

function renderGrid(el, list, offset = 0) {
  if (!el) return;
  el.innerHTML = list
    .map((p, i) => `<div class="card" data-song="${(i + offset) % songs.length}">
        <div class="card-cover" style="background:${gradients[(i + offset) % gradients.length]}">${emojis[(i + offset) % emojis.length]}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-desc">${p.desc}</div></div>`)
    .join("");
}

function songRow(s, i, rank) {
  return `<div class="song" data-song="${i}">
      ${rank ? `<div class="rank-num">${rank}</div>` : ""}
      <div class="song-thumb" style="background:${gradients[i % gradients.length]}">${emojis[i % emojis.length]}</div>
      <div class="grow">
        <div class="song-name">${s.title}</div>
        <div class="song-artist">${s.artist}</div>
        ${rank ? "" : `<div class="song-time">${s.embedId ? "Nhúng" : fmt(s.dur)}</div>`}
      </div>
      ${rank ? `<div class="pct">${[38, 24, 15, 10, 7][rank - 1]}%</div>` : ""}
    </div>`;
}

function renderLists() {
  if ($("newList")) $("newList").innerHTML = songs.slice(0, 9).map((s, i) => songRow(s, i)).join("");
  if ($("chartList")) $("chartList").innerHTML = songs.slice(0, 5).map((s, i) => songRow(s, i, i + 1)).join("");
}

// Trang BXH Nhạc Mới
function renderRelease() {
  const el = $("releaseList");
  if (!el) return;
  el.innerHTML = songs
    .map((s, i) => {
      const t = trends[i % trends.length];
      const cls = t.startsWith("▲") ? "up" : t.startsWith("▼") ? "down" : "";
      return `<div class="release-row" data-song="${i}">
        <div class="col-rank"><span class="rank-num">${i + 1}</span><span class="rank-trend ${cls}">${t}</span></div>
        <div class="col-song">
          <div class="song-thumb" style="background:${gradients[i % gradients.length]}">${emojis[i % emojis.length]}</div>
          <div style="min-width:0"><div class="song-name">${s.title}</div><div class="song-artist">${s.artist}</div></div>
        </div>
        <div class="col-album">${albums[i % albums.length]}</div>
        <div class="col-time">${s.embedId ? "Nhúng" : fmt(s.dur)}</div>
      </div>`;
    })
    .join("");
}

renderBanner();
renderGrid($("suggestGrid"), playlists, 0);
renderGrid($("topGrid"), top100, 3);
renderLists();
renderRelease();

// ===== BANNER TỰ TRƯỢT =====
let bannerIdx = 0;
setInterval(() => {
  const track = $("bannerTrack");
  const item = track && track.querySelector(".banner-item");
  if (!item) return;
  const perView = Math.round(track.parentElement.offsetWidth / item.offsetWidth) || 1;
  bannerIdx = (bannerIdx + 1) % (banners.length - perView + 1);
  track.style.transform = `translateX(-${bannerIdx * (item.offsetWidth + 24)}px)`;
}, 4000);

// ===== TABS =====
document.querySelectorAll(".tab").forEach((t) =>
  t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
  })
);

// ===== PLAYER =====
// Bài có "src" phát bằng <audio> thật; bài không có src chạy bộ đếm giả.
let current = -1, playing = false, elapsed = 0, timer = null, shuffle = false, repeat = false;
const audio = new Audio();
audio.volume = 0.7;

// Đọc thời lượng thật của các file nhạc để hiển thị trong danh sách
songs.forEach((s, i) => {
  if (!s.src) return;
  const a = new Audio();
  a.preload = "metadata";
  a.onloadedmetadata = () => {
    s.dur = a.duration;
    document.querySelectorAll(`[data-song="${i}"] .song-time, [data-song="${i}"] .col-time`)
      .forEach((el) => (el.textContent = fmt(s.dur)));
    if (current === i) $("durTime").textContent = fmt(s.dur);
  };
  a.src = s.src;
});

function loadSong(i) {
  current = i;
  elapsed = 0;
  const s = songs[i];
  $("pTitle").textContent = s.title;
  $("pArtist").textContent = s.artist;
  $("pThumb").style.background = gradients[i % gradients.length];
  $("durTime").textContent = fmt(s.dur);
  document.querySelectorAll(".song, .release-row[data-song]").forEach((el) => el.classList.toggle("playing", +el.dataset.song === i));
  audio.pause();
  if (s.src) {
    audio.src = s.src;
  } else {
    audio.removeAttribute("src");
    audio.load();
  }
  updateProgress();
}

function updateProgress() {
  const s = songs[current];
  if (!s) return;
  $("curTime").textContent = fmt(elapsed);
  $("seek").value = s.dur ? (elapsed / s.dur) * 100 : 0;
}

audio.ontimeupdate = () => {
  elapsed = audio.currentTime;
  updateProgress();
};
audio.onloadedmetadata = () => {
  songs[current].dur = audio.duration;
  $("durTime").textContent = fmt(audio.duration);
};
audio.onended = () => (repeat ? (loadSong(current), play()) : next());

// ===== TRÌNH PHÁT NHÚNG =====
const embedFrame = $("embedFrame");
const embedPanel = $("embedPanel");

function openEmbed(id, autostart) {
  if (!embedFrame) return;
  embedFrame.src = `https://zingmp3.vn/embed/song/${id}?start=${autostart}`;
  embedPanel.classList.add("show");
  $("embedToggle").classList.add("on");
}
function stopEmbed() {
  if (!embedFrame || embedFrame.src === "about:blank") return;
  embedFrame.src = "about:blank"; // dừng nhạc trong iframe
  embedPanel.classList.remove("show");
  $("embedToggle").classList.remove("on");
}

if (embedFrame) {
  $("embedToggle").onclick = () => {
    if (embedFrame.src === "about:blank") {
      const s = songs.find((x) => x.embedId);
      if (s) openEmbed(s.embedId, false);
    } else {
      $("embedToggle").classList.toggle("on", embedPanel.classList.toggle("show"));
    }
  };
  $("embedClose").onclick = () => {
    embedPanel.classList.remove("show");
    $("embedToggle").classList.remove("on");
  };
}

function play() {
  if (current < 0) loadSong(0);
  const s = songs[current];
  if (s.embedId) {
    // Bài nhúng: phát trong iframe, không chạy bộ đếm giả
    pause();
    openEmbed(s.embedId, true);
    return;
  }
  stopEmbed();
  playing = true;
  $("playBtn").textContent = "❚❚";
  $("pThumb").classList.add("spin");
  clearInterval(timer);
  if (s.src) {
    audio.play().catch(() => pause());
    return;
  }
  timer = setInterval(() => {
    elapsed++;
    if (elapsed >= songs[current].dur) return repeat ? loadSong(current) : next();
    updateProgress();
  }, 1000);
}

function pause() {
  playing = false;
  $("playBtn").textContent = "▶";
  $("pThumb").classList.remove("spin");
  clearInterval(timer);
  audio.pause();
}

function next() {
  const n = shuffle ? Math.floor(Math.random() * songs.length) : (current + 1) % songs.length;
  loadSong(n);
  play();
}
function prev() {
  loadSong((current - 1 + songs.length) % songs.length);
  play();
}

$("playBtn").onclick = () => (playing ? pause() : play());
if ($("playAllBtn")) $("playAllBtn").onclick = () => { loadSong(0); play(); };
$("nextBtn").onclick = next;
$("prevBtn").onclick = prev;
$("shuffleBtn").onclick = (e) => { shuffle = !shuffle; e.currentTarget.classList.toggle("on", shuffle); };
$("repeatBtn").onclick = (e) => { repeat = !repeat; e.currentTarget.classList.toggle("on", repeat); };
$("heartBtn").onclick = (e) => {
  const b = e.currentTarget;
  b.classList.toggle("on");
  b.textContent = b.classList.contains("on") ? "♥" : "♡";
};
$("seek").oninput = (e) => {
  if (current < 0) return;
  elapsed = (e.target.value / 100) * songs[current].dur;
  if (songs[current].src) audio.currentTime = elapsed;
  updateProgress();
};
$("volume").oninput = (e) => (audio.volume = e.target.value / 100);

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-song]");
  if (!el) return;
  loadSong(+el.dataset.song);
  play();
});
