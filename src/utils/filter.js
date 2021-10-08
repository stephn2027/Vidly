import _ from 'lodash';



export function filter(movies,genres) {
    return _.filter(movies => movies.genre.name===genres.name);
    
}   

