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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending...";
    button.disabled = true;

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