import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = (
  query: string,
  page: number = 1
): Promise<FetchMoviesResponse> => {
  const config = {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return axios
    .get<FetchMoviesResponse>(API_URL, config)
    .then((res) => res.data);
};