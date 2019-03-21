const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const config = require("../passportConfig");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENTID,
      clientSecret: config.GOOGLE_CLIENTSECRET,
      callbackURL: config.GOOGLE_CALLBACKURL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = (app, server) => {
  server.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

  server.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => app.render(req, res, "/authsuccess", { user: req.user })
  );
};
