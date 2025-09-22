import React from 'react';
import { Edit, Trash } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  discount?: number;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  className="rounded"
                />
              </td>
              <td>{product.name}</td>
              <td>
                {product.discount && product.discount > 0 ? (
                  <>
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    <small className="text-muted text-decoration-line-through ms-2">
                      ${product.price.toFixed(2)}
                    </small>
                    <span className="badge bg-success ms-2">{product.discount}% OFF</span>
                  </>
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEdit(product)}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(product._id)}
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;