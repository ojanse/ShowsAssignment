export interface SimpleShow {
  id: number;
  name: string;
  genres: string[];
  image?: {
    medium: string;
    original: string;
  };
  rating: {
    average: number | null;
  };
}

export interface Show extends SimpleShow {
  url: string;
  type: string;
  language: string;
  status: string;
  runtime?: number;
  averageRuntime?: number;
  premiered?: string;
  ended?: string;
  officialSite?: string;
  summary: string;
}

export class FetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "FetchError";
    this.status = status;
  }
}

async function getShowsByPage(page: number) {
  if (page < 0) {
    throw Error('Page cannot be a negative number');
  }

  let result: Show[] = [];
  const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
  if (!response.ok) {
    throw new FetchError(`Response status: ${response.status}`, response.status);
  }

  result = await response.json();

  return result;
}

export {
  getShowsByPage,
};
