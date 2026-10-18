// Nidaora marketing site: Hindi toggle, monthly/yearly pricing, demo-request mailto. No tracking.
(function () {
  var EMAIL = "hello@nidaora.in"; // PLACEHOLDER contact address – update when the real inbox exists
  var inr = function (n) { return "₹" + Number(n).toLocaleString("en-IN"); };

  // ---- Language toggle (main headings + key text) ----
  var btn = document.getElementById("langBtn");
  var nodes = document.querySelectorAll("[data-hi],[data-hi-html]");
  nodes.forEach(function (el) { el.dataset.en = el.innerHTML; });
  function setLang(lang) {
    nodes.forEach(function (el) {
      if (lang === "hi") el.innerHTML = el.dataset.hiHtml || el.dataset.hi; else el.innerHTML = el.dataset.en;
    });
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    btn.textContent = lang === "hi" ? "English" : "हिंदी";
    btn.setAttribute("aria-label", lang === "hi" ? "Switch language to English" : "Switch language to Hindi");
    try { localStorage.setItem("nd-lang", lang); } catch (e) {}
  }
  var saved = null; try { saved = localStorage.getItem("nd-lang"); } catch (e) {}
  if (saved === "hi" || (!saved && /[?&]lang=hi/.test(location.search))) setLang("hi");
  btn.addEventListener("click", function () { setLang(document.documentElement.lang === "hi" ? "en" : "hi"); });

  // ---- Monthly / yearly pricing ----
  var sw = document.getElementById("billSw");
  sw.addEventListener("click", function () {
    var yearly = sw.getAttribute("aria-checked") !== "true";
    sw.setAttribute("aria-checked", String(yearly));
    document.querySelectorAll(".price[data-m]").forEach(function (p) {
      var monthlyEquiv = Math.round(Number(p.dataset.y) / 12);
      p.innerHTML = yearly ? inr(monthlyEquiv) + "<small>/mo</small>" : inr(p.dataset.m) + "<small>/mo</small>";
      var g = p.nextElementSibling; if (g) g.textContent = yearly ? g.dataset.ytxt : g.dataset.mtxt;
    });
  });

  // ---- Demo request -> email ----
  document.getElementById("demoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(e.target);
    var body = "Name: " + f.get("name") + "\nClinic & city: " + f.get("clinic") + "\nType: " + f.get("type") + "\nBest time to call: " + (f.get("time") || "-") + "\n";
    location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Nidaora demo request – " + f.get("clinic")) + "&body=" + encodeURIComponent(body);
  });
  document.getElementById("yr").textContent = new Date().getFullYear();
})();
