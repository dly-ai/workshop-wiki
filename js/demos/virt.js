(function () {
  const root = document.getElementById("demo-virt");
  if (!root) return;

  const steps = [
    {
      id: "create",
      label: "Create VM",
      title: "web-legacy",
      body: "Instance type: u1.medium\nOS: RHEL 9\nStorage: 40 GiB PVC (csi-snapshot capable)\nNetwork: default / masquerade\nState: Running",
    },
    {
      id: "import",
      label: "Import (MTV)",
      title: "web-legacy  ←  vSphere",
      body: "Migration Toolkit for Virtualization\nSource: vSphere / datacenter-01\nPlan: warm migration\nDisks copied · guest converted\nState: Imported, Running on OpenShift",
    },
    {
      id: "migrate",
      label: "Live migrate",
      title: "web-legacy",
      body: "Live migration requested\nSource node: worker-a\nTarget node: worker-c\nMemory transfer complete\nState: Running on worker-c (zero downtime)",
    },
    {
      id: "snapshot",
      label: "Snapshot",
      title: "web-legacy",
      body: "Snapshot: pre-patch-2026-08-26\nVolume snapshot: pvc-web-legacy-root\nRestore point ready\nState: Running (snapshot available)",
    },
  ];

  const buttons = root.querySelector("#virt-steps");
  const title = root.querySelector("#virt-title");
  const body = root.querySelector("#virt-body");
  const status = root.querySelector("#virt-status");

  buttons.innerHTML = steps
    .map(function (step, i) {
      return (
        '<button type="button" class="pf-v6-c-button pf-m-block ' +
        (i === 0 ? "pf-m-primary pf-m-active" : "pf-m-secondary") +
        '" data-step="' +
        i +
        '" aria-pressed="' +
        (i === 0) +
        '"' +
        (i === 0 ? ' aria-current="step"' : "") +
        ">" +
        (i + 1) +
        ". " +
        step.label +
        "</button>"
      );
    })
    .join("");

  function show(index) {
    const step = steps[index];
    title.textContent = step.title;
    body.textContent = step.body;
    status.textContent = step.label;
    buttons.querySelectorAll("button").forEach(function (btn, i) {
      btn.classList.remove("pf-m-primary", "pf-m-secondary", "pf-m-active");
      if (i === index) {
        btn.setAttribute("aria-current", "step");
        btn.setAttribute("aria-pressed", "true");
        btn.classList.add("pf-m-primary", "pf-m-active");
      } else {
        btn.removeAttribute("aria-current");
        btn.setAttribute("aria-pressed", "false");
        btn.classList.add("pf-m-secondary");
      }
    });
  }

  buttons.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-step]");
    if (!btn) return;
    show(Number(btn.dataset.step));
  });

  show(0);
})();
