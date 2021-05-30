"use strict";
exports.__esModule = true;
require("dotenv").config();
var express = require("express");
var http = require("http");
var path = require("path");
var Server = require("socket.io").Server;
// const { Server } = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:8000",
//     methods: ["GET", "POST"],
//   },
// });
var Confluent_1 = require("./../../kafka-socks/Confluent");
var Consumer_1 = require("./../../kafka-socks/Consumer");
var Subject_1 = require("./../../kafka-socks/Subject");
var app = express();
var server = http.createServer(app);
var io = new Server(server);
var PORT = 3000;
//prior to bringing this in from .env file, we continually received the "split of"
// const { API_KEY: string, API_SECRET: string, KAFKA_BOOTSTRAP_SERVER: string } = process.env;
var API_KEY = "PS5UR5WJMR3M4IUK";
var API_SECRET = "sViLnhxYPSZzirnBznMVHxRoQbvltcpmOJjlvnuv0f+SW138XyA1ZmO/kp7K87sg";
var KAFKA_BOOTSTRAP_SERVER = "pkc-lzvrd.us-west4.gcp.confluent.cloud:9092";
// app.use("/", (req: {}, res: {}) => {
//   express.static(path.join(__dirname, "./../client/"));
// });
app.use(require("cors")());
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client/index.html"));
    // res.sendFile("index.html");
});
// 1. set up the producer to produce messages on interval
var kafka = new Confluent_1["default"](API_KEY, API_SECRET, KAFKA_BOOTSTRAP_SERVER).create("client-id");
var randomizer = function (hi, lo) {
    if (lo === void 0) { lo = 0; }
    return Math.floor(Math.random() * (hi + 1 - lo) + Math.floor(lo));
};
var producer = kafka.producer();
producer
    .connect()
    .then(function () {
    setInterval(function () {
        producer.send({
            topic: "Socks",
            messages: [
                // { key: "some-key", value: Math.floor(Math.random() * 9).toString() },
                {
                    key: "some-key",
                    value: "{\"source\":\"www.npmjs.com\",\"kafka-socks-downloads\":" + randomizer(20).toString() + ",\"average-download-speed\":" + randomizer(2000, 1000) + "}"
                },
            ]
        });
        console.log("message sent");
    }, 1000);
})["catch"](function (err) {
    console.log("Error in producer.connect function", err);
    process.exit(1);
});
// 2. create a kafkasocks instance to:
// a. consume produced messages and
// b. emit them on socket
var consumer = kafka.consumer({ groupId: "group-id" });
var kafkasockClient = new Consumer_1["default"](consumer, "Socks", "new download");
var subject = new Subject_1["default"](io, "trucks");
subject.add(kafkasockClient);
subject.connect();
server.listen(PORT, function () { return console.log("listening on port 3001"); });
