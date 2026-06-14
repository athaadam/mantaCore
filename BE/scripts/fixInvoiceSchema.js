import { sequelize } from '../config/database.js';

async function fixInvoiceSchema() {
  try {
    console.log('🔧 Fixing invoice schema...');

    // Make costumerID nullable
    await sequelize.query(
      `ALTER TABLE invoices MODIFY COLUMN costumerID INT NULL`
    );

    console.log('✅ costumerID is now nullable');
    console.log('✅ Non-Member invoices dapat dibuat sekarang!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing schema:', error.message);
    process.exit(1);
  }
}

fixInvoiceSchema();
