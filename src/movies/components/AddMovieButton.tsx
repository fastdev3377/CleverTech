import { Button } from "shared/components";

interface AddMovieButtonProps {
  onClick: () => void;
}

export function AddMovieButton({ onClick }: AddMovieButtonProps) {
  return (
    <div
      style={{
        cursor: "pointer",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "8rem" }}>+</div>
      <Button onClick={onClick}>Add Movie</Button>
    </div>
  );
}
