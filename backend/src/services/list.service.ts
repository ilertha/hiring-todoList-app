import { Repository,Between } from "typeorm";
import { ListEntity } from "../entity";
import { AppDataSouce } from "../db";
import { ListType } from "../type";

export class ListService {
  private listRepository: Repository<ListEntity>;

  constructor() {
    this.listRepository = AppDataSouce.getRepository(ListEntity);
  }

  /**
   * Create a new list
   */
  async createList(userId: string, data: ListType): Promise<ListEntity> {
    try {
      const newList = this.listRepository.create({
        ...data,
        user: { uuid: userId },
      });
      return await this.listRepository.save(newList);
    } catch (error) {
      console.error("Error creating list:", error);
      throw new Error("Failed to create list");
    }
  }

  /**
   * Get all lists for a user
   */
  async getAllLists(userId: string): Promise<ListEntity[]> {
    try {
      return await this.listRepository.find({
        where: { user: { uuid: userId } },
        order: {
          createdAt: "DESC"
        },
        relations: ["user"] // Include user relation if needed
      });
    } catch (error) {
      console.error("Error fetching lists:", error);
      throw new Error("Failed to fetch lists");
    }
  }

  /**
   * Get a specific list by ID
   */
  async getListById(userId: string, listId: string): Promise<ListEntity | null> {
    try {
      return await this.listRepository.findOne({
        where: { uuid: listId, user: { uuid: userId } },
        relations: ["user"]
      });
    } catch (error) {
      console.error("Error fetching list:", error);
      throw new Error("Failed to fetch list");
    }
  }

  /**
   * Update a list
   */
  async updateList(userId: string, listId: string, data: Partial<ListType>): Promise<ListEntity> {
    try {
      const existingList = await this.getListById(userId, listId);
      if (!existingList) {
        console.error("List not found");
        throw new Error("List not found");
      }

      await this.listRepository.update(
        {
          uuid: listId,
          user: { uuid: userId }
        },
        data
      );

      return await this.getListById(userId, listId);
    } catch (error) {
      console.error("Error updating list:", error);
      throw new Error("Failed to update list");
    }
  }

  /**
   * Delete a list
   */
  async deleteList(userId: string, listId: string): Promise<boolean> {
    try {
      const result = await this.listRepository.delete({
        uuid: listId,
        user: { uuid: userId }
      });
      return result.affected ? result.affected > 0 : false;
    } catch (error) {
      console.error("Error deleting list:", error);
      throw new Error("Failed to delete list");
    }
  }

 

  /**
   * Get important lists
   */
  async getImportantLists(userId: string): Promise<ListEntity[]> {
    try {
      return await this.listRepository.find({
        where: { user: { uuid: userId }, important: true },
        order: {
          createdAt: "DESC"
        },
        relations: ["user"]
      });
    } catch (error) {
      console.error("Error fetching important lists:", error);
      throw new Error("Failed to fetch important lists");
    }
  }

  /**
   * Get completed lists
   */
  async getCompletedLists(userId: string): Promise<ListEntity[]> {
    try {
      return await this.listRepository.find({
        where: { user: { uuid: userId }, completed: true },
        order: {
          createdAt: "DESC"
        },
        relations: ["user"]
      });
    } catch (error) {
      console.error("Error fetching completed lists:", error);
      throw new Error("Failed to fetch completed lists");
    }
  }

  /**
   * Toggle list completion status
   */
  async toggleListComplete(userId: string, listId: string): Promise<ListEntity> {
    try {
      const list = await this.getListById(userId, listId);
      if (!list) {
        throw new Error("List not found");
      }

      return await this.updateList(userId, listId, {
        completed: !list.completed
      });
    } catch (error) {
      console.error("Error toggling list completion:", error);
      throw new Error("Failed to toggle list completion");
    }
  }

  /**
   * Toggle list importance
   */
  async toggleListImportance(userId: string, listId: string): Promise<ListEntity> {
    try {
      const list = await this.getListById(userId, listId);
      if (!list) {
        throw new Error("List not found");
      }

      return await this.updateList(userId, listId, {
        important: !list.important
      });
    } catch (error) {
      console.error("Error toggling list importance:", error);
      throw new Error("Failed to toggle list importance");
    }
  }

  /**
   * Get lists due today
   */
  async getDueTodayLists(userId: string): Promise<ListEntity[]> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return await this.listRepository.find({
        where: {
          user: { uuid: userId },
          duedate: Between(today, tomorrow)
        },
        order: {
          createdAt: "DESC"
        },
        relations: ["user"]
      });
    } catch (error) {
      console.error("Error fetching due today lists:", error);
      throw new Error("Failed to fetch due today lists");
    }
  }

  /**
   * Search lists by title or description
   */
  async searchLists(userId: string, searchTerm: string): Promise<ListEntity[]> {
    try {
      return await this.listRepository
        .createQueryBuilder("list")
        .leftJoinAndSelect("list.user", "user")
        .where("user.uuid = :userId", { userId })
        .andWhere(
          "(LOWER(list.title) LIKE LOWER(:searchTerm) OR LOWER(list.description) LIKE LOWER(:searchTerm))",
          { searchTerm: `%${searchTerm}%` }
        )
        .orderBy("list.createdAt", "DESC")
        .getMany();
    } catch (error) {
      console.error("Error searching lists:", error);
      throw new Error("Failed to search lists");
    }
  }
}

// Create a singleton instance
export const listService = new ListService();