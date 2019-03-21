const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("../passportConfig");

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_CLIENTID,
      clientSecret: config.FACEBOOK_CLIENTSECRET,
      callbackURL: config.FACEBOOK_CALLBACKURL,
      profileFields: ["id", "email", "name", "picture"]
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = (app, server) => {
  server.get("/auth/facebook", passport.authenticate("facebook"));

  server.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { session: false, failureRedirect: "/login" }),
    (req, res) => app.render(req, res, "/authsuccess", { user: req.user })
  );
};
