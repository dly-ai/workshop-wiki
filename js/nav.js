(function () {
  const inWorkshop = /\/workshops\//.test(location.pathname);
  const base = inWorkshop ? "../" : "";
  const page = document.body.dataset.page || "";

  function currentAttr(id) {
    return page === id ? ' aria-current="page"' : "";
  }

  var navIcons = {
    home: '<img src="' + base + 'assets/home-icon.png" width="16" height="16" alt="" />',
    calendar: '<img src="' + base + 'assets/calendar-icon.png" width="16" height="16" alt="" />',
    aap: '<img src="' + base + 'assets/ansible-icon.png" width="16" height="16" alt="" style="border-radius:50%;" />',
    virt: '<img src="' + base + 'assets/openshift-virt-icon.png" width="16" height="16" alt="" style="border-radius:4px;" />',
    security: '<img src="' + base + 'assets/openshift-security-icon.png" width="16" height="16" alt="" style="border-radius:4px;" />'
  };

  function link(href, id, label) {
    return (
      '<a class="topnav-link" href="' +
      href +
      '"' +
      currentAttr(id) +
      ">" +
      (navIcons[id] || "") +
      " " + label +
      "</a>"
    );
  }

  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="site-header__inner">' +
      '<nav class="topnav" aria-label="Site">' +
      link(base + "index.html", "home", "Home") +
      link(base + "calendar.html", "calendar", "Calendar") +
      link(base + "workshops/aap.html", "aap", "AAP") +
      link(base + "workshops/openshift-virt.html", "virt", "OCP Virt") +
      link(base + "workshops/openshift-app.html", "security", "OCP Security") +
      "</nav>" +
      '<button type="button" class="pf-v6-c-button pf-m-secondary pf-m-small menu-toggle" aria-expanded="false" aria-controls="site-nav">[ Menu ]</button>' +
      "</div>";
  }

  const nav = document.getElementById("site-nav");
  if (nav) {
    nav.className = "mobile-nav";
    nav.setAttribute("aria-label", "Site");
    nav.innerHTML =
      link(base + "index.html", "home", "Home") +
      link(base + "calendar.html", "calendar", "Calendar") +
      link(base + "workshops/aap.html", "aap", "AAP") +
      link(base + "workshops/openshift-virt.html", "virt", "OCP Virt") +
      link(base + "workshops/openshift-app.html", "security", "OCP Security");
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = "";
  }

  const toggle = header && header.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
