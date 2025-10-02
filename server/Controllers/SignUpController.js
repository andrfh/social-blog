import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";

class SignUpController {
  async signUp(req, res) {
    try {
      const { login, password, name, surname } = req.body;

      const candidate = await User.findOne({ login });
      if (candidate) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = new User({ login, passwordHash: hash, name, surname });
      await user.save();

      const token = jwt.sign(
        { id: user._id },
        config.jwtSecret,
        { expiresIn: "15m" }
      );

      res.json({ token, user: { id: user._id, login: user.login, name: user.name, surname: user.surname } });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка при регистрации" });
    }
  }
}

export default new SignUpController()