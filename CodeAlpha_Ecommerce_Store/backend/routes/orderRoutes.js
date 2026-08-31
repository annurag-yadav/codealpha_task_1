import express from 'express';
import { body, validationResult } from 'express-validator';
import { addOrderItems, getMyOrders, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

router.post(
  '/',
  protect,
  [
    body('orderItems').isArray({ min: 1 }).withMessage('Order must include at least one item'),
    body('shippingAddress.address').notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
  ],
  validate,
  addOrderItems
);

router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

export default router;
