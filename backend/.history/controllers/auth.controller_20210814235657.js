const casual = require("casual");
const user = require("../models/users.model");
const hashPassword = require("../modules/hashPassword");
const jwt = require("jsonwebtoken");
const serectKey = process.env.SERECT_KEY;
module.exports = {
  register: async (req, res) => {
    try {
      const salt = casual.uuid;
      const newUser = new user({
        username,
        salt,
        password: hashPassword.encrypt(password, salt),
        email,
      });
      await newUser.save((err) => {
        console.log(err);
      });
      return res.status(200).send({
        url: "/",
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const getId = await user.findOne({ username });
      const token = jwt.sign({ id: getId._id, username }, serectKey, {
        expiresIn: "5m",
      });
      const salt = getId.salt;
      const passwordDb = getId.password;
      const passwordHashed = hashPassword.encrypt(password, salt);
      if (passwordHashed === passwordDb) {
        res.status(200).send(token);
      } else {
        res.sendStatus(403).send("Sai tai khoan hoac mat khau nha");
      }
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: (req, res) => {
    const token = req.headers["authorization"];
    jwt.verify(token, serectKey, (error, data) => {
      if (error) throw error;
      const { id, username } = data;
      const tokenRefreshed = jwt.sign({ id, username }, serectKey, {
        expiresIn: "10m",
      });
      return res.status(200).send(tokenRefreshed);
    });
  },
};
