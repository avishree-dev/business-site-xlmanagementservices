// =========================
// STATE
// =========================
let jobs = {};
let currentStep = 0;

// =========================
// JOB DATA
// =========================
async function loadJobs() {
  try {
    const res = await fetch('/js/data/jobs.json');
    jobs = await res.json();
  } catch (err) {
    console.error("Failed to load jobs:", err);
  }
}

// =========================
// JOB PANEL SYSTEM
// =========================
function initJobCards() {
  const panel = document.getElementById('jobPanel');

  window.closePanel = function () {
    panel.classList.remove('active');
    document.querySelectorAll('.job-card').forEach(c => c.classList.remove('active'));
  };

  document.addEventListener('click', function (e) {
    const card = e.target.closest('.job-card');
    if (!card) return;

    const job = jobs[card.dataset.job];
    if (!job) return;

    if (window.innerWidth < 768) {
    openJobSheet(job);
    return;
    }

    document.querySelectorAll('.job-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    panel.classList.remove('active');

    setTimeout(() => {
      panel.innerHTML = `
        <div class="panel-content">
          <div class="panel-header">
            <h3>${job.title}</h3>
            <button class="close-btn" onclick="closePanel()">×</button>
          </div>

          <p>${job.description}</p>

          <div class="panel-grid">
            <div>
              <h4>Responsibilities</h4>
              <ul>${job.responsibilities.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>

            <div>
              <h4>Requirements</h4>
              <ul>${job.requirements.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
          </div>

          <button class="btn btn-primary"
            onclick="openModal('${job.applyRole}')">
            Apply in 30 Seconds
          </button>
        </div>
      `;

      panel.classList.add('active');
      scrollWithOffset(panel);
    }, 150);
  });
}

//=========================
//Job Sheet
//=========================
function openJobSheet(job) {
  const sheet = document.getElementById('jobSheet');
  const overlay = document.getElementById('sheetOverlay');
  const content = document.getElementById('sheetContent');


  if (!sheet || !content) return;

  overlay.classList.add('active');

  content.innerHTML = `
  <h3>${job.title}</h3>
  <p>${job.description}</p>

  <div class="sheet-section">
    <strong>Requirements</strong>
    <ul>
      ${job.requirements.map(i => `<li>${i}</li>`).join('')}
    </ul>
  </div>

  <div class="sheet-section">
    <strong>Responsibilities</strong>
    <ul>
      ${job.responsibilities.map(i => `<li>${i}</li>`).join('')}
    </ul>
  </div>

  <div class="sheet-cta">
    <button class="btn btn-primary"
      onclick="openModal('${job.applyRole}')">
      Apply Now
    </button>
  </div>
`;

  sheet.classList.add('active');
}

// =========================
// MODAL SYSTEM
// =========================
function openModal(role) {
  const modal = document.getElementById('applyModal');
  const roleInput = document.getElementById('roleInput');
  const roleText = document.getElementById('modalRoleText');
  const messageBox = document.getElementById('formMessage');

  if (messageBox) {
    messageBox.classList.remove("success", "error");
    messageBox.textContent = "";
  }

  document.getElementById('jobSheet')?.classList.remove('active');
  document.getElementById('sheetOverlay')?.classList.remove('active');
  modal.classList.add('active');

  const form = document.querySelector("#applyForm");
  const header = document.querySelector(".modal-header");
    
  document.getElementById('applyForm').reset();

  document.querySelectorAll('.career-options button').forEach(btn => {
    btn.classList.remove('active');
  });

  roleInput.value = role;
  roleText.textContent = "Role: " + role;



  document.body.classList.add('no-scroll');
}

function closeModal() {
  const modal = document.getElementById('applyModal');
  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function initModalScroll() {
  const form = document.querySelector("#applyForm");
  const header = document.querySelector(".modal-header");

  if (!form || !header) return;

  form.addEventListener("scroll", () => {
    header.classList.toggle("shrink", form.scrollTop > 20);
  });
}

// =========================
// FORM HANDLER
// =========================
function initForm() {
  const formEl = document.getElementById('applyForm');

  document.querySelectorAll('.enquiry-type').forEach(group => {
    const buttons = group.querySelectorAll('.career-options button');
    const hiddenInput = group.querySelector('input[type="hidden"]');

    buttons.forEach(button => {
      button.addEventListener('click', () => {

        // remove active state from current group
        buttons.forEach(btn => btn.classList.remove('active'));

        // activate clicked button
        button.classList.add('active');

        // store value in hidden input
        hiddenInput.value = button.textContent.trim();
      });
    });
  });

  formEl.addEventListener('submit', async function (e) {
    e.preventDefault();


    const submitBtn = this.querySelector("button[type='submit']");
    const messageBox = document.getElementById('formMessage');

    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;



    const form = new FormData(this);
    const resumeFile = form.get('resume');

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    if (resumeFile && resumeFile.size > 0) {

      if (resumeFile.type !== "application/pdf") {
        messageBox.textContent =
          "Please upload a PDF file.";
        messageBox.className =
          "form-message error";

        submitBtn.textContent = "Apply Now";
        submitBtn.disabled = false;
        return;
      }

      if (resumeFile.size > MAX_FILE_SIZE) {
        messageBox.textContent =
          "Resume must be smaller than 5 MB.";
        messageBox.className =
          "form-message error";

        submitBtn.textContent = "Apply Now";
        submitBtn.disabled = false;
        return;
      }
    }

  try {
    const response = await fetch(
      "https://ovuozlzhmypacnoqlanz.supabase.co/functions/v1/submit_function",
      {
        method: "POST",
        body: form
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Unknown error");
    }

    if (result.action === "updated") {

      messageBox.textContent =
        "Your application already existed. Your details and resume were updated.";

    } else {

      messageBox.textContent =
        "Application submitted successfully. We'll contact you soon.";

      this.reset();

      document
        .querySelectorAll('.career-options button')
        .forEach(btn => btn.classList.remove('active'));

      setTimeout(() => {
        closeModal();
      }, 1200);
    }

    messageBox.className =
      "form-message success";

  } catch (err) {

    console.error(err);

    messageBox.textContent =
      err.message || "Something went wrong.";

    messageBox.className =
      "form-message error";
  }
    finally {
    submitBtn.textContent = "Apply Now";
    submitBtn.disabled = false;
  }
    })
  };
  // ========================
  // Hero Buttons
  //=========================
  window.selectRole = function(role) {
  openModal(role);
  };

  //=========================
  //Scroll to Jobs
  //=========================
  window.scrollToJobs = function () {
    const section = document.getElementById('jobsSection');
    if (!section) return;
    setTimeout(() => {
      scrollWithOffset(section);
    }, 150);
  };
  //==================
  //Scroll With Offset
  //==================
  function scrollWithOffset(element) {
    const offset = document.querySelector('.navbar')?.offsetHeight || 80;

    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
  //====================
  //Overlay
  //====================
  function initSheetOverlay() {
    const overlay = document.getElementById('sheetOverlay');
    const sheet = document.getElementById('jobSheet');

    if (!overlay || !sheet) return;

    overlay.addEventListener('click', () => {
      sheet.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadJobs();
  initJobCards();
  initForm();
  initSheetOverlay();
  initModalScroll();
}