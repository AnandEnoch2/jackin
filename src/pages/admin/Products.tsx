import React, { useState, useRef } from 'react';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductTable from '../../components/admin/ProductTable';
import useProductStore from '../../store/productStore';
import useCategoryStore from '../../store/categoryStore';

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  quality: 'Premium' | 'Standard' | 'Economy';
  quantityType: 'pcs' | 'kg' | 'ltr' | 'g' | 'ml';
  discount?: number;
}

const Products: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { categories } = useCategoryStore();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [imageUploadType, setImageUploadType] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    stock: 0,
    quality: 'Standard',
    quantityType: 'pcs',
    discount: 0
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (imageUploadType === 'file' && selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        const productData = { ...formData, image: imageUrl };
        
        if (editingProduct) {
          updateProduct(editingProduct._id, productData);
        } else {
          addProduct(productData);
        }
      } else {
        if (editingProduct) {
          updateProduct(editingProduct._id, formData);
        } else {
          addProduct(formData);
        }
      }
      
      setShowModal(false);
      resetForm();
      toast.success(`Product ${editingProduct ? 'updated' : 'added'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${editingProduct ? 'update' : 'add'} product`);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
      quality: product.quality,
      quantityType: product.quantityType,
      discount: product.discount || 0
    });
    setImageUploadType('url');
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        deleteProduct(id);
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      description: '',
      image: '',
      category: '',
      stock: 0,
      quality: 'Standard',
      quantityType: 'pcs',
      discount: 0
    });
    setEditingProduct(null);
    setImageUploadType('url');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={18} className="me-2" />
          Add Product
        </button>
      </div>

      <ProductTable 
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Discount (%) <span className="text-muted">(Optional)</span></label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.discount || ''}
                        onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
                        min="0"
                        max="100"
                        placeholder="Enter discount percentage"
                      />
                      {formData.discount && formData.discount > 0 && (
                        <small className="text-muted">
                          Final price: ${(formData.price * (1 - formData.discount / 100)).toFixed(2)}
                        </small>
                      )}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                        rows={3}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Product Image</label>
                      <div className="mb-3">
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className={`btn ${imageUploadType === 'url' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setImageUploadType('url')}
                          >
                            Image URL
                          </button>
                          <button
                            type="button"
                            className={`btn ${imageUploadType === 'file' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setImageUploadType('file')}
                          >
                            Upload File
                          </button>
                        </div>
                      </div>
                      
                      {imageUploadType === 'url' ? (
                        <input
                          type="url"
                          className="form-control"
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          placeholder="Enter image URL"
                          required={imageUploadType === 'url'}
                        />
                      ) : (
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            required={imageUploadType === 'file'}
                          />
                          <label className="input-group-text">
                            <Upload size={18} />
                          </label>
                        </div>
                      )}
                      
                      {formData.image && (
                        <div className="mt-2">
                          <img
                            src={formData.image}
                            alt="Product preview"
                            className="img-thumbnail"
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                        required
                        min="0"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quality</label>
                      <select
                        className="form-select"
                        value={formData.quality}
                        onChange={(e) => setFormData({...formData, quality: e.target.value as 'Premium' | 'Standard' | 'Economy'})}
                        required
                      >
                        <option value="Premium">Premium</option>
                        <option value="Standard">Standard</option>
                        <option value="Economy">Economy</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quantity Type</label>
                      <select
                        className="form-select"
                        value={formData.quantityType}
                        onChange={(e) => setFormData({...formData, quantityType: e.target.value as 'pcs' | 'kg' | 'ltr' | 'g' | 'ml'})}
                        required
                      >
                        <option value="pcs">Pieces (pcs)</option>
                        <option value="kg">Kilograms (kg)</option>
                        <option value="ltr">Liters (ltr)</option>
                        <option value="g">Grams (g)</option>
                        <option value="ml">Milliliters (ml)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;