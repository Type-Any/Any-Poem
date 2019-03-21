const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const config = require("../passportConfig");

passport.use(
  new KakaoStrategy(
    {
      clientID: config.KAKAO_CLIENTID,
      clientSecret: config.KAKAO_CLIENTSECRET,
      callbackURL: config.KAKAO_CALLBACKURL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = (app, server) => {
  server.get("/auth/kakao", passport.authenticate("kakao"));

  server.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", { session: false, failureRedirect: "/login" }),
    (req, res) => app.render(req, res, "/authsuccess", { user: req.user })
  );
};
