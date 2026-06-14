import { sequelize } from '../config/database.js';
import { hashPassword } from '../utils/helpers.js';

class AccountManageController {
  static async addUser(req, res) {
    try {
      const { username, email, phone_number, role, password } = req.body;
      const companyID = req.user.companyID;

      if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Username, email, password, and role are required' });
      }

      const hashedPassword = await hashPassword(password);

      // Get next userID
      const [lastUser] = await sequelize.query(
        `SELECT MAX(userID) as maxID FROM users`
      );
      const newUserID = (lastUser[0]?.maxID || 0) + 1;

      await sequelize.query(
        `INSERT INTO users (userID, companyID, username, email, phone_number, password, role, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
        { replacements: [newUserID, companyID, username, email, phone_number || null, hashedPassword, role] }
      );

      res.status(201).json({
        message: 'User added successfully',
        user: {
          userID: newUserID,
          username,
          email,
          phone_number: phone_number || null,
          role,
          status: 'active'
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userID } = req.params;
      const companyID = req.user.companyID;

      if (!userID) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      // Update user status to inactive instead of deleting
      const [result] = await sequelize.query(
        `UPDATE users SET status = 'inactive', updated_at = NOW()
         WHERE userID = ? AND companyID = ?`,
        { replacements: [userID, companyID] }
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'User disabled successfully',
        affectedRows: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { userID } = req.params;
      const { username, email, phone_number, role } = req.body;
      const companyID = req.user.companyID;

      if (!userID) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      if (!username || !email || !role) {
        return res.status(400).json({ message: 'Username, email, and role are required' });
      }

      // Update user - set status to active when updating
      const [result] = await sequelize.query(
        `UPDATE users SET username = ?, email = ?, phone_number = ?, role = ?, status = 'active', updated_at = NOW()
         WHERE userID = ? AND companyID = ?`,
        { replacements: [username, email, phone_number || null, role, userID, companyID] }
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Fetch updated user
      const [updatedUser] = await sequelize.query(
        `SELECT userID, username, email, phone_number, role, status, created_at, updated_at
         FROM users WHERE userID = ? AND companyID = ? LIMIT 1`,
        { replacements: [userID, companyID] }
      );

      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser[0] || {
          userID,
          username,
          email,
          phone_number,
          role,
          status: 'active'
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AccountManageController;
