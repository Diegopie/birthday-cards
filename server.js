const express = require("express");
const apiRoutes = require('./routes/api-routes')
require('./config/db')();

const app = express();
const PORT = process.env.PORT || 4091;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/html.routes.js")(app);
app.use(apiRoutes);

app.listen(PORT, () => console.log("App listening on http://localhost:" + PORT));
