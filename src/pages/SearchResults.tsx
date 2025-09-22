import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/productStore';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchProducts, searchResults, loading } = useProductStore();

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query, searchProducts]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      <h2 className="mb-4">Search Results for "{query}"</h2>
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center">
            <h3>No products found</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;