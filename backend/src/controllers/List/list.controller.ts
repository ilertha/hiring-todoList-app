import { Request, Response } from "express";
import { listService } from "../../services/list.service";

export class ListController {
  // Create a new list
  async createList(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const list = await listService.createList(userId, req.body);
      res.status(201).json(list);
    } catch (error) {
      res.status(500).json({ message: "Error creating list" });
    }
  }

  // Get all lists
  async getAllLists(req, res: Response) {
    try {
      const userId = req.user.uuid;
      console.log("userId:",userId)
      const lists = await listService.getAllLists(userId);
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lists" });
    }
  }

  // Get a specific list
  async getListById(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const list = await listService.getListById(userId, req.params.id);
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: "Error fetching list" });
    }
  }

  // Update a list
  async updateList(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const updatedList = await listService.updateList(userId, req.params.id, req.body);
      if (!updatedList) {
        return res.status(404).json({ message: "List not found" });
      }
      res.json(updatedList);
    } catch (error) {
      res.status(500).json({ message: "Error updating list" });
    }
  }

  // Delete a list
  async deleteList(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const deleted = await listService.deleteList(userId, req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "List not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting list" });
    }
  }



  // Get important lists
  async getImportantLists(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const lists = await listService.getImportantLists(userId);
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: "Error fetching important lists" });
    }
  }

  // Get completed lists
  async getCompletedLists(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const lists = await listService.getCompletedLists(userId);
      res.json(lists);
    } catch (error) {
      res.status(500).json({ message: "Error fetching completed lists" });
    }
  }

  // Toggle completion status
  async toggleListComplete(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const list = await listService.toggleListComplete(userId, req.params.id);
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: "Error toggling list completion" });
    }
  }

  // Toggle importance status
  async toggleListImportance(req, res: Response) {
    try {
      const userId = req.user.uuid;
      const list = await listService.toggleListImportance(userId, req.params.id);
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: "Error toggling list importance" });
    }
  }
}

export const listController = new ListController();