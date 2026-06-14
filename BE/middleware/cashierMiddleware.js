export const cashierMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  const userRole = (req.user.role || req.user.Role || '').toLowerCase();
  // Cashier level: cashier + management + admin dapat akses
  const allowedRoles = ['cashier', 'management', 'admin'];

  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden: Cashier role or higher required' });
  }
  next();
};
