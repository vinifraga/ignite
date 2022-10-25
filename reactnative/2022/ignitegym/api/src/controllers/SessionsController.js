const knex = require("../database");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const GenerateRefreshToken = require("../providers/GenerateRefreshToken");
const GenerateToken = require("../providers/GenerateToken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 404);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 404);
    }

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(user.id);

    await knex("users_tokens").where({ user_id: user.id }).delete();

    const generateRefreshToken = new GenerateRefreshToken();
    generateRefreshToken.execute(user.id, token);

    delete user.password;

    response.status(201).json({ token, user });
  }
}

module.exports = SessionsController;