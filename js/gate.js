(function () {
  var CODE = "redhat-austin";
  var KEY = "wiki_access";

  if (sessionStorage.getItem(KEY) === CODE) return;

  document.documentElement.style.overflow = "hidden";

  var overlay = document.createElement("div");
  overlay.id = "gate-overlay";
  overlay.innerHTML =
    '<div class="gate-card">' +
    '<form id="gate-form">' +
    '<input type="text" id="gate-input" placeholder="Access code" autocomplete="off" autofocus />' +
    '<button type="submit" class="pf-v6-c-button pf-m-primary">Enter</button>' +
    "</form>" +
    '<p id="gate-error" class="gate-error"></p>' +
    "</div>";

  document.body.appendChild(overlay);

  var inp = document.getElementById("gate-input");
  var cursor = document.getElementById("gate-cursor");

  // Mask input as dots like a password field, but with hacker style
  var realValue = "";
  inp.addEventListener("input", function () {
    var newLen = inp.value.length;
    if (newLen > realValue.length) {
      realValue += inp.value.charAt(newLen - 1);
    } else {
      realValue = realValue.substring(0, newLen);
    }
    inp.value = "\u2022".repeat(realValue.length);
  });

  document.getElementById("gate-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var val = realValue.trim().toLowerCase();
    if (val === CODE) {
      sessionStorage.setItem(KEY, CODE);
      overlay.remove();
      document.documentElement.style.overflow = "";
    } else {
      document.getElementById("gate-error").textContent = "Incorrect access code.";
      realValue = "";
      inp.value = "";
      inp.focus();
    }
  });
})();
