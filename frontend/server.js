const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // server.use((req, res, next) => {
    //   req.url = req.originalUrl.replace(`staging/_next`, "_next");
    //   next(); // be sure to let the next middleware handle the modified request.
    // });

    server.get("/", (req, res) => {
      return app.render(req, res, "/", req.params);
    });

    server.get("/signup", (req, res) => {
      return app.render(req, res, "/signup", req.params);
    });

    server.get("/login", (req, res) => {
      return app.render(req, res, "/login", req.params);
    });

    server.get("/about", (req, res) => {
      return app.render(req, res, "/about", req.params);
    });

    server.get("/poem/:hashedId/:title", (req, res) => {
      return app.render(req, res, "/poem", req.params);
    });

    server.get("/write/:id", (req, res) => {
      return app.render(req, res, "/write", req.params);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.log(ex);
    process.exit(1);
  });
