import { Product } from '../types';

const fruitNames = ['Apple', 'Banana', 'Orange', 'Mango', 'Strawberry', 'Grapes', 'Pineapple', 'Kiwi'];
const dairyNames = ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Eggs', 'Cottage Cheese'];
const meatNames = ['Chicken', 'Beef', 'Pork', 'Salmon', 'Tuna', 'Lamb', 'Turkey'];
const bakeryNames = ['Bread', 'Croissant', 'Muffin', 'Cake', 'Cookie', 'Bagel', 'Danish'];
const beverageNames = ['Coffee', 'Tea', 'Juice', 'Soda', 'Water', 'Smoothie', 'Energy Drink'];
const snackNames = ['Chips', 'Popcorn', 'Nuts', 'Chocolate', 'Candy', 'Crackers', 'Pretzels'];

const generateProducts = (category: string, baseNames: string[]): Product[] => {
  const products: Product[] = [];
  const varieties = ['Organic', 'Premium', 'Fresh', 'Natural', 'Classic', 'Deluxe'];
  const brands = ['FreshCo', 'Nature\'s Best', 'Premium Select', 'Organic Valley', 'Farm Fresh'];

  for (let i = 0; i < 20; i++) {
    const baseName = baseNames[i % baseNames.length];
    const variety = varieties[Math.floor(Math.random() * varieties.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const name = `${variety} ${brand} ${baseName}`;
    
    products.push({
      id: Math.floor(Math.random() * 1000000),
      name,
      price: Number((Math.random() * 20 + 1).toFixed(2)),
      image: `https://source.unsplash.com/800x600/?${baseName.toLowerCase()}`,
      category,
      description: `Premium quality ${baseName.toLowerCase()} from ${brand}. ${variety} certified.`
    });
  }

  return products;
};

export const allProducts: Product[] = [
  ...generateProducts('Fruits & Vegetables', fruitNames),
  ...generateProducts('Dairy & Eggs', dairyNames),
  ...generateProducts('Meat & Seafood', meatNames),
  ...generateProducts('Bakery', bakeryNames),
  ...generateProducts('Beverages', beverageNames),
  ...generateProducts('Snacks', snackNames)
];