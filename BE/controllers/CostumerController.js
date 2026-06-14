import { sequelize } from '../config/database.js';

class CostumerController {
  static async getAllCostumers(req, res) {
    try {
      const companyID = req.user.companyID;

      const [costumers] = await sequelize.query(
        `SELECT
          costumerID,
          username,
          email,
          phone_number as phone,
          created_at as createdAt
        FROM costumers
        WHERE companyID = ?
        ORDER BY username ASC`,
        { replacements: [companyID] }
      );

      res.status(200).json({
        message: 'Costumers fetched successfully',
        costumers: costumers
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createCostumer(req, res) {
    try {
      res.status(201).json({ message: 'Costumer created' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getCostumerById(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ costumer: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateCostumer(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ message: 'Costumer updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteCostumer(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ message: 'Costumer deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default CostumerController;
