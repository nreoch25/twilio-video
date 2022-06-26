export default async (req, res) => {
  const sendgridAPIKey = process.env.SENDGRID_API_KEY;
  const sgMail = require("@sendgrid/mail");

  const { email, room, name, baseUrl } = req.body;

  sgMail.setApiKey(sendgridAPIKey);

  const msg = {
    to: email,
    from: "nreoch9+developal-support@gmail.com",
    subject: `Hello ${name}, join our video chat`,
    html: `
      <div style="font-family: sans-serif;">
        <div>
          <h4>Hello ${name},</h4>
          <strong>Please click the below link to start your video chat</strong>
        </div>
        <div>
          <a href="${baseUrl}/join?room=${room}&name=${name}">${baseUrl}/join?room=${room}&name=${name}</a>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    res.send({ success: "yes" });
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.send({ success: "no" });
  }
};
