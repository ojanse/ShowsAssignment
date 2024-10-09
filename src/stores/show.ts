import {defineStore} from "pinia";
import {FetchError, getShowsByPage, type SimpleShow} from "@/api/shows";
import {showToSimpleShow} from "@/utils";
import {reactive, ref, toRaw} from "vue";
import {getCachedShows, updateCachedShows} from "@/cache";

export const SHOWS_LOAD_STATE = Object.freeze({
  init: 'load_state_init',
  loading: 'load_state_loading',
  ready: 'load_state_ready',
});

export const useShowStore = defineStore('show', () => {
  const stateShows = reactive<Record<number, SimpleShow>>({});
  const stateShowIds = ref<number[]>([]);
  const loadState = ref(SHOWS_LOAD_STATE.init); // init -> loading -> ready

  function addShows(shows: SimpleShow[]) {
    shows.forEach((show) => {
      stateShows[show.id] = show;
    });
  }

  function updateStateShowIds() {
    stateShowIds.value = Object.keys(stateShows).map((showId) => Number.parseInt(showId));
  }

  async function fillShowsFromCache() {
    const showsInCache = await getCachedShows();
    addShows(showsInCache);
    updateStateShowIds();
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
      let nextShows = await getShowsByPage(nextPage);
      while (nextShows.length > 0) {
        // Add each retrieved show to the database, or update the database
        // if it already exists
        const simpleShows = nextShows.map((show) => showToSimpleShow(show));
        addShows(simpleShows);

        // Try to get the next page
        nextPage += 1;
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
    loadShows,
    loadState,
  };
});