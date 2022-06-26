export default (req, res) => {
  const AccessToken = require("twilio").jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
  const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKeySID,
    twilioApiKeySecret
  );
  const { identity, room } = req.query;
  token.identity = identity;
  const videoGrant = new VideoGrant({ room });
  token.addGrant(videoGrant);
  res.end(JSON.stringify({ token: token.toJwt() }));
};
