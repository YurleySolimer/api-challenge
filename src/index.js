const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./handlers/handleError')

const indexRoutes = require("./routes/index.js");
const { swaggerDocs } = require("./swagger")

const app = express()
app.set("port", process.env.PORT || 3000);

app.use(cors())
app.use(morgan("dev"));

app.use("/", indexRoutes);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const server = app.listen(app.get("port"), function(){
    swaggerDocs(app, app.get("port"))
    console.log("Server on port", app.get("port"))
}); 

module.exports = server;