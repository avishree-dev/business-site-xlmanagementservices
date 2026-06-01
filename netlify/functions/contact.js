const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const destination =
      data.type === "job"
        ? "careers@xlms.in"
        : "corporate@xlms.in";

    const subject =
      data.type === "job"
        ? "New Job Enquiry"
        : "New Business Enquiry";

    await resend.emails.send({
      from: "corporate@xlms.in",
      to: destination,
      replyTo: data.email,
      subject,
      html: `
        <h2>${subject}</h2>

        <table cellpadding="6">
          <tr>
            <td><strong>Name</strong></td>
            <td>${data.name}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${data.email}</td>
          </tr>

          <tr>
            <td><strong>Phone</strong></td>
            <td>${data.phone}</td>
          </tr>

          <tr>
            <td><strong>Company</strong></td>
            <td>${data.company || "-"}</td>
          </tr>

          <tr>
            <td><strong>Type</strong></td>
            <td>${data.type}</td>
          </tr>
        </table>

        <hr>

        <p>${data.message}</p>
      `,
    });

    if (data.type === "business") {
      await resend.emails.send({
        from: "corporate@xlms.in",
        to: data.email,
        subject: "Thank You for Contacting XL Management Services",
        html: `
          <p>Dear ${data.name},</p>

          <p>
            Thank you for contacting XL Management Services.
          </p>

          <p>
            We have received your enquiry and a member of our team
            will review it and get in touch with you shortly.
          </p>

          <p>
            To learn more about our organization, services, and experience,
            please review our company profile:
          </p>

          <p>
            <a href="https://www.xlms.in/assets/docs/XLMS-Company-Profile.pdf">
              Download Company Profile
            </a>
          </p>

          <p>
            We appreciate your interest in working with XL Management Services
            and look forward to speaking with you.
          </p>

          <p>
            Kind regards,<br>
            XL Management Services<br>
            +91 7003098956
          </p>
        `,
      });
    }
    if (data.type === "job") {
      await resend.emails.send({
        from: "careers@xlms.in",
        to: data.email,
        subject: "Application Received – XL Management Services",
        html: `
          <p>Dear ${data.name},</p>

          <p>
            Thank you for your interest in opportunities with
            XL Management Services.
          </p>

          <p>
            We have successfully received your enquiry/application.
          </p>

          <p>
            Our HR team will review the information provided and
            contact shortlisted candidates if there is a suitable
            opportunity matching their profile.
          </p>

          <p>
            We appreciate your interest in joining our organization
            and wish you the very best.
          </p>

          <p>
            Kind regards,<br>
            HR Team<br>
            XL Management Services
          </p>
        `,
      });
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};