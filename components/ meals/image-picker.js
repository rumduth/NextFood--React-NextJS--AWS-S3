"use client";
import { useEffect, useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const ref = useRef(null);
  const [imagePicked, setImagePicked] = useState(null);
  function handleSelectImage() {
    ref.current.click();
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImagePicked(imageUrl);
  }
  useEffect(() => {
    return () => {
      if (imagePicked) URL.revokeObjectURL(imagePicked);
    };
  }, [imagePicked]);

  return (
    <div className={classes.picker}>
      {/* <label htmlFor={name}>{label}</label> */}
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!imagePicked && <p>No image picked yet!</p>}
          {imagePicked && (
            <Image
              src={imagePicked}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={ref}
          onChange={handleImageChange}
          // required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleSelectImage}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
