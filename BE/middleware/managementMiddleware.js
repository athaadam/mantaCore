export const managementMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  const userRole = (req.user.role || req.user.Role || '').toLowerCase();
  // Management level: management + admin dapat akses
  const allowedRoles = ['management', 'admin'];

  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden: Management role or higher required' });
  }
  next();
};
