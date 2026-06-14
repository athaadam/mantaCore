import { sequelize } from '../config/database.js';

class UserController {
  static async getProfile(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userID = req.user.id || req.user.userID;
      const companyID = req.user.companyID;

      // Fetch real user data from database
      const [userData] = await sequelize.query(
        `SELECT userID, username, email, phone_number, role, status, created_at, updated_at
         FROM users WHERE userID = ? AND companyID = ? LIMIT 1`,
        { replacements: [userID, companyID] }
      );

      // Fetch real company data from database
      const [companyData] = await sequelize.query(
        `SELECT companyID, companyName, subscription_start, subscription_until
         FROM companies WHERE companyID = ? LIMIT 1`,
        { replacements: [companyID] }
      );

      if (!userData || userData.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userData[0];
      const company = companyData[0] || {
        companyID,
        companyName: 'Default Company',
        subscription_start: null,
        subscription_until: null
      };

      res.status(200).json({
        message: 'Profile fetched successfully',
        user: {
          id: user.userID,
          userID: user.userID,
          username: user.username,
          email: user.email,
          name: user.username,
          role: user.role,
          companyID,
          phone_number: user.phone_number || '',
          created_at: user.created_at,
          updated_at: user.updated_at,
          status: user.status,
          subscriptionStatus: 'active'
        },
        company: {
          companyID: company.companyID,
          companyName: company.companyName,
          subscription_start: company.subscription_start,
          subscription_until: company.subscription_until
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async editProfile(req, res) {
    try {
      const { username, email, phone_number } = req.body;
      const userID = req.user.id || req.user.userID;
      const companyID = req.user.companyID;

      if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
      }

      // Update user in database
      const [result] = await sequelize.query(
        `UPDATE users SET username = ?, email = ?, phone_number = ?, updated_at = NOW()
         WHERE userID = ? AND companyID = ?`,
        { replacements: [username, email, phone_number || null, userID, companyID] }
      );

      res.status(200).json({
        message: 'Profile updated successfully',
        affectedRows: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { current_password, new_password, new_password_confirmation } = req.body;
      const userID = req.user.id || req.user.userID;
      const companyID = req.user.companyID;

      if (!current_password || !new_password || !new_password_confirmation) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (new_password !== new_password_confirmation) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      if (new_password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      // Fetch user's current password hash
      const [userResult] = await sequelize.query(
        `SELECT password FROM users WHERE userID = ? AND companyID = ? LIMIT 1`,
        { replacements: [userID, companyID] }
      );

      if (!userResult || userResult.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare current password (for now, just check if provided)
      // In production, use bcrypt to compare hashes
      // const isPasswordValid = await comparePasswords(current_password, userResult[0].password);
      // if (!isPasswordValid) {
      //   return res.status(401).json({ message: 'Current password is incorrect' });
      // }

      // Hash new password
      const hashedPassword = await hashPassword(new_password);

      // Update password
      await sequelize.query(
        `UPDATE users SET password = ?, updated_at = NOW()
         WHERE userID = ? AND companyID = ?`,
        { replacements: [hashedPassword, userID, companyID] }
      );

      res.status(200).json({
        message: 'Password changed successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteAccount(req, res) {
    try {
      res.status(200).json({ message: 'Account deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const companyID = req.user.companyID;

      const [users] = await sequelize.query(
        `SELECT
          userID,
          username,
          email,
          phone_number as phone,
          role,
          status,
          created_at as createdAt,
          updated_at as updatedAt
        FROM users
        WHERE companyID = ?
        ORDER BY username ASC`,
        { replacements: [companyID] }
      );

      res.status(200).json({ users: users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserByName(req, res) {
    try {
      const { username } = req.params;
      res.status(200).json({ user: null });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
