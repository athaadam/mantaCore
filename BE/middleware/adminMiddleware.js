export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  const userRole = req.user.role || req.user.Role;
  if (userRole !== 'admin' && userRole !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden: Admin role required' });
  }
  next();
};
