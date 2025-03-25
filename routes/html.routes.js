const path = require("path");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/make-card", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/make-card.html"));
  });
  app.get("/23", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/past/23/23.html"));
  });
  app.get("/24", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/past/24/24.html"));
  });
}