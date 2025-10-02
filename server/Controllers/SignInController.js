import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";

class SignInController {
  async signIn(req, res) {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ login });
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        const isPassValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPassValid) return res.status(401).json({ message: "Неверный пароль" });

        const token = jwt.sign(
        { id: user._id },
        config.jwtSecret,
        { expiresIn: "15m" }
        );

        res.json({ token, user: { id: user._id, login: user.login, name: user.name, surname: user.surname } });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Ошибка при авторизации" });
    }
    }
}

export default new SignInController()