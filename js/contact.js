//LOAD MAPS
function loadMap(el) {
  el.innerHTML = `
    <iframe 
      src="https://www.google.com/maps?q=537+Raja+Basanta+Roy+Road+Kolkata&output=embed"
      width="100%" 
      height="100%" 
      style="border:0;"
      loading="lazy">
    </iframe>
  `;
}


//SEND CONTACT FORM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const button = form.querySelector("button");
  const typeInput = document.querySelector('input[name="type"]');
  const typeButtons = document.querySelectorAll('.enquiry-options button');

  typeButtons.forEach(button => {
    button.addEventListener('click', () => {
      typeInput.value = button.dataset.value;

      typeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending...";
    button.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      status.textContent = "❌ Something went wrong. Try again.";
    }

    button.disabled = false;
  });
});