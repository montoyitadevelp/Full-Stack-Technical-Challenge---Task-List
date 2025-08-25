import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export abstract class Repository<T> {
  protected prisma = prisma;
  protected abstract model: any;

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }
  

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: Record<string, any>): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: Record<string, any>): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({ where: { id } });
  }
}
