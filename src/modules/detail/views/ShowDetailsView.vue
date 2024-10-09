<template>
  <div
    v-if="show"
    class="show-details-view">
    <BaseLink
      class="back-link"
      :to="{ name: 'dashboard' }">
      < Back to dashboard
    </BaseLink>
    <div class="introduction">
      <ShowThumbnail
        :show="show"
        quality="original" />
      <BaseTitle>
        <h2>
          {{ show.name }}
        </h2>
      </BaseTitle>
      <BaseText>
        <p>
          {{ stripHtml(show.summary) }}
        </p>
      </BaseText>
    </div>
    <div class="details">
      <BaseList>
        <BaseListItem label="Language">
          {{ show.language }}
        </BaseListItem>
        <BaseListItem label="Premiered">
          {{ show.premiered }}
        </BaseListItem>
        <BaseListItem label="Ended">
          {{ show.ended }}
        </BaseListItem>
        <BaseListItem label="Average runtime">
          {{ show.averageRuntime }} minutes
        </BaseListItem>
        <BaseListItem
          v-if="show.officialSite"
          label="Average runtime">
          <BaseLink
            :href="show.officialSite"
            target="_blank">
            {{ show.officialSite }}
          </BaseLink>
        </BaseListItem>
      </BaseList>
    </div>
  </div>
  <div v-else-if="!loading">
    <BaseText>
      <p>
        Show not found
      </p>
    </BaseText>
  </div>
</template>

<script setup lang="ts">
  import {useRoute} from "vue-router";
  import {ref} from "vue";
  import {getShowById, type Show} from "@/api/shows";
  import ShowThumbnail from "@/global/components/ShowThumbnail.vue";
  import BaseTitle from "@/global/components/BaseTitle.vue";
  import BaseText from "@/global/components/BaseText.vue";
  import BaseList from "@/global/components/BaseList.vue";
  import BaseListItem from "@/global/components/BaseListItem.vue";
  import BaseLink from "@/global/components/BaseLink.vue";

  const route = useRoute();
  const show = ref<Show | undefined>(undefined);
  const loading = ref(true);

  init();

  async function init() {
    const showId = route.params?.showId;
    if (showId) {
      show.value = await getShowById(showId.toString());
      loading.value = false;
    }
  }

  function stripHtml(text: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const textContent = doc.body.textContent || '';
    return textContent.trim();
  }
</script>

<style scoped>
.show-details-view {
  max-width: 768px;
}

.show-thumbnail {
  margin-bottom: 40px;
}

.introduction {
  margin: 20px 0 40px;
}
</style>