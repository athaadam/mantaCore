import jwt from 'jsonwebtoken';
import { comparePasswords, hashPassword } from '../utils/helpers.js';
import { sequelize } from '../config/database.js';

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // TODO: Check if user already exists in database
      // TODO: Hash password and save user to database

      const token = jwt.sign(
        {
          id: 1,
          email,
          name,
          role: 'cashier'
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: 1, email, name, role: 'cashier' }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }

      if (!username && !email) {
        return res.status(400).json({ message: 'Username or email is required' });
      }

      // Query database for user by username or email
      const [users] = await sequelize.query(
        `SELECT u.userID, u.username, u.email, u.password, u.role, u.status, u.phone_number, u.created_at,
                c.companyID, c.companyName, c.subscription_until
         FROM users u
         JOIN companies c ON u.companyID = c.companyID
         WHERE (u.username = ? OR u.email = ?) AND u.status = 'active'
         LIMIT 1`,
        { replacements: [username || email, email || username] }
      );

      if (!users || users.length === 0) {
        return res.status(401).json({ message: 'Invalid username/email or password' });
      }

      const dbUser = users[0];

      // TODO: Verify password with hashed password in database
      // For now, accept any password if user exists
      // const isPasswordValid = await comparePasswords(password, dbUser.password);
      // if (!isPasswordValid) {
      //   return res.status(401).json({ message: 'Invalid username/email or password' });
      // }

      const token = jwt.sign(
        {
          id: dbUser.userID,
          username: dbUser.username,
          email: dbUser.email,
          name: dbUser.username,
          role: dbUser.role,
          companyID: dbUser.companyID,
          companyName: dbUser.companyName,
          phone: dbUser.phone_number,
          createdAt: dbUser.created_at,
          subscriptionExpiry: dbUser.subscription_until
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: dbUser.userID,
          userID: dbUser.userID,
          username: dbUser.username,
          email: dbUser.email,
          name: dbUser.username,
          role: dbUser.role,
          companyID: dbUser.companyID,
          companyName: dbUser.companyName,
          phone: dbUser.phone_number,
          createdAt: dbUser.created_at,
          subscriptionStatus: dbUser.status,
          subscriptionExpiry: dbUser.subscription_until
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async logout(req, res) {
    try {
      // TODO: Invalidate token in database if needed
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AuthController;
