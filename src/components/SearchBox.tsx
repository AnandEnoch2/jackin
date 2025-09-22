import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form flex-grow-1 mx-4">
      <div className="input-group">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search products, brands and more..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
        />
        <button className="btn btn-search" type="submit">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;