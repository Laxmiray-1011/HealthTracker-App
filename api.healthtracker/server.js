const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const http = require('http') 
const path = require('path');
require('module-alias/register');
require('dotenv').config()

const app = express();
app.use(helmet());

const corsconfig = require('./config/cors.config');
app.use(cors(corsconfig.corsOptions));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


/**
 * Base Route
 */
app.get('/', (req, res) => {
    res.json("WELCOME TO HEALTHTRACKER API.")
})


/**
 * SET Headers
 */
app.use(function (req, res, next) {
    const origin = req.headers.origin;
    if(corsconfig.corsOptions.origin.includes(origin)){
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});


/**
 * Routes
 */
require("./app/routes/api.routes")(app, express);

require("./app/routes/api/patient.js")(app, express);

require("./app/routes/api/admin.js")(app, express);


const server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`SERVER is running on PORT ${PORT}`);
})

