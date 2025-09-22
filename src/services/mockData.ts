import { v4 as uuidv4 } from 'uuid';

// Generate mock products for testing
const generateMockProducts = (count: number) => {
  const categories = ['Fruits & Vegetables', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery'];
  const products = [];
  
  for (let i = 0; i < count; i++) {
    products.push({
      _id: uuidv4(), // Use UUID for guaranteed unique IDs
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      description: `Description for product ${i + 1}`,
      image: `https://source.unsplash.com/800x600/?food/${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      stock: Math.floor(Math.random() * 100) + 1
    });
  }
  
  return products;
};

// Generate mock users for testing
const generateMockUsers = (count: number) => {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      _id: uuidv4(), // Use UUID for guaranteed unique IDs
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      isAdmin: i === 0, // First user is admin
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  
  return users;
};

export const mockProducts = generateMockProducts(20);
export const mockUsers = generateMockUsers(10);
export const mockCategories = [
  {
    _id: uuidv4(),
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e'
  },
  {
    _id: uuidv4(),
    name: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150'
  },
  {
    _id: uuidv4(),
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62'
  },
  {
    _id: uuidv4(),
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff'
  }
];