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