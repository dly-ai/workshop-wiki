(function () {
  const root = document.getElementById("demo-security");
  if (!root) return;

  const checks = {
    admission: {
      label: "Admission policy",
      pass: "Privileged containers blocked",
      fail: "Workload requests privileged: true",
    },
    acs: {
      label: "ACS vulnerability policy",
      pass: "No fixable critical CVEs in image",
      fail: "Image payments-api:1.2 has 2 critical CVEs",
    },
    compliance: {
      label: "Compliance (CIS)",
      pass: "CIS profile controls passing",
      fail: "HostNetwork enabled — CIS 5.2.4 fail",
    },
  };

  const results = root.querySelector("#sec-results");
  const overall = root.querySelector("#sec-overall");

  function render() {
    const rows = Object.keys(checks).map(function (key) {
      const enabled = root.querySelector("#sec-" + key).checked;
      const item = checks[key];
      const ok = enabled;
      return (
        '<div class="check-row"><span>' +
        item.label +
        '</span><span class="' +
        (ok ? "status-ok" : "status-fail") +
        '">' +
        (ok ? "pass — " + item.pass : "fail — " + item.fail) +
        "</span></div>"
      );
    });
    results.innerHTML = rows.join("");
    const allOn = Object.keys(checks).every(function (key) {
      return root.querySelector("#sec-" + key).checked;
    });
    overall.textContent = allOn ? "Compliant" : "Violations found";
    overall.className = allOn ? "status-ok" : "status-fail";
  }

  root.addEventListener("change", render);
  render();
})();
