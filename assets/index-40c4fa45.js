(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === "childList")
        for (const d of r.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && t(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = c(e);
    fetch(e.href, r);
  }
})();
const a = document.getElementById("playPauseBtn"),
  u = document.getElementById("backMusicbtn"),
  s = document.getElementById("forwordMusicbtn"),
  i = document.getElementById("currentVideo"),
  l = document.getElementById("range"),
  m = document.getElementById("currentTime"),
  f = document.getElementById("durationTime");
a.addEventListener("click", (n) => {
  n.target.name === "play-circle"
    ? ((n.target.name = "pause-circle"), p())
    : ((n.target.name = "play-circle"), g());
});
function p() {
  i.play();
}
function g() {
  i.pause();
}
i.addEventListener("loadeddata", (n) => {
  const o = n.target.duration;
  let c = Math.floor(o / 60),
    t = Math.floor(o % 60);
  t < 10 && (t = "0" + t), (f.textContent = `${c}: ${t}`);
});
i.addEventListener("timeupdate", (n) => {
  const o = n.target.currentTime;
  let c = Math.floor(o / 60),
    t = Math.floor(o % 60);
  t < 10 && (t = "0" + t), (m.textContent = `${c}: ${t}`);
  let e = n.target.duration;
  l.value = (o / e) * 100;
});
u.addEventListener("click", () => (i.currentTime -= 5));
s.addEventListener("click", () => (i.currentTime += 5));
