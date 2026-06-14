import { sequelize } from '../config/database.js';

class DashboardController {
  static async totalPenjualan(req, res) {
    try {
      const companyID = req.user.companyID;

      const [result] = await sequelize.query(
        `SELECT SUM(amount) as totalSales FROM invoices WHERE companyID = ? AND DATE(date) IS NOT NULL`,
        { replacements: [companyID] }
      );

      const totalSales = result[0]?.totalSales || 0;

      res.status(200).json({
        message: 'Total sales fetched',
        totalSales: parseFloat(totalSales) || 0
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async todayProfitLoss(req, res) {
    try {
      const companyID = req.user.companyID;
      const today = new Date().toISOString().split('T')[0];

      // Get today's sales revenue
      const [salesResult] = await sequelize.query(
        `SELECT SUM(ii.subTotal) as revenue FROM invoice_items ii
         JOIN invoices i ON ii.invoiceID = i.invoiceID
         WHERE i.companyID = ? AND DATE(i.date) = ? AND ii.type = 'sales'`,
        { replacements: [companyID, today] }
      );

      // Get today's purchase costs
      const [costResult] = await sequelize.query(
        `SELECT SUM(pi.subTotal) as cost FROM purchase_items pi
         JOIN purchases p ON pi.purchaseID = p.purchaseID
         WHERE p.companyID = ? AND DATE(p.date) = ? AND pi.type = 'purchase'`,
        { replacements: [companyID, today] }
      );

      const revenue = parseFloat(salesResult[0]?.revenue || 0);
      const cost = parseFloat(costResult[0]?.cost || 0);
      const profitLoss = revenue - cost;

      res.status(200).json({
        message: 'Today profit/loss fetched',
        profitLoss: profitLoss,
        profit: profitLoss > 0 ? profitLoss : 0,
        loss: profitLoss < 0 ? Math.abs(profitLoss) : 0
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async lifetimeProfitLoss(req, res) {
    try {
      const companyID = req.user.companyID;

      // Get lifetime sales revenue
      const [salesResult] = await sequelize.query(
        `SELECT SUM(ii.subTotal) as revenue FROM invoice_items ii
         JOIN invoices i ON ii.invoiceID = i.invoiceID
         WHERE i.companyID = ? AND ii.type = 'sales'`,
        { replacements: [companyID] }
      );

      // Get lifetime purchase costs
      const [costResult] = await sequelize.query(
        `SELECT SUM(pi.subTotal) as cost FROM purchase_items pi
         JOIN purchases p ON pi.purchaseID = p.purchaseID
         WHERE p.companyID = ? AND pi.type = 'purchase'`,
        { replacements: [companyID] }
      );

      const revenue = parseFloat(salesResult[0]?.revenue || 0);
      const cost = parseFloat(costResult[0]?.cost || 0);
      const profitLoss = revenue - cost;

      res.status(200).json({
        message: 'Lifetime profit/loss fetched',
        profitLoss: profitLoss,
        profit: profitLoss > 0 ? profitLoss : 0,
        loss: profitLoss < 0 ? Math.abs(profitLoss) : 0
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async topSales(req, res) {
    try {
      const companyID = req.user.companyID;

      // Get top 5 best-selling items recently by total sales revenue
      const [items] = await sequelize.query(
        `SELECT
          i.itemID as id,
          i.name,
          SUM(ii.quantity) as quantity,
          SUM(ii.subTotal) as totalSales,
          MAX(inv.date) as lastSaleDate
        FROM invoice_items ii
        JOIN invoices inv ON ii.invoiceID = inv.invoiceID
        JOIN items i ON ii.itemID = i.itemID
        WHERE inv.companyID = ? AND ii.type = 'sales'
        GROUP BY i.itemID, i.name
        ORDER BY totalSales DESC, lastSaleDate DESC
        LIMIT 5`,
        { replacements: [companyID] }
      );

      // Return array directly (not wrapped in object)
      res.status(200).json(items || []);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default DashboardController;
