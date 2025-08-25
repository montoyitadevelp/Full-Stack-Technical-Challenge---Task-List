import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import { BadRequestError, NotFoundError } from "../core/errors";

import { toUserDTO } from "./user.dto";
import config from "../../config";

export class UserService {
  private users = new UserRepository();

  private generateToken(id: string) {
    return jwt.sign({ id }, config.jwt.secret as jwt.Secret, { expiresIn: config.jwt.expires as any });
  }

  async register(nombre: string, email: string, password: string) {
    const exists = await this.users.findByEmail(email);
    if (exists) throw new BadRequestError("User already exists");

    const hash = await bcrypt.hash(password, 10);
    const user = await this.users.create({ nombre, email, password: hash });

    return toUserDTO(user);
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new NotFoundError("The user doesn't exist");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new BadRequestError("Invalid email or password");

    return this.generateToken(user.id);
  }

  async getProfile(id: string) {
    const user = await this.users.findById(id);
    if (!user) throw new BadRequestError("User not found");
    return toUserDTO(user);
  }
}
