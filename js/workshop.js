(function () {
  const root = document.getElementById("workshop-root");
  if (!root) return;
  const id = root.dataset.workshop;

  function cell(value) {
    const text = (value || "").trim();
    return text ? text : '<span class="empty-cell">TBA</span>';
  }

  Promise.all([Wiki.loadWorkshops(), Wiki.loadEvents()])
    .then(function (results) {
      const workshops = results[0];
      const events = results[1];
      const workshop = workshops[id];
      if (!workshop) {
        root.innerHTML = "<p>Unknown workshop.</p>";
        return;
      }

      document.getElementById("ws-name").textContent = workshop.name;
      var taglineEl = document.getElementById("ws-tagline");
      if (taglineEl) {
        var tl = (workshop.tagline || "").trim();
        if (tl) { taglineEl.textContent = tl; }
        else { taglineEl.style.display = "none"; }
      }
      document.getElementById("ws-duration").textContent = workshop.duration || "3 hours";
      var tzEl = document.getElementById("ws-timezone");
      if (tzEl) tzEl.textContent = workshop.timezone || "CT";

      const overview = (workshop.overview || "").trim();
      var overviewEl = document.getElementById("ws-overview");
      if (overview) {
        overviewEl.innerHTML = overview;
      } else {
        overviewEl.closest("section").style.display = "none";
      }

      const agendaBody = document.getElementById("ws-agenda");
      const agendaRows = (workshop.agenda || []);
      if (agendaRows.length === 0) {
        agendaBody.closest("section").style.display = "none";
      } else {
        var colCount = agendaBody.closest("table").querySelectorAll("thead th").length;
        agendaBody.innerHTML = agendaRows
          .map(function (row) {
            if (colCount === 1) {
              return "<tr><td>" + cell(row.title) + "</td></tr>";
            }
            return (
              "<tr><td>" +
              cell(row.time) +
              "</td><td>" +
              cell(row.title) +
              "</td><td>" +
              cell(row.notes) +
              "</td></tr>"
            );
          })
          .join("");
      }

      const resources = document.getElementById("ws-resources");
      if (resources) resources.innerHTML = (workshop.resources || [])
        .map(function (item) {
          const url = (item.url || "").trim();
          const link = url
            ? '<a href="' + url + '" target="_blank" rel="noopener">' + url + "</a>"
            : "";
          var desc = (item.description || "").trim();
          return (
            '<li class="detail-item">' +
            "<details class=\"session-details\">" +
            "<summary class=\"session-summary\">" +
            '<span class="session-summary__left">' +
            "<strong>" + item.label + "</strong>" +
            "</span>" +
            "</summary>" +
            '<div class="session-expanded">' +
            (desc ? "<p>" + desc + "</p>" : "") +
            link +
            "</div>" +
            "</details>" +
            "</li>"
          );
        })
        .join("");

      const related = events.filter(function (event) {
        return event.track === id;
      });
      const sessions = document.getElementById("ws-sessions");
      if (!related.length) {
        sessions.innerHTML =
          '<p class="muted">No sessions scheduled yet.</p>';
        return;
      }
      sessions.innerHTML =
        '<ul class="session-list">' +
        related
          .map(function (event) {
            return Wiki.sessionItemHtml(event);
          })
          .join("") +
        "</ul>";
    })
    .catch(function () {
      root.insertAdjacentHTML(
        "afterbegin",
        '<p class="muted">Could not load workshop data from js/site-data.js.</p>'
      );
    });
})();
