import React, { useState, useEffect} from 'react';
import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';
import Pagination from './common/Pagination';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

export const MoviesContext = React.createContext();
const LOCAL_STORAGE_KEY = 'vidly.movies[key]';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn,setSortColumn] = useState({path:'title', order:'asc'});

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(genres);

  

  useEffect(() => {
    const genres = [{ name: 'All Genres', _id: "" }, ...getGenres()];
    setGenres(genres);
    setMovies(getMovies());
    setPageCount(4)
  }, []);

  useEffect(()=>{
    const moviesKyeFromLocalStorage =  localStorage.getItem(LOCAL_STORAGE_KEY);
    moviesKyeFromLocalStorage===null?alert("no saved data in local storage"):setMovies(JSON.parse(moviesKyeFromLocalStorage));
  },[]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
  },[movies]);


  

  const numberOfMovies = movies.length;

  const handleDeleteMovie = (id) => {
    const updatedMovies = movies.filter((movies) => movies._id !== id);
    setMovies(updatedMovies);
  };

  const handleLike = (movie) => {
    const moviesCopy = [...movies];
    const index = moviesCopy.indexOf(movie);
    //  moviesCopy[index] = {...moviesCopy[index]};
    moviesCopy[index].like = !moviesCopy[index].like;
    setMovies(moviesCopy);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = sortPath=>{
    
    setSortColumn(sortPath);
    
  };

  const moviesContextValue={
    handleDeleteMovie,
    handleLike,
    handlePageChange,
    
    handleSort,
    handleGenreSelect,
  };

  const getPageData = ()=>{
    const filteredMovies =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const sortedMovies = _.orderBy(filteredMovies,[sortColumn.path],[sortColumn.order])    

  const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);

  return {filteredMovies, paginatedMovies}
  };

  const {filteredMovies,paginatedMovies}=getPageData(); 

  
  if (numberOfMovies === 0) return <p>No Movies Available</p>
  

  return (
   
    <MoviesContext.Provider value={moviesContextValue}>
      <main className="container">
        <div className="row">
          <div className="col-3 m-2 p-2">
            <ListGroup
              genres={genres}
              handleGenreSelect={handleGenreSelect}
              selectedGenre={selectedGenre}
            />
          </div>

          <div className="col">
            Showing &nbsp;
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {filteredMovies.length}
            </span>{' '}
            &nbsp; movies in the database
            <MoviesTable
              movies={movies}
              handleSort={handleSort}
              paginatedMovies={paginatedMovies}
              handleLike={handleLike}
              handleDeleteMovie={handleDeleteMovie}
              sortColumn={sortColumn}
            />
            <Pagination
              numberOfMovies={filteredMovies.length}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </main>
    </MoviesContext.Provider>
  );
}
