import React,{ useContext } from 'react';
import auth from '../services/authService';
import { Link } from 'react-router-dom';
import Like from './common/Like';
import Table from './common/Table';
import { MoviesContext } from './Movies';


export default function MoviesTable({paginatedMovies,handleSort,sortColumn, }) {
 const {handleLike, handleDeleteMovie} = useContext(MoviesContext);
 const user = auth.getCurrentUser();
 
 

 
  const columns = [
    { path: 'title', 
      label: 'Title' , 
      content:movie=><Link to={`movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.like} 
        
        onClick={() => handleLike(movie)} />
      ),
    },
    {
      key: 'delete',
      content: (movie) => (
      
        <button
          disabled={user&&user.isAdmin?false:true}
         
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteMovie(movie._id)}
        >
          Delete
        </button> 
      ),
    },
  ];

  return (
      <Table 
          data={paginatedMovies}
          handleSort={handleSort}
          sortColumn={sortColumn}
          columns={columns}

      />
    
  );
}
