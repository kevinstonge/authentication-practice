const express = require("express");
const server = express();
server.use(express.json());
const cors = require("cors");
server.use(cors());
const helmet = require("helmet");
server.use(helmet());

server.get('/', (req, res) => { res.status(200).json({ message: "server online" }) });

const registrationRouter = require('./api/register/registrationRouter.js');
server.use('/register', registrationRouter);

const loginRouter = require('./api/login/loginRouter.js');
server.use('/login', loginRouter);

module.exports = server;