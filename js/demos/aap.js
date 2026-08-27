(function () {
  const root = document.getElementById("demo-aap");
  if (!root) return;

  const select = root.querySelector("#aap-template");
  const log = root.querySelector("#aap-log");
  const launch = root.querySelector("#aap-launch");
  const status = root.querySelector("#aap-status");
  launch.innerHTML = PfBtn.withEnd("Launch", "play");
  let timer = 0;

  const templates = {
    linux: {
      name: "linux-automation",
      lines: [
        "SESSION: Red Hat Ansible Automation Workshop — Linux Automation",
        "DATE:    Wed, Dec 16, 2026  |  11 AM – 2 PM CT  |  3 hours",
        "---",
        "Identity confirmed: workshop-user",
        "Using inventory: workshop-lab  (RHEL nodes provided — no local install)",
        "TASK [Gather facts] ********************************************************",
        "ok: [rhel-01]",
        "TASK [Write first playbook] ************************************************",
        "changed: [rhel-01]  # Command-line Ansible basics",
        "TASK [Variables, conditionals, handlers, loops] ****************************",
        "changed: [rhel-01]  # Production-ready playbooks",
        "TASK [Jinja templates & collections] ***************************************",
        "changed: [rhel-01]  # Standardize config, reuse content",
        "TASK [ansible-navigator & execution environments] **************************",
        "ok: [rhel-01]      # Consistent, supported automation runs",
        "TASK [Inventories, credentials, job templates] *****************************",
        "changed: [controller]  # Automation controller UI",
        "TASK [Surveys, RBAC, workflows] ********************************************",
        "changed: [controller]  # Multi-user environments",
        "TASK [System roles & wrap-up] **********************************************",
        "ok: [rhel-01]",
        "PLAY RECAP *****************************************************************",
        "rhel-01    : ok=8  changed=5  unreachable=0  failed=0",
        "controller : ok=2  changed=2  unreachable=0  failed=0",
        "---",
        "AUDIENCE: Sysadmins, DevOps engineers, anyone interested in RHEL automation",
        "PREREQS: None — lab environment provided",
      ],
    },
    windows: {
      name: "windows-automation",
      lines: [
        "SESSION: Red Hat Ansible Automation Workshop — Windows Automation",
        "DATE:    Wed, Oct 21, 2026  |  11 AM – 2 PM CT  |  3 hours",
        "---",
        "Identity confirmed: workshop-user",
        "Using inventory: windows-lab",
        "TASK [Exercise 1 — Configure Automation Controller] ************************",
        "ok: [controller]   # Credentials & inventories",
        "TASK [Exercise 2 — Ad-hoc commands] ****************************************",
        "ok: [win-01]       # Running ad-hoc against Windows hosts",
        "TASK [Exercise 3 — Intro to playbooks] *************************************",
        "changed: [win-01]  # Create & edit Ansible Playbooks",
        "TASK [Exercise 3 — Advanced playbook methodologies] ************************",
        "changed: [win-01]  # Roles, variables, templates",
        "TASK [Exercise 4 — Configure a job template] *******************************",
        "changed: [controller]  # Automation controller job templates",
        "PLAY RECAP *****************************************************************",
        "win-01     : ok=4  changed=3  unreachable=0  failed=0",
        "controller : ok=2  changed=1  unreachable=0  failed=0",
        "---",
        "AUDIENCE: Windows admins, cloud admins, DevOps, security professionals",
        "PREREQS: None — lab environment provided",
      ],
    },
    network: {
      name: "network-automation",
      lines: [
        "SESSION: Red Hat Ansible Automation Workshop — Network Automation",
        "DATE:    Wed, Nov 18, 2026  |  11 AM – 2 PM CT  |  3 hours",
        "---",
        "Identity confirmed: workshop-user",
        "Using inventory: network-lab  (Cisco IOS-XE, Arista EOS, Juniper Junos)",
        "TASK [Explore lab environment & CLI tools] *********************************",
        "ok: [rtr1-cisco]",
        "ok: [rtr2-arista]",
        "ok: [rtr3-junos]",
        "TASK [First playbook — ansible-navigator] **********************************",
        "changed: [rtr1-cisco]  # Network automation basics",
        "TASK [Gather facts & resource modules] *************************************",
        "ok: [rtr1-cisco]      # Vendor-agnostic config management",
        "ok: [rtr2-arista]",
        "ok: [rtr3-junos]",
        "TASK [Backup & restore network configs] ************************************",
        "changed: [rtr1-cisco]",
        "changed: [rtr2-arista]",
        "TASK [Job templates, surveys, RBAC, workflows] *****************************",
        "changed: [controller]  # Multi-user environments",
        "PLAY RECAP *****************************************************************",
        "rtr1-cisco : ok=5  changed=2  unreachable=0  failed=0",
        "rtr2-arista: ok=3  changed=1  unreachable=0  failed=0",
        "rtr3-junos : ok=2  changed=0  unreachable=0  failed=0",
        "controller : ok=1  changed=1  unreachable=0  failed=0",
        "---",
        "AUDIENCE: Network engineers, sysadmins, automation architects",
        "PREREQS: None — basic networking knowledge helpful",
      ],
    },
  };

  function writeLog(text, append) {
    log.textContent = append ? log.textContent + text : text;
  }

  launch.addEventListener("click", function () {
    clearInterval(timer);
    const tmpl = templates[select.value];
    status.textContent = "running";
    status.className = "muted";
    launch.disabled = true;
    writeLog("Launching job template " + tmpl.name + "…\n");
    let i = 0;
    timer = setInterval(function () {
      if (i >= tmpl.lines.length) {
        clearInterval(timer);
        status.textContent = "successful";
        status.className = "status-ok";
        launch.disabled = false;
        return;
      }
      writeLog(tmpl.lines[i] + "\n", true);
      i += 1;
    }, 280);
  });
})();
