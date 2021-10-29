import React, { useState, useEffect } from 'react';
import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';
import Pagination from './common/Pagination';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import { getMovies , deleteMovies } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { Link } from 'react-router-dom';
import SearchBar from './common/SearchBar';
import {toast} from 'react-toastify';

export const MoviesContext = React.createContext();
// const LOCAL_STORAGE_KEY = 'vidly.movies[key]';

export default function Movies({user}) {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(genres);

  const { search } = window.location;
  const query = new URLSearchParams(search).get('search');
  const [searchQuery, setSearchQuery] = useState(query || '');
  

  useEffect(() => {
    async function fetchData(){
      const {data:genresRaw} = await getGenres();
      const genres = [{ name: 'All Genres', _id: '' }, ...genresRaw];
      setGenres(genres);
      const {data: movies} = await getMovies();
      setMovies(movies);
      
    }
    
    
    setPageCount(4);
    fetchData();
  }, []);

  // useEffect(() => {
  //   const moviesKeyFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   moviesKeyFromLocalStorage === null
  //     ? alert('no saved data in local storage')
  //     : setMovies(JSON.parse(moviesKeyFromLocalStorage));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
  // }, [movies]);

  const numberOfMovies = movies.length;

  const handleDeleteMovie = async (id) => {
    const originalMovies = movies;
    const updatedMovies = originalMovies.filter((movies) => movies._id !== id);
    setMovies(updatedMovies);
    try {
      await deleteMovies(id);
    } catch (error) {
      if(error.response && error.response.status === 404)
      toast.error("This movie has already been deleted");
      setMovies(originalMovies);
    }
    
  };

  const handleLike = (movie) => {
    const moviesCopy = [...movies];
    const index = moviesCopy.indexOf(movie);
    //  moviesCopy[index] = {...moviesCopy[index]};
    moviesCopy[index].like = !moviesCopy[index].like;
    setMovies(moviesCopy);
  };
  const handleAdd = () => {
    <Link to={'/movies/new'} />;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    if(searchQuery===query)return;
    setSelectedGenre(genre);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSort = (sortPath) => {
    setSortColumn(sortPath);
  };

  const moviesContextValue = {
    handleDeleteMovie,
    handleLike,
    handlePageChange,
    handleAdd,
    handleSort,
    handleGenreSelect,
    
  };
  function handleOnChange(query){
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedGenre(null)
  }
  function handleSearch(movies,searchQuery){
   
    if(!searchQuery)return movies;
    
    return movies.filter(movie=>{
      
      const movieName = movie.title.toLowerCase();
      
      
      return movieName.includes(searchQuery);
     
    
  
   })
   
  }
  const searchedData = handleSearch(movies,searchQuery);
  const getPageData = () => {
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id) 
        : searchedData;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
      
    );

    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);
   

    
 

    return { filteredMovies, paginatedMovies, searchedData };
  };

  
  const { filteredMovies, paginatedMovies } = getPageData();

  if (numberOfMovies === 0)
    return (
      <div className="container-fluid">
        {user&&
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        }
        <p>No Movies Available</p>
      </div>
    );

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
            <div className="container-fluid m-2">
              {user&&
                <Link
                  to="/movies/new"
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}
                >
                  Add
                </Link>
              }
              <SearchBar
                searchQuery={searchQuery}
                onChange={handleOnChange}
                
              />
            </div>
            Showing &nbsp;
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {filteredMovies.length}
            </span>{' '}
            &nbsp; movies in the database
            <MoviesTable
              movies={movies}
              handleSort={handleSort}
              paginatedMovies={searchQuery?searchedData:paginatedMovies}
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
