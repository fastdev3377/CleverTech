import { StarRating, Button } from "shared/components";

import { getAvgRating } from "movies/ratings";
import { Movie } from "types";
import { useMovies } from "./MovieProvider";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { moviesDispatch } = useMovies();
  const { id, title, subtitle, description, imageUrl } = movie;
  const avgRating = getAvgRating(movie);

  const handleDelete = () => {
    moviesDispatch({
      type: "delete",
      payload: {
        movieId: id,
      },
    });
  };
  const handleRate = (rating: number) => {
    moviesDispatch({
      type: "rate",
      payload: {
        movieId: id,
        rating,
      },
    });
  };

  return (
    <div data-testid={`movie-item-${id}`}>
      <img className="card-img-top" alt="" src={imageUrl} />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="text-justify" style={{ fontSize: "14px" }}>
          {description}
        </p>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
      <div className="card-footer">
        <div className="clearfix">
          <div className="float-left mt-1">
            <StarRating rating={avgRating} onRate={handleRate} />
          </div>
          <div
            data-testid="movie-rating"
            className="card-footer-badge float-right badge badge-primary badge-pill"
          >
            {avgRating}
          </div>
        </div>
      </div>
    </div>
  );
};
