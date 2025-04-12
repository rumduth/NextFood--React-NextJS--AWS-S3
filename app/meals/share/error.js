"use client";
export default function Error({ error }) {
  return (
    <div className="error">
      <h1>An error occured</h1>
      <p>Failed to create meal: {error.message}</p>
    </div>
  );
}
