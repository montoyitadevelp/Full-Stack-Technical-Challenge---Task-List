
import { TaskRepository } from "./task.repository";
import { NotFoundError } from "../core/errors";
import { CategoryRepository } from "../category/category.repository";
import { LabelTaskRepository } from "../label/label.repository";
import { toTaskDTO } from "./task.dto";

export class TaskService {
  private tasks = new TaskRepository();
  private categories = new CategoryRepository();
  private labels = new LabelTaskRepository();

  async getById(userId: string, id: string) {
    const task = await this.tasks.findByIdWithRelations(id, userId);
    if (!task) throw new NotFoundError("Task not found");
    return task;
  }


  async getAll(filters?: Record<string, any>) {
    const dto = toTaskDTO(filters);

    return this.tasks.findAllWithFilters(dto);
  }
  
  private async validateCategory(userId: string, categoriaId?: string): Promise<string | null> {
    if (!categoriaId) return null;
    const category = await this.categories.findById(categoriaId);
    if (!category || category.usuarioId !== userId) {
      throw new NotFoundError("Category not found");
    }
    return category.id;
  }


  private async validateLabels(userId: string, etiquetas?: string[]) {
    if (!etiquetas) return undefined;
    if (etiquetas.length === 0) return []
    const userLabels = await this.labels.findByIdsAndUser(etiquetas, userId);
    if (userLabels.length !== etiquetas.length) {
      throw new NotFoundError("Some labels not found");
    }
    return userLabels.map(label => label.id);
  }


  async create(userId: string, data: Record<string, any>) {
    const categoryId = await this.validateCategory(userId, data.categoriaId);
    const etiquetasIds = await this.validateLabels(userId, data.etiquetas);

    return this.tasks.create({
      ...data,
      usuarioId: userId,
      categoriaId: categoryId,
      etiquetas: etiquetasIds,
    });
  }

  async update(userId: string, id: string, data: Record<string, any>) {
    const task = await this.tasks.findById(id);
    if (!task || task.usuarioId !== userId) throw new NotFoundError("Task not found");

    const categoryId = await this.validateCategory(userId, data.categoriaId);
    const labelsIds = await this.validateLabels(userId, data.etiquetas);

    const updateData: Record<string, any> = {
      ...data,
      categoryId,
      labels: labelsIds,
    };

    return this.tasks.updateWithLabels(id, updateData);
  }

  async delete(userId: string, id: string) {
    const task = await this.tasks.findById(id);
    if (!task || task.usuarioId !== userId) throw new NotFoundError("Task not found");
    return this.tasks.delete(id);
  }

  async toggleComplete(userId: string, id: string) {
    const task = await this.tasks.findById(id);
    if (!task || task.usuarioId !== userId) throw new NotFoundError("Task not found");
    return this.tasks.updateCompletion(id, !task.completada);
  }
}
