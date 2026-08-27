(function () {
  var list = document.getElementById("upcoming-sessions");
  var filtersEl = document.getElementById("session-filters");
  if (!list) return;

  var allEvents = [];
  var activeFilter = "all";

  var tabs = [
    { id: "all", label: "All" },
    { id: "aap", label: "AAP" },
    { id: "virt", label: "OCP Virt" },
    { id: "security", label: "OCP Security" }
  ];

  function renderFilters() {
    filtersEl.innerHTML = tabs
      .map(function (tab) {
        return (
          '<button type="button" class="pf-v6-c-button pf-m-small ' +
          (activeFilter === tab.id ? "pf-m-primary" : "pf-m-secondary") +
          '" data-track="' + tab.id + '" aria-pressed="' +
          (activeFilter === tab.id) + '">' +
          tab.label + "</button>"
        );
      })
      .join("");
  }

  function renderList() {
    var filtered = allEvents;
    if (activeFilter !== "all") {
      filtered = allEvents.filter(function (e) {
        return e.track === activeFilter;
      });
    }

    if (!filtered.length) {
      list.innerHTML = '<li class="muted">No upcoming sessions for this track.</li>';
      return;
    }
    list.innerHTML = filtered
      .map(function (event) {
        return Wiki.sessionItemHtml(event, { action: "track" });
      })
      .join("");
  }

  filtersEl.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-track]");
    if (!btn) return;
    activeFilter = btn.dataset.track;
    renderFilters();
    renderList();
  });

  Wiki.loadEvents()
    .then(function (events) {
      allEvents = events.filter(Wiki.isUpcoming);
      renderFilters();
      renderList();
    })
    .catch(function () {
      list.innerHTML =
        '<li class="muted">Could not load sessions from js/site-data.js.</li>';
    });
})();
