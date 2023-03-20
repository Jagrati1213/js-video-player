(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n);
  new MutationObserver((n) => {
    for (const a of n)
      if (a.type === "childList")
        for (const d of a.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && r(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(n) {
    const a = {};
    return (
      n.integrity && (a.integrity = n.integrity),
      n.referrerPolicy && (a.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function r(n) {
    if (n.ep) return;
    n.ep = !0;
    const a = i(n);
    fetch(n.href, a);
  }
})();
const c = document.getElementById("playPauseBtn"),
  m = document.getElementById("backMusicbtn"),
  f = document.getElementById("forwordMusicbtn"),
  e = document.getElementById("currentVideo"),
  s = document.getElementById("range"),
  g = document.getElementById("currentTime"),
  p = document.getElementById("durationTime"),
  u = document.getElementById("volumeBtn2"),
  v = document.getElementById("volumeRange"),
  y = document.getElementById("video_container");
var l = !1;
window.onload = E();
e.onplay = function () {
  (l = !0), e.play();
};
e.onpause = function () {
  (l = !1), e.pause();
};
c.addEventListener("click", async (t) => {
  try {
    return e.paused && !l && t.target.name === "play-circle"
      ? ((t.target.name = "pause-circle"), e.onplay())
      : ((t.target.name = "play-circle"), e.onpause());
  } catch {
    return document.write("SOMETHING WRONG IN");
  }
});
function E() {
  e.addEventListener("loadeddata", (t) => {
    let o = t.target.duration,
      i = Math.floor(o / 60),
      r = Math.floor(o % 60);
    r < 10 && (r = "0" + r), (p.textContent = `${i}: ${r}`);
  });
}
e.addEventListener("timeupdate", (t) => {
  e.currentTime === e.duration && ((c.name = "play-circle"), e.pause());
  let o = t.target.currentTime,
    i = Math.floor(o / 60),
    r = Math.floor(o % 60);
  r < 10 && (r = "0" + r), (g.textContent = `${i}: ${r}`);
  let n = t.target.duration;
  s.value = (o / n) * 100;
});
m.addEventListener("click", () => (e.currentTime -= 5));
f.addEventListener("click", () => (e.currentTime += 5));
s.addEventListener("input", (t) => {
  (e.currentTime = Math.floor((t.target.value * e.duration) / 100)),
    setInterval(() => {
      t.target.value = (e.currentTime / e.duration) * 100;
    });
});
v.addEventListener("change", (t) => {
  (e.volume = t.target.value / 100),
    t.target.value == 0
      ? (u.name = "volume-mute")
      : t.target.value < 40
      ? (u.name = "volume-low")
      : t.target.value >= 40 && t.target.value < 80
      ? (u.name = "volume-medium")
      : (u.name = "volume-high");
});
y.addEventListener("click", () =>
  e.paused && !l
    ? ((c.name = "pause-circle"), e.onplay())
    : ((c.name = "play-circle"), e.onpause())
);
