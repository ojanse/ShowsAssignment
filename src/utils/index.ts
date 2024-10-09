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

export function strictDecimals(num: number, decimals: number) {
  return (Math.round(num * 100) / 100).toFixed(decimals);
}