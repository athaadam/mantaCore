export const subscriptionMiddleware = (req, res, next) => {
  // Check if user has active subscription
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  // TODO: Add actual subscription check
  // For now, allow all authenticated users
  next();
};
