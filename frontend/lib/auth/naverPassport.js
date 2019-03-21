const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const config = require("../passportConfig");

passport.use(
  new NaverStrategy(
    {
      clientID: config.NAVER_CLIENTID,
      clientSecret: config.NAVER_CLIENTSECRET,
      callbackURL: config.NAVER_CALLBACKURL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = (app, server) => {
  server.get("/auth/naver", passport.authenticate("naver"));

  server.get(
    "/auth/naver/callback",
    passport.authenticate("naver", { session: false, failureRedirect: "/login" }),
    (req, res) => app.render(req, res, "/authsuccess", { user: req.user })
  );
};
