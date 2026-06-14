import { sequelize } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

async function setupNonMember() {
  try {
    console.log('🔧 Setting up Non-Member customer...');

    // Check if Non-Member customer exists
    const [existing] = await sequelize.query(
      `SELECT costumerID FROM costumers WHERE username = 'Non-Member' LIMIT 1`
    );

    if (existing.length > 0) {
      console.log('✅ Non-Member customer already exists with ID:', existing[0].costumerID);
      process.exit(0);
    }

    // Create Non-Member customer
    const companyID = 1; // Default company
    await sequelize.query(
      `INSERT INTO costumers (username, email, phone, address, companyID)
       VALUES (?, ?, ?, ?, ?)`,
      { replacements: ['Non-Member', 'non-member@system.local', '-', '-', companyID] }
    );

    const [result] = await sequelize.query(
      `SELECT costumerID FROM costumers WHERE username = 'Non-Member' LIMIT 1`
    );

    console.log('✅ Non-Member customer created with ID:', result[0].costumerID);
    console.log('✅ Now update invoices code to use this ID instead of null');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupNonMember();
