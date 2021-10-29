
import http from "./httpService";



const apiMovieEndPoint = "/movies";

function movieUrl(id){
    return `${apiMovieEndPoint}/${id}`;
}

export function getMovies(){
    return http.get(apiMovieEndPoint);

}
export function deleteMovies(movieId){
    return http.delete(movieUrl(movieId));
};

export function getMovie(movieId) {
   return http.get(movieUrl(movieId));
    
   
  }
  
  export function saveMovie(movie) {
    if(movie._id){
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._id),body);
    }
    return http.post(apiMovieEndPoint,movie);
    
  }
  
  export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
  }
