(function(){
  "use strict";
  var burger = document.getElementById("burger");
  if (burger) burger.addEventListener("click", function(){
    var open = document.body.classList.toggle("menu-open");
    this.setAttribute("aria-expanded", open ? "true" : "false");
  });

  var hero = document.querySelector(".hero");
  var hdr = document.getElementById("hdr");
  if (hero && hdr) {
    var toggle = function(){ hdr.classList.toggle("solid", window.scrollY > window.innerHeight * 0.7); };
    window.addEventListener("scroll", toggle, {passive:true});
    toggle();
  }

  var form = document.getElementById("waform");
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var text = ["Hi VYNA,","",
        "Name: " + (v("f-name") || "\u2014"),
        "Property: " + (v("f-place") || "\u2014"),
        "Looking for: " + v("f-type"),
        "", v("f-msg")].join("\n").trim();
      window.open("https://wa.me/34622863188?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }

  var yr = document.getElementById("ar");
  if (yr) yr.textContent = new Date().getFullYear();
})();
