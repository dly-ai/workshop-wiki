(function () {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  let viewYear = year;
  let viewMonth = month;
  let filter = "all";
  let events = [];

  const monthLabel = document.getElementById("cal-month-label");
  const grid = document.getElementById("cal-grid");
  const list = document.getElementById("cal-list");
  const filters = document.getElementById("cal-filters");

  document.getElementById("cal-prev").innerHTML = PfBtn.withStart("Previous", "arrowLeft");
  document.getElementById("cal-today").innerHTML = PfBtn.text("Today");
  document.getElementById("cal-next").innerHTML = PfBtn.withEnd("Next", "arrowRight");

  function matchesFilter(event) {
    return filter === "all" || event.track === filter;
  }

  function renderFilters() {
    const options = [
      { id: "all", label: "All" },
      { id: "aap", label: "AAP" },
      { id: "virt", label: "OpenShift Virt" },
      { id: "security", label: "OCP Security" },
    ];
    filters.innerHTML = options
      .map(function (opt) {
        return (
          '<button type="button" class="pf-v6-c-button pf-m-small ' +
          (filter === opt.id ? "pf-m-primary pf-m-active" : "pf-m-secondary") +
          '" data-track="' +
          opt.id +
          '" aria-pressed="' +
          (filter === opt.id) +
          '">' +
          opt.label +
          "</button>"
        );
      })
      .join("");
  }

  function eventsOnDay(dateStr) {
    return events.filter(function (event) {
      return event.date === dateStr && matchesFilter(event);
    });
  }

  function isoDate(d) {
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function renderMonth() {
    const first = new Date(viewYear, viewMonth, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const title = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    monthLabel.textContent = title;

    const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let html = dows.map(function (d) {
      return '<div class="dow">' + d + "</div>";
    }).join("");

    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = 0; i < startDow; i++) {
      const day = prevMonthDays - startDow + i + 1;
      html += '<div class="day-cell day-cell--muted"><div class="day-num">' + day + "</div></div>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const dateStr = isoDate(date);
      const isToday =
        date.getFullYear() === year && date.getMonth() === month && date.getDate() === now.getDate();
      const dayEvents = eventsOnDay(dateStr);
      html +=
        '<div class="day-cell' +
        (isToday ? " day-cell--today" : "") +
        '"><div class="day-num">' +
        day +
        "</div>" +
        dayEvents
          .map(function (event) {
            return (
              '<a class="day-event day-event--' +
              event.track +
              '" href="' +
              Wiki.workshopHref(event.track) +
              '" title="' +
              event.title +
              (Wiki.formatScheduleNote(event) ? " — " + Wiki.formatScheduleNote(event) : "") +
              '">' +
              event.title +
              "</a>"
            );
          })
          .join("") +
        "</div>";
    }

    const remainder = (startDow + daysInMonth) % 7;
    if (remainder !== 0) {
      for (let i = 1; i <= 7 - remainder; i++) {
        html += '<div class="day-cell day-cell--muted"><div class="day-num">' + i + "</div></div>";
      }
    }

    grid.innerHTML = html;
  }

  function renderList() {
    const start = isoDate(new Date(viewYear, viewMonth, 1));
    const end = isoDate(new Date(viewYear, viewMonth + 1, 0));
    const monthEvents = events.filter(function (event) {
      return event.date >= start && event.date <= end && matchesFilter(event);
    });

    if (!monthEvents.length) {
      list.innerHTML = '<p class="muted">No sessions this month for the selected track.</p>';
      return;
    }

    list.innerHTML =
      '<ul class="session-list">' +
      monthEvents.map(function (event) {
        return Wiki.sessionItemHtml(event);
      }).join("") +
      "</ul>";
  }

  function render() {
    renderFilters();
    renderMonth();
    renderList();
  }

  document.getElementById("cal-prev").addEventListener("click", function () {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    render();
  });

  document.getElementById("cal-next").addEventListener("click", function () {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    render();
  });

  document.getElementById("cal-today").addEventListener("click", function () {
    viewYear = year;
    viewMonth = month;
    render();
  });

  filters.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-track]");
    if (!btn) return;
    filter = btn.dataset.track;
    render();
  });

  Wiki.loadEvents()
    .then(function (loaded) {
      events = loaded;
      render();
    })
    .catch(function () {
      grid.innerHTML = '<p class="muted">Could not load workshop dates from js/site-data.js.</p>';
      list.innerHTML = '<p class="muted">No sessions to show.</p>';
    });
})();
