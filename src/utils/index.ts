import type {Show, SimpleShow} from "@/api/shows";

export function showToSimpleShow(show: Show): SimpleShow {
  return {
    id: show.id,
    name: show.name,
    genres: show.genres,
    rating: show.rating,
    image: show.image,
  };
}