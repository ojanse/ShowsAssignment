import {defineStore} from "pinia";
import {FetchError, getShowsByPage, type SimpleShow} from "@/api/shows";
import {showToSimpleShow} from "@/utils";
import {computed, reactive, ref, toRaw} from "vue";
import {clearCachedShows, getCachedShows, updateCachedShows} from "@/cache";

export const SHOWS_LOAD_STATE = Object.freeze({
  init: 'load_state_init',
  loading: 'load_state_loading',
  ready: 'load_state_ready',
});

export const useShowStore = defineStore('show', () => {
  const stateShows = reactive<Record<number, SimpleShow>>({});
  const stateShowIds = ref<number[]>([]);
  const loadState = ref(SHOWS_LOAD_STATE.init); // init -> loading -> ready
  const loadingPage = ref(0);

  // We don't want to iterate over all shows for each genre. Instead, we create a helper computed,
  // that returns a mapping between genre and show ids. This to not make a huge object without reason.
  const showIdsByGenre = computed(
    () => {
      return stateShowIds.value.reduce<Record<string, number[]>>(
        (result, currentShowId) => {
        // A show can have multiple genre, so its id needs to be added to each genre in the result
        stateShows[currentShowId].genres.forEach(
          (genre) => {
            // Add the genre as an object key if it doesn't exist
            if (!Object.keys(result).includes(genre)) {
              result[genre] = [];
            }
            result[genre].push(currentShowId);
          },
        );
        return result;
      }, {});
    }
  );

  // To get all genres we can simply return the keys of the showIds by genre
  const allGenres = computed(() => Object.keys(showIdsByGenre.value));

  function getShowsByGenre(
    genreFilter: string,
    sortFn: (a: SimpleShow, b: SimpleShow) => number,
    amount: number = 25,
  ) {
    const genreShowIds = showIdsByGenre.value[genreFilter];

    // Make sure it was a valid genre
    if (!genreShowIds) {
      return [];
    }

    const genreShows = genreShowIds.map((showId) => stateShows[showId]);

    if (typeof sortFn === 'function') {
      genreShows.sort(sortFn);
    }

    return genreShows.slice(0, amount);
  }

  // Below section all has to do with loading of the shows into the cache and state

  function addShowsToState(shows: SimpleShow[]) {
    shows.forEach((show) => {
      stateShows[show.id] = show;
    });
  }

  function updateStateShowIds() {
    stateShowIds.value = Object.keys(stateShows).map((showId) => Number.parseInt(showId));
  }

  async function fillShowsFromCache() {
    const showsInCache = await getCachedShows();
    addShowsToState(showsInCache);
    updateStateShowIds();
  }

  // For dev purposes, allows clearing the cache of shows, so that it can be filled again
  async function clearShows() {
    return clearCachedShows();
  }

  // Updates the shows database based on the last show id that exists within it
  async function loadShows() {
    loadState.value = SHOWS_LOAD_STATE.loading;

    await fillShowsFromCache();

    const highestShowId = stateShowIds.value.length > 0
      ? Math.max(...stateShowIds.value)
      : 0;

    let nextPage = Math.floor(highestShowId / 250); // The api returns max 250 shows
    try {
      loadingPage.value = nextPage;
      let nextShows = await getShowsByPage(nextPage);
      while (nextShows.length > 0) {
        // Add each retrieved show to the database, or update the database
        // if it already exists
        const simpleShows = nextShows.map((show) => showToSimpleShow(show));
        addShowsToState(simpleShows);

        // Try to get the next page
        nextPage += 1;
        loadingPage.value = nextPage;
        nextShows = await getShowsByPage(nextPage);
      }
    } catch (e) {
      const error = e as FetchError;

      // We expect a 404 when we reach the end
      if (error.status !== 404) {
        throw error;
      }
    } finally {
      updateStateShowIds();

      const rawSimpleShows = stateShowIds.value.map((showId) => toRaw(stateShows[showId]));
      await updateCachedShows(rawSimpleShows);

      loadState.value = SHOWS_LOAD_STATE.ready;
    }
  }

  return {
    allShows: stateShows,
    allShowIds: stateShowIds,
    loadShows,
    loadState,
    loadingPage,
    allGenres,
    getShowsByGenre,
    clearShows,
  };
});