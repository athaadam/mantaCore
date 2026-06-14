import express from 'express';
import AuthController from '../controllers/AuthController.js';
import UserController from '../controllers/UserController.js';
import InvoiceController from '../controllers/InvoiceController.js';
import CostumerController from '../controllers/CostumerController.js';
import ItemController from '../controllers/ItemController.js';
import PurchaseController from '../controllers/PurchaseController.js';
import DashboardController from '../controllers/DashboardController.js';
import AccountManageController from '../controllers/AccountManageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { subscriptionMiddleware } from '../middleware/subscriptionMiddleware.js';
import { cashierMiddleware } from '../middleware/cashierMiddleware.js';
import { managementMiddleware } from '../middleware/managementMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public Auth Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected Routes - require authentication
router.post('/logout', authMiddleware, AuthController.logout);
router.get('/user', authMiddleware, UserController.getProfile);

// Subscription-based routes
const subscriptionRoutes = express.Router();
subscriptionRoutes.use(authMiddleware);
subscriptionRoutes.use(subscriptionMiddleware);

// User Routes (all authenticated users)
subscriptionRoutes.post('/editProfile', UserController.editProfile);
subscriptionRoutes.post('/changePassword', UserController.changePassword);
subscriptionRoutes.delete('/deleteAccount', UserController.deleteAccount);
subscriptionRoutes.get('/getAllItems', ItemController.getAllItems);

// Cashier Routes
const cashierRoutes = express.Router();
cashierRoutes.use(authMiddleware);
cashierRoutes.use(subscriptionMiddleware);
cashierRoutes.use(cashierMiddleware);

// Invoices
cashierRoutes.post('/createInvoice', InvoiceController.createInvoice);
cashierRoutes.get('/getInvoice/:id', InvoiceController.getInvoiceById);
cashierRoutes.post('/updateInvoice/:id', InvoiceController.updateInvoice);
cashierRoutes.delete('/deleteInvoice/:id', InvoiceController.deleteInvoice);
cashierRoutes.get('/getMyInvoices', InvoiceController.getMyInvoices);

// Costumers
cashierRoutes.get('/getAllCostumers', CostumerController.getAllCostumers);
cashierRoutes.post('/createCostumer', CostumerController.createCostumer);
cashierRoutes.get('/getCostumer/:id', CostumerController.getCostumerById);
cashierRoutes.post('/updateCostumer/:id', CostumerController.updateCostumer);
cashierRoutes.delete('/deleteCostumer/:id', CostumerController.deleteCostumer);

// Management Routes
const managementRoutes = express.Router();
managementRoutes.use(authMiddleware);
managementRoutes.use(subscriptionMiddleware);
managementRoutes.use(managementMiddleware);

// Sales
managementRoutes.get('/sales-report', InvoiceController.salesReport);
managementRoutes.get('/filterInvoices', InvoiceController.filterInvoices);
managementRoutes.get('/getAllInvoices', InvoiceController.getAllInvoices);

// Purchases
managementRoutes.get('/getAllPurchases', PurchaseController.getAllPurchases);
managementRoutes.post('/createPurchase', PurchaseController.createPurchase);
managementRoutes.get('/getPurchase/:id', PurchaseController.getPurchaseById);
managementRoutes.get('/getMyPurchases', PurchaseController.getMyPurchases);
managementRoutes.post('/updatePurchase/:id', PurchaseController.updatePurchase);
managementRoutes.delete('/deletePurchase/:id', PurchaseController.deletePurchase);
managementRoutes.get('/purchase-report', PurchaseController.purchaseReport);

// Items
managementRoutes.get('/getItem/:id', ItemController.getItemById);
managementRoutes.post('/createItem', ItemController.createItem);
managementRoutes.post('/updateItem/:id', ItemController.updateItem);
managementRoutes.delete('/deleteItem/:id', ItemController.deleteItem);

// Account Management
managementRoutes.post('/addUser', AccountManageController.addUser);
managementRoutes.put('/deleteUser/:userID', AccountManageController.deleteUser);
managementRoutes.post('/updateUser/:userID', AccountManageController.updateUser);

// User Management
managementRoutes.get('/getAllUsers', UserController.getAllUsers);
managementRoutes.get('/getUserByName/:username', UserController.getUserByName);

// Admin Routes
const adminRoutes = express.Router();
adminRoutes.use(authMiddleware);
adminRoutes.use(subscriptionMiddleware);
adminRoutes.use(adminMiddleware);

// Dashboard
adminRoutes.get('/totalPenjualan', DashboardController.totalPenjualan);
adminRoutes.get('/todayProfitLoss', DashboardController.todayProfitLoss);
adminRoutes.get('/lifetimeProfitLoss', DashboardController.lifetimeProfitLoss);
adminRoutes.get('/topSellingItems', DashboardController.topSales);

// Mount all route groups
router.use(subscriptionRoutes);
router.use(cashierRoutes);
router.use(managementRoutes);
router.use(adminRoutes);

export default router;
