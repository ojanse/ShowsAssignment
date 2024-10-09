import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from "vitest";
import {useShowStore} from "../show";
import {FetchError} from "../../api/shows";

vi.mock('@/cache', () => ({
  getCachedShows: vi.fn(() => ([
    {
      id: 1,
      name: 'mock-show-1',
      genres: ['drama', 'comedy'],
      rating: {
        average: 5.6,
      },
      image: { original: '', medium: '' },
    },
    {
      id: 2,
      name: 'mock-show-2',
      genres: ['action', 'comedy'],
      rating: {
        average: 2.6,
      },
      image: { original: '', medium: '' },
    },
  ])),
  updateCachedShows: vi.fn(),
}));

vi.mock('@/api/shows', () => ({
  getShowsByPage: vi.fn((page) => {
    if (page === 0) {
      return ([
        {
          id: 3,
          name: 'mock-show-3',
          genres: ['comedy'],
          rating: {
            average: 9.1,
          },
          image: { original: '', medium: '' },
        },
        {
          id: 4,
          name: 'mock-show-4',
          genres: ['action'],
          rating: {
            average: 7.5,
          },
          image: { original: '', medium: '' },
        },
      ]);
    } else {
      throw new FetchError('mock-error', 404);
    }
  }),
  FetchError: vi.fn(),
}));

describe('Show store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('loadShows: loads shows from both the cache as well as from the api', async () => {
    const showStore = useShowStore();

    expect(showStore.allShowIds).toHaveLength(0);
    await expect(() => showStore.loadShows()).rejects.toThrow();

    expect(showStore.allShowIds).toHaveLength(4);
  });

  it('allGenres: includes the correct genres', async () => {
    const showStore = useShowStore();
    await expect(() => showStore.loadShows()).rejects.toThrow();

    expect(showStore.allGenres).toEqual([
      'drama', 'comedy', 'action',
    ]);
  });

  it('getShowsByGenre: includes the correct shows in the correct order', async () => {
    const showStore = useShowStore();
    await expect(() => showStore.loadShows()).rejects.toThrow();

    expect(showStore.getShowsByGenre(
      'comedy',
      (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0),
    )).toStrictEqual([
      expect.objectContaining({ id: 3 }),
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 2 }),
    ]);
  });
});