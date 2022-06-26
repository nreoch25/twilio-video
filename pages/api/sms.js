export default async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const { room, name, number, baseUrl } = req.body;

  await client.messages
    .create({
      body: `Video Chat: ${baseUrl}/join?room=${room}&name=${name}}`,
      from: "+18124976070",
      to: `+1${number}`,
    })
    .then((message) => console.log(message.sid));

  res.send({ success: true });
};
