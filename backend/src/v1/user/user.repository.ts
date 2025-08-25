import { Repository, prisma } from "../core/repository";
import { usuario } from "@prisma/client";

export class UserRepository extends Repository<usuario> {
  protected model = prisma.usuario;

  findByEmail(email: string) {
    return this.model.findUnique({ where: { email } });
  }
}
