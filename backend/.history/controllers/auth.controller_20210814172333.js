const casual = require("casual");
const user = require("../models/user.model");
const hashPassword = require("../hashPassword");
const jwt = require("jsonwebtoken");
const serectKey = process.env.SERECT_KEY;
module.exports = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const salt = casual.uuid;
      const newUser = new user({
        username,
        password: hashPassword.encrypt(password, salt),
        email,
      });
      newUser.salt = salt;
      try {
        await newUser.save((err) => {
          if (err.code === 11000) {
            return res.send(422, {
              status: false,
              message: "Tai khoan da ton tai!",
            });
          }
          return res.sendStatus(422);
        });
        return res.status(200).send({
          url: "/",
        });
      } catch (error) {
        throw error;
      }
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
