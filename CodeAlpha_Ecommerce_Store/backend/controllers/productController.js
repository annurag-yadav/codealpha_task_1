import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, image, category, stock } = req.body;

  const product = await Product.create({
    name,
    price,
    description,
    image,
    category,
    stock,
  });

  res.status(201).json(product);
};
