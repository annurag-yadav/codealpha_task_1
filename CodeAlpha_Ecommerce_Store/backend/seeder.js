import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Aurora Wireless Headphones',
    price: 189.99,
    description: 'Immersive sound, deep bass, and all-day comfort with premium active noise cancellation.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    category: 'Electronics',
    stock: 12,
    rating: 4.8,
    numReviews: 24,
  },
  {
    name: 'Luna Smart Watch',
    price: 249.99,
    description: 'Track fitness, sleep, and notifications with a polished titanium finish and bright display.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    category: 'Wearables',
    stock: 18,
    rating: 4.7,
    numReviews: 19,
  },
  {
    name: 'Terra Running Trainers',
    price: 139.0,
    description: 'Lightweight cushioning and breathable mesh for smooth everyday runs and city walks.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    category: 'Footwear',
    stock: 25,
    rating: 4.9,
    numReviews: 33,
  },
  {
    name: 'Monarch Laptop Stand',
    price: 89.99,
    description: 'Ergonomic aluminum design that boosts posture, airflow, and desk aesthetics.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    category: 'Office',
    stock: 30,
    rating: 4.5,
    numReviews: 13,
  },
  {
    name: 'Nova Coffee Maker',
    price: 119.5,
    description: 'Brew barista-style coffee with a sleek compact build and programmable timer.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    category: 'Home',
    stock: 9,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: 'Pulse RGB Mouse',
    price: 74.99,
    description: 'Ultra-responsive controls and customizable RGB lighting for work and play.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
    category: 'Electronics',
    stock: 20,
    rating: 4.4,
    numReviews: 15,
  },
  {
    name: 'Harbor Travel Backpack',
    price: 149.0,
    description: 'Smart storage, padded straps, and weather-ready fabric built for daily commutes.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    category: 'Accessories',
    stock: 16,
    rating: 4.7,
    numReviews: 21,
  },
  {
    name: 'Sora Ceramic Lamp',
    price: 94.5,
    description: 'Soft mood lighting with a modern ceramic finish for cozy, elevated interiors.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    category: 'Home Decor',
    stock: 11,
    rating: 4.8,
    numReviews: 17,
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error importing products: ${error.message}`);
    process.exit(1);
  }
};

importData();
