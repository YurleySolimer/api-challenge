const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const indexRoutes = require("./routes/index.js");
const app = express()

// settings
app.set("port", process.env.PORT || 3000);

app.use(cors())
app.use(morgan("dev"));

app.use("/api/v1", indexRoutes);

// listening the Server
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));