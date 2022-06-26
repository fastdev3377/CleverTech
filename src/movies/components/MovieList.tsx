import React, { useState } from "react";

import { MovieCard } from "./MovieCard";
import { AddMovieButton } from "./AddMovieButton";
import { AddMovieForm } from "./AddMovieForm";
import { Card } from "shared/components";

import { useMovies } from "./MovieProvider";
import { Movie } from "types";

type NewMovieMode = "BUTTON" | "FORM";

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] =
    useState<NewMovieMode>("BUTTON");

  const onSubmit = (movie: Omit<Movie, "id" | "ratings">) => {
    moviesDispatch({
      type: "add",
      payload: {
        movie,
      },
    });
    setDisplayOptionType("BUTTON");
  };
  const onCancel = () => {
    setDisplayOptionType("BUTTON");
  };
  const handleAddNewMovie = () => {
    setDisplayOptionType("FORM");
  };

  return (
    <div className="card-deck">
      {movies.map((movie) => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>
      ))}
      <Card>
        {displayOptionType === "BUTTON" ? (
          <AddMovieButton onClick={handleAddNewMovie} />
        ) : (
          <AddMovieForm onSubmit={onSubmit} onCancel={onCancel} />
        )}
      </Card>
    </div>
  );
};
