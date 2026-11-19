// nextierglobal.ai — copy buttons and curl/SDK tabs on the doc pages. No dependencies.
(function () {
  document.querySelectorAll("pre").forEach(function (pre) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "copy";
    b.textContent = "Copy";
    b.addEventListener("click", function () {
      var text = (pre.querySelector("code") || pre).innerText;
      var done = function () {
        b.textContent = "Copied";
        setTimeout(function () { b.textContent = "Copy"; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
    });
    pre.appendChild(b);
  });

  document.querySelectorAll(".tabs").forEach(function (tabs) {
    var panes = tabs.nextElementSibling;
    if (!panes) return;
    var buttons = tabs.querySelectorAll("button");
    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (x, j) { x.setAttribute("aria-selected", String(i === j)); });
        Array.prototype.forEach.call(panes.children, function (p, j) { p.hidden = i !== j; });
        try { localStorage.setItem("nx-tab", btn.textContent); } catch (e) {}
      });
    });
  });
  try {
    var pref = localStorage.getItem("nx-tab");
    if (pref) document.querySelectorAll(".tabs button").forEach(function (b) { if (b.textContent === pref) b.click(); });
  } catch (e) {}
})();

// Films: phones get the phone cut when there is one.
(function () {
  if (!window.matchMedia || !matchMedia("(max-width: 640px)").matches) return;
  document.querySelectorAll("video[data-mobile]").forEach(function (v) { v.src = v.getAttribute("data-mobile"); });
})();

// HTML films load on the press, so the sound can play and the page stays light.
(function () {
  document.querySelectorAll(".film .play").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = b.getAttribute("data-src");
      f.title = b.getAttribute("data-title") || "Film";
      f.setAttribute("allow", "autoplay; fullscreen");
      f.setAttribute("allowfullscreen", "");
      b.replaceWith(f);
    });
  });
})();
