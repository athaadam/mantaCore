import { sequelize } from '../config/database.js';

class PurchaseController {
  static async getAllPurchases(req, res) {
    try {
      const companyID = req.user.companyID;

      const [purchases] = await sequelize.query(
        `SELECT
          p.purchaseID,
          p.date,
          p.amount,
          p.status,
          u.username as userName,
          GROUP_CONCAT(
            JSON_OBJECT(
              'name', it.name,
              'category', it.category,
              'quantity', pi.quantity,
              'unitPrice', pi.unitPrice
            )
          ) as items_json
        FROM purchases p
        LEFT JOIN users u ON p.userID = u.userID
        LEFT JOIN purchase_items pi ON p.purchaseID = pi.purchaseID
        LEFT JOIN items it ON pi.itemID = it.itemID
        WHERE p.companyID = ?
        GROUP BY p.purchaseID
        ORDER BY p.date DESC`,
        { replacements: [companyID] }
      );

      const formattedPurchases = purchases.map(purch => ({
        purchaseID: purch.purchaseID,
        date: new Date(purch.date).toLocaleDateString('en-GB'),
        amount: parseFloat(purch.amount),
        status: purch.status,
        user: { username: purch.userName || 'N/A' },
        items: purch.items_json ? JSON.parse(`[${purch.items_json}]`).map(item => ({
          item: {
            name: item.name,
            category: item.category
          },
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })) : []
      }));

      res.status(200).json({
        message: 'Purchases fetched successfully',
        purchases: formattedPurchases
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createPurchase(req, res) {
    try {
      res.status(201).json({ message: 'Purchase created' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPurchaseById(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ purchase: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMyPurchases(req, res) {
    try {
      res.status(200).json({ purchases: [] });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePurchase(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ message: 'Purchase updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deletePurchase(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ message: 'Purchase deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async purchaseReport(req, res) {
    try {
      res.status(200).json({ report: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default PurchaseController;
