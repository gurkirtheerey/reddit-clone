import { useState } from "react";

export const useFilter = (posts) => {
  const [filter, setFilter] = useState("asc");
  let ordered;
  switch (filter) {
    case "asc":
      ordered = posts.sort((a, b) => a.id - b.id);
    case "desc":
      ordered = posts.sort((a, b) => b.id - a.id);
    default:
      ordered = posts;
  }
  return [filter, setFilter, ordered];
};
