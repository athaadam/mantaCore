import { sequelize } from '../config/database.js';

class ItemController {
  static async getAllItems(req, res) {
    try {
      const companyID = req.user.companyID;

      const [items] = await sequelize.query(
        `SELECT
          itemID,
          name,
          itemPrice as price,
          category,
          type,
          units,
          stock,
          created_at as createdAt
        FROM items
        WHERE companyID = ?
        ORDER BY name ASC`,
        { replacements: [companyID] }
      );

      res.status(200).json({
        message: 'Items fetched successfully',
        items: items
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getItemById(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ item: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createItem(req, res) {
    try {
      res.status(201).json({ message: 'Item created' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ message: 'Item updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ItemController;
