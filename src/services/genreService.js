import http from './httpService';
import {apiUrl} from '../config.json';

export function getGenres() {
  return http.get(apiUrl + "/genres");
}
export const genres = getGenres();