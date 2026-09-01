(function (global) {
  function rootPrefix() {
    return /\/workshops\//.test(location.pathname) ? "../" : "";
  }

  function dataUrl(file) {
    return rootPrefix() + "data/" + file;
  }

  function workshopHref(track) {
    const prefix = rootPrefix();
    if (track === "aap") return prefix + "workshops/aap.html";
    if (track === "virt") return prefix + "workshops/openshift-virt.html";
    if (track === "security") return prefix + "workshops/openshift-app.html";
    return prefix + "index.html";
  }

  function trackLabel(track) {
    if (track === "aap") return "AAP";
    if (track === "virt") return "OpenShift Virt";
    if (track === "security") return "OCP Security";
    return track;
  }

  function parseEventDate(event) {
    return new Date(event.date + "T12:00:00");
  }

  function formatLongDate(event) {
    return parseEventDate(event).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function to12h(timeStr) {
    var parts = timeStr.split(":");
    var h = parseInt(parts[0], 10);
    var m = parts[1] || "00";
    var suffix = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return m === "00" ? h + " " + suffix : h + ":" + m + " " + suffix;
  }

  function formatTimeRange(event) {
    return to12h(event.start) + " – " + to12h(event.end) + " " + (event.timezone || "CT");
  }

  function formatScheduleNote(event) {
    const parts = [];
    if ((event.recurrence || "").trim()) parts.push(event.recurrence.trim());
    const notes = (event.notes || "").trim();
    if (notes && !/^completed$/i.test(notes)) parts.push(notes);
    return parts.join(" · ");
  }

  function isPast(event) {
    return !isUpcoming(event);
  }

  function eventStatus(event) {
    if (isToday(event)) return "today";
    if (isUpcoming(event)) return "upcoming";
    return "past";
  }

  function sessionItemHtml(event, options) {
    options = options || {};
    const status = eventStatus(event);
    const note = formatScheduleNote(event);
    let action;

    if (options.action === "track") {
      action =
        '<a class="pf-v6-c-button pf-m-link pf-m-small" href="' +
        workshopHref(event.track) +
        '">' +
        PfBtn.withEnd("View workshop", "arrowRight") +
        "</a>";
    } else if (status === "past") {
      action = '<span class="session-status"><span class="status-dot status-dot--done"></span>Completed</span>';
    } else {
      var hasUrl = (event.url || "").trim();
      var hasReport = (event.reportUrl || "").trim();

      if (hasUrl) {
        action =
          '<a class="pf-v6-c-button pf-m-secondary pf-m-small" href="' +
          event.url +
          '" target="_blank" rel="noopener">' +
          PfBtn.withEnd("Register", "externalLink") +
          "</a>";
      } else {
        action =
          '<span class="pf-v6-c-button pf-m-secondary pf-m-small pf-m-aria-disabled tbd-btn" aria-disabled="true">' +
          PfBtn.text("Registration TBD") +
          "</span>";
      }

      if (hasReport) {
        action +=
          '<a class="pf-v6-c-button pf-m-secondary pf-m-small report-btn" href="' +
          event.reportUrl +
          '" target="_blank" rel="noopener">' +
          PfBtn.withEnd("Registration Report", "externalLink") +
          "</a>";
      }
    }

    return (
      '<li class="session-item' +
      (status === "past" ? " session-item--past" : "") +
      '">' +
      '<div class="session-date">' +
      formatLongDate(event) +
      (status === "today" ? ' &nbsp;<span class="today-flag"><span class="status-dot status-dot--live"></span> Live today</span>' : "") +
      '<span class="session-time">' +
      formatTimeRange(event) +
      "</span></div>" +
      '<strong class="session-title">' +
      event.title +
      "</strong>" +
      '<div class="session-list__meta">' +
      '<span class="track-pill track-pill--' +
      event.track +
      '">' +
      trackLabel(event.track) +
      "</span>" +
      (note ? '<span class="session-note">' + note + "</span>" : "") +
      ((event.salesforceId || "").trim() ? '<span class="sfid-label">SFID: ' + event.salesforceId + "</span>" : "") +
      action +
      "</div></li>"
    );
  }

  function isToday(event) {
    const now = new Date();
    const d = parseEventDate(event);
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }

  function isUpcoming(event) {
    const start = new Date(event.date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return start >= today;
  }

  function loadEvents() {
    const events = Array.isArray(global.WIKI_EVENTS) ? global.WIKI_EVENTS.slice() : [];
    events.sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });
    return Promise.resolve(events);
  }

  function loadWorkshops() {
    return Promise.resolve(global.WIKI_WORKSHOPS || {});
  }

  function displayOrPlaceholder(value, fallback) {
    const text = (value || "").trim();
    return text || fallback || "To be filled in";
  }

  global.Wiki = {
    rootPrefix: rootPrefix,
    dataUrl: dataUrl,
    workshopHref: workshopHref,
    trackLabel: trackLabel,
    parseEventDate: parseEventDate,
    formatLongDate: formatLongDate,
    formatTimeRange: formatTimeRange,
    formatScheduleNote: formatScheduleNote,
    isToday: isToday,
    isUpcoming: isUpcoming,
    isPast: isPast,
    eventStatus: eventStatus,
    sessionItemHtml: sessionItemHtml,
    loadEvents: loadEvents,
    loadWorkshops: loadWorkshops,
    displayOrPlaceholder: displayOrPlaceholder,
  };
})(window);
