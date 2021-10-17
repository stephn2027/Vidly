import React from 'react';

export default function SearchBar({searchQuery,setSearchQuery}) {
  return (
    <form className="d-flex" 
    onSubmit={(e) => e.preventDefault()}
    action="/" 
    method="get"
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={e=>setSearchQuery(e.target.value)}
      />
      <button className="btn btn-outline-primary" type="submit">
        Search
      </button>
    </form>
  );
}
