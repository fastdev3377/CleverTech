import React, { useState } from "react";

import { InputField, Button } from "shared/components";

interface AddMovieFormProps {
  onSubmit: (
    data: Record<"imageUrl" | "title" | "subtitle" | "description", string>
  ) => void;
  onCancel: () => void;
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({
      imageUrl,
      title,
      subtitle,
      description,
    });
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <form className="p-4 " onSubmit={handleSubmit}>
      <InputField name="Url" value={imageUrl} setter={setImageUrl} />
      <InputField name="Title" value={title} setter={setTitle} />
      <InputField name="Subtitle" value={subtitle} setter={setSubTitle} />
      <InputField
        name="Description"
        value={description}
        setter={setDescription}
      />
      <div className="text-center">
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  );
}
