import React, { useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { Movie, MoviesAction } from "types";
import { getMovies } from "api/movies";

interface MoviesState {
  movies: Movie[];
  initialized: boolean;
}

export function useMoviesCollection(): [
  MoviesState,
  React.Dispatch<MoviesAction>
] {
  const movieReducer = (
    state: MoviesState,
    action: MoviesAction
  ): MoviesState => {
    switch (action.type) {
      case "fetch":
        const { data } = action.payload;
        return { ...state, movies: data, initialized: true };

      case "add":
        return {
          ...state,
          movies: [
            ...state.movies,
            {
              ...action.payload.movie,
              id: `${state.movies.length}`,
              ratings: [],
            },
          ],
        };

      case "delete":
        return {
          ...state,
          movies: state.movies.filter(
            (movie) => movie.id !== action.payload.movieId
          ),
        };

      case "rate":
        return {
          ...state,
          movies: state.movies.map((movie) =>
            movie.id === action.payload.movieId
              ? { ...movie, ratings: [...movie.ratings, action.payload.rating] }
              : movie
          ),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await getMovies();
      dispatch({
        type: "fetch",
        payload: {
          data,
        },
      });
    };
    fetch();
  }, []);

  return [state, dispatch];
}
