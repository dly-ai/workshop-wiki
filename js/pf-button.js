(function (global) {
  function svg(viewBox, path) {
    return (
      '<svg class="pf-v6-svg" fill="currentColor" viewBox="' +
      viewBox +
      '" aria-hidden="true" role="img" width="1em" height="1em"><path d="' +
      path +
      '"></path></svg>'
    );
  }

  const icons = {
    arrowRight: svg(
      "0 0 448 512",
      "M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
    ),
    arrowLeft: svg(
      "0 0 448 512",
      "M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
    ),
    externalLink: svg(
      "0 0 512 512",
      "M432 320h-32a16 16 0 0 0-16 16v112H64V128h144a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H48a48 48 0 0 0-48 48v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V336a16 16 0 0 0-16-16zM488 48H336c-21.4 0-32.1 25.9-17 41l32 32L197 273c-9.4 9.4-9.4 24.6 0 33.9l22.1 22.1c9.4 9.4 24.6 9.4 33.9 0L409 145l32 32c15 15 41 4.5 41-17V64c0-8.8-7.2-16-16-16z"
    ),
    play: svg(
      "0 0 448 512",
      "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
    ),
  };

  function text(label) {
    return '<span class="pf-v6-c-button__text">' + label + "</span>";
  }

  function iconEnd(name) {
    return '<span class="pf-v6-c-button__icon pf-m-end">' + icons[name] + "</span>";
  }

  function iconStart(name) {
    return '<span class="pf-v6-c-button__icon pf-m-start">' + icons[name] + "</span>";
  }

  global.PfBtn = {
    text: text,
    iconEnd: iconEnd,
    iconStart: iconStart,
    withEnd: function (label, icon) {
      return text(label) + iconEnd(icon);
    },
    withStart: function (label, icon) {
      return iconStart(icon) + text(label);
    },
  };
})(window);
