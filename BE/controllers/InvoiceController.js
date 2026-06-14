import { sequelize } from '../config/database.js';

class InvoiceController {
  static async createInvoice(req, res) {
    try {
      const { date, amount, costumerID, items } = req.body;
      const userID = req.user.id || req.user.userID;
      const companyID = req.user.companyID;

      if (!date || !amount || !items || items.length === 0) {
        return res.status(400).json({ message: 'Missing required fields: date, amount, items' });
      }

      // Handle Non-Member customer - auto-create if doesn't exist
      let finalCostumerID = costumerID;
      if (costumerID === 'Non-Member') {
        const [nonMemberResult] = await sequelize.query(
          `SELECT costumerID FROM costumers WHERE username = 'Non-Member' LIMIT 1`
        );

        if (nonMemberResult.length > 0) {
          finalCostumerID = nonMemberResult[0].costumerID;
        } else {
          // Auto-create Non-Member customer
          await sequelize.query(
            `INSERT INTO costumers (username, email, phone_number, companyID)
             VALUES (?, ?, ?, ?)`,
            { replacements: ['Non-Member', 'non-member@system.local', '-', companyID] }
          );
          const [newNonMember] = await sequelize.query(
            `SELECT costumerID FROM costumers WHERE username = 'Non-Member' ORDER BY costumerID DESC LIMIT 1`
          );
          finalCostumerID = newNonMember[0].costumerID;
        }
      }

      // Insert invoice and get the ID
      const [invoiceInsertResult] = await sequelize.query(
        `INSERT INTO invoices (date, amount, costumerID, userID, companyID)
         VALUES (?, ?, ?, ?, ?)`,
        { replacements: [date, amount, finalCostumerID, userID, companyID] }
      );

      const invoiceID = invoiceInsertResult.insertId;

      // Insert invoice items
      for (const item of items) {
        await sequelize.query(
          `INSERT INTO invoice_items (invoiceID, itemID, quantity, unitPrice)
           VALUES (?, ?, ?, ?)`,
          { replacements: [invoiceID, item.itemID, item.quantity, item.unitPrice] }
        );
      }

      res.status(201).json({
        message: 'Invoice created successfully',
        invoiceID: invoiceID
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getInvoiceById(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({ invoice: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateInvoice(req, res) {
    try {
      const { id } = req.params;
      const { date, amount, costumerID, items } = req.body;
      const userID = req.user.id || req.user.userID;

      if (!date || !amount || !items || items.length === 0) {
        return res.status(400).json({ message: 'Missing required fields: date, amount, items' });
      }

      // Handle Non-Member customer - auto-create if doesn't exist
      let finalCostumerID = costumerID;
      if (costumerID === 'Non-Member') {
        const [nonMemberResult] = await sequelize.query(
          `SELECT costumerID FROM costumers WHERE username = 'Non-Member' LIMIT 1`
        );

        if (nonMemberResult.length > 0) {
          finalCostumerID = nonMemberResult[0].costumerID;
        } else {
          // Get companyID from current invoice
          const [currentInvoice] = await sequelize.query(
            `SELECT companyID FROM invoices WHERE invoiceID = ? LIMIT 1`,
            { replacements: [id] }
          );
          const invoiceCompanyID = currentInvoice.length > 0 ? currentInvoice[0].companyID : 1;

          // Auto-create Non-Member customer
          await sequelize.query(
            `INSERT INTO costumers (username, email, phone, address, companyID)
             VALUES (?, ?, ?, ?, ?)`,
            { replacements: ['Non-Member', 'non-member@system.local', '-', '-', invoiceCompanyID] }
          );
          const [newNonMember] = await sequelize.query(
            `SELECT costumerID FROM costumers WHERE username = 'Non-Member' ORDER BY costumerID DESC LIMIT 1`
          );
          finalCostumerID = newNonMember[0].costumerID;
        }
      }

      await sequelize.query(
        `UPDATE invoices SET date = ?, amount = ?, costumerID = ? WHERE invoiceID = ? AND userID = ?`,
        { replacements: [date, amount, finalCostumerID, id, userID] }
      );

      // Delete existing invoice items
      await sequelize.query(
        `DELETE FROM invoice_items WHERE invoiceID = ?`,
        { replacements: [id] }
      );

      // Insert updated invoice items
      for (const item of items) {
        await sequelize.query(
          `INSERT INTO invoice_items (invoiceID, itemID, quantity, unitPrice)
           VALUES (?, ?, ?, ?)`,
          { replacements: [id, item.itemID, item.quantity, item.unitPrice] }
        );
      }

      res.status(200).json({ message: 'Invoice updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteInvoice(req, res) {
    try {
      const { id } = req.params;
      const userID = req.user.id || req.user.userID;

      // Delete invoice items first
      await sequelize.query(
        `DELETE FROM invoice_items WHERE invoiceID = ?`,
        { replacements: [id] }
      );

      // Delete invoice
      const result = await sequelize.query(
        `DELETE FROM invoices WHERE invoiceID = ? AND userID = ?`,
        { replacements: [id, userID] }
      );

      res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMyInvoices(req, res) {
    try {
      const userID = req.user.id || req.user.userID;
      const companyID = req.user.companyID;

      const [invoices] = await sequelize.query(
        `SELECT
          i.invoiceID,
          i.date,
          i.amount,
          c.username as costumerName,
          u.username as userName,
          GROUP_CONCAT(
            JSON_OBJECT(
              'name', it.name,
              'category', it.category,
              'quantity', ii.quantity,
              'unitPrice', ii.unitPrice
            )
          ) as items_json
        FROM invoices i
        LEFT JOIN costumers c ON i.costumerID = c.costumerID
        LEFT JOIN users u ON i.userID = u.userID
        LEFT JOIN invoice_items ii ON i.invoiceID = ii.invoiceID
        LEFT JOIN items it ON ii.itemID = it.itemID
        WHERE i.userID = ? AND i.companyID = ?
        GROUP BY i.invoiceID
        ORDER BY i.date DESC`,
        { replacements: [userID, companyID] }
      );

      const formattedInvoices = invoices.map(inv => ({
        invoiceID: inv.invoiceID,
        date: new Date(inv.date).toLocaleDateString('en-GB'),
        amount: parseFloat(inv.amount),
        costumer: { username: inv.costumerName || 'Non-Member' },
        user: { username: inv.userName || 'N/A' },
        items: inv.items_json ? JSON.parse(`[${inv.items_json}]`).map(item => ({
          item: {
            name: item.name,
            category: item.category
          },
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })) : []
      }));

      res.status(200).json({ invoices: formattedInvoices });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllInvoices(req, res) {
    try {
      const companyID = req.user.companyID;

      const [invoices] = await sequelize.query(
        `SELECT
          i.invoiceID,
          i.date,
          i.amount,
          c.username as costumerName,
          u.username as userName,
          GROUP_CONCAT(
            JSON_OBJECT(
              'name', it.name,
              'category', it.category,
              'quantity', ii.quantity,
              'unitPrice', ii.unitPrice
            )
          ) as items_json
        FROM invoices i
        LEFT JOIN costumers c ON i.costumerID = c.costumerID
        LEFT JOIN users u ON i.userID = u.userID
        LEFT JOIN invoice_items ii ON i.invoiceID = ii.invoiceID
        LEFT JOIN items it ON ii.itemID = it.itemID
        WHERE i.companyID = ?
        GROUP BY i.invoiceID
        ORDER BY i.date DESC`,
        { replacements: [companyID] }
      );

      const formattedInvoices = invoices.map(inv => ({
        invoiceID: inv.invoiceID,
        date: new Date(inv.date).toLocaleDateString('en-GB'),
        amount: parseFloat(inv.amount),
        costumer: { username: inv.costumerName || 'Non-Member' },
        user: { username: inv.userName || 'N/A' },
        items: inv.items_json ? JSON.parse(`[${inv.items_json}]`).map(item => ({
          item: {
            name: item.name,
            category: item.category
          },
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })) : []
      }));

      res.status(200).json({
        message: 'Invoices fetched successfully',
        invoices: formattedInvoices
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async salesReport(req, res) {
    try {
      const companyID = req.user.companyID;

      // Get total sales
      const [salesResult] = await sequelize.query(
        `SELECT SUM(amount) as totalSales FROM invoices WHERE companyID = ?`,
        { replacements: [companyID] }
      );

      // Get total invoices
      const [invoiceResult] = await sequelize.query(
        `SELECT COUNT(*) as totalInvoice FROM invoices WHERE companyID = ?`,
        { replacements: [companyID] }
      );

      // Get total products sold
      const [productsResult] = await sequelize.query(
        `SELECT SUM(quantity) as productSold FROM invoice_items ii
         JOIN invoices i ON ii.invoiceID = i.invoiceID
         WHERE i.companyID = ? AND ii.type = 'sales'`,
        { replacements: [companyID] }
      );

      // Get active customers (customers with at least one invoice)
      const [customersResult] = await sequelize.query(
        `SELECT COUNT(DISTINCT costumerID) as activeCustomer FROM invoices WHERE companyID = ?`,
        { replacements: [companyID] }
      );

      // Get top sales items
      const [topSalesResult] = await sequelize.query(
        `SELECT
          i.itemID as id,
          i.name,
          SUM(ii.quantity) as quantity,
          SUM(ii.subTotal) as totalSales
        FROM invoice_items ii
        JOIN invoices inv ON ii.invoiceID = inv.invoiceID
        JOIN items i ON ii.itemID = i.itemID
        WHERE inv.companyID = ? AND ii.type = 'sales'
        GROUP BY i.itemID, i.name
        ORDER BY totalSales DESC
        LIMIT 5`,
        { replacements: [companyID] }
      );

      // Get sales by category
      const [categoryResult] = await sequelize.query(
        `SELECT
          i.category,
          SUM(ii.subTotal) as total
        FROM invoice_items ii
        JOIN invoices inv ON ii.invoiceID = inv.invoiceID
        JOIN items i ON ii.itemID = i.itemID
        WHERE inv.companyID = ? AND ii.type = 'sales'
        GROUP BY i.category`,
        { replacements: [companyID] }
      );

      // Convert category results to object
      const salesByCategory = {};
      categoryResult.forEach(cat => {
        salesByCategory[cat.category] = parseFloat(cat.total || 0);
      });

      res.status(200).json({
        totalSales: parseFloat(salesResult[0]?.totalSales || 0),
        totalInvoice: parseInt(invoiceResult[0]?.totalInvoice || 0),
        productSold: parseInt(productsResult[0]?.productSold || 0),
        activeCustomer: parseInt(customersResult[0]?.activeCustomer || 0),
        topSales: topSalesResult || [],
        salesByCategory: salesByCategory
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async filterInvoices(req, res) {
    try {
      const companyID = req.user.companyID;
      const { startDate, endDate } = req.query;

      let query = `SELECT
        i.invoiceID,
        i.date,
        i.amount,
        c.username as costumerName,
        u.username as userName,
        GROUP_CONCAT(
          JSON_OBJECT(
            'name', it.name,
            'category', it.category,
            'quantity', ii.quantity,
            'unitPrice', ii.unitPrice
          )
        ) as items_json
      FROM invoices i
      LEFT JOIN costumers c ON i.costumerID = c.costumerID
      LEFT JOIN users u ON i.userID = u.userID
      LEFT JOIN invoice_items ii ON i.invoiceID = ii.invoiceID
      LEFT JOIN items it ON ii.itemID = it.itemID
      WHERE i.companyID = ?`;

      const replacements = [companyID];

      if (startDate) {
        query += ` AND DATE(i.date) >= ?`;
        replacements.push(startDate);
      }

      if (endDate) {
        query += ` AND DATE(i.date) <= ?`;
        replacements.push(endDate);
      }

      query += ` GROUP BY i.invoiceID ORDER BY i.date DESC`;

      const [invoices] = await sequelize.query(query, { replacements });

      const formattedInvoices = invoices.map(inv => ({
        invoiceID: inv.invoiceID,
        date: new Date(inv.date).toLocaleDateString('en-GB'),
        amount: parseFloat(inv.amount),
        costumer: { username: inv.costumerName || 'Non-Member' },
        user: { username: inv.userName || 'N/A' },
        items: inv.items_json ? JSON.parse(`[${inv.items_json}]`).map(item => ({
          item: {
            name: item.name,
            category: item.category
          },
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })) : []
      }));

      res.status(200).json({ invoices: formattedInvoices });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default InvoiceController;
