(function () {
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("form[data-waitlist]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var product = form.getAttribute("data-waitlist") || "Studios";
      var emailInput = form.querySelector('input[name="email"]');
      var noteInput = form.querySelector('input[name="note"]');
      var noteEl = form.parentElement
        ? form.parentElement.querySelector("[data-form-note]")
        : null;
      var email = emailInput && emailInput.value ? emailInput.value.trim() : "";
      var note = noteInput && noteInput.value ? noteInput.value.trim() : "";

      if (!email) return;

      var subject = encodeURIComponent("Waitlist: " + product);
      var body = encodeURIComponent(
        "Product: " +
          product +
          "\nEmail: " +
          email +
          (note ? "\nNote: " + note : "") +
          "\n\nSource: burkettstudios.com"
      );
      window.location.href =
        "mailto:trey@burkettinv.com?subject=" + subject + "&body=" + body;

      if (noteEl) {
        noteEl.hidden = false;
        noteEl.textContent =
          "Opening your email app. If nothing opens, write trey@burkettinv.com with subject Waitlist: " +
          product +
          ".";
      }
    });
  });
})();
