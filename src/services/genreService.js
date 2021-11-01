import http from './httpService';
import {apiUrl} from '../config.json';

export function getGenres() {
  return http.get("/genres" || apiUrl+"/auth");
}
export const genres = getGenres();