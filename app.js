const U2F = require("u2f");
const Express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const HTTPS = require("https");
const FS = require("fs");
const session = require("express-session");

const APP_ID = "https://trends247.live";

var app = Express();

app.use(session({ secret: "thepolyglotdeveloper", cookie: { secure: true, maxAge: 60000 }, saveUninitialized: true, resave: true }));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors({ origin: [APP_ID], credentials: true }));

var user;

app.get("/register", (request, response, next) => {
    request.session.u2f = U2F.request(APP_ID);
    response.send(request.session.u2f);
});

app.post("/register", (request, response, next) => {
    console.log(request.session.u2f, request.body.registerResponse);
    var registration = U2F.checkRegistration(request.session.u2f, request.body.registerResponse);
    console.log(registration);
    if (!registration.successful) {
        return response.status(500).send({ message: "error" });
    }
    user = registration;
    response.send({ message: "The hardware key has been registered" });
});

app.get("/login", (request, response, next) => {
    request.session.u2f = U2F.request(APP_ID, user.keyHandle);
    response.send(request.session.u2f);
});

app.post("/login", (request, response, next) => {
    var success = U2F.checkSignature(request.session.u2f, request.body.loginResponse, user.publicKey);
    response.send(success);
});

app.use(Express.static(__dirname + '/dist')); //Serves resources from public folder

HTTPS.createServer({
    key: FS.readFileSync("./private.key"),
    cert: FS.readFileSync("./certificate.crt"),
}, app).listen(443, () => {
    console.log("Listening at :443...");
});
