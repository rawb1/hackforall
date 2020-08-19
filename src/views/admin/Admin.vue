<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical is-4">
      <MeCard class="tile is-child" />
      <ApplicationCard class="tile is-child" />
    </div>
    <div class="tile is-vertical">
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child notification is-primary">
            <p class="title">Vertical...</p>
            <p class="subtitle">Top tile</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-primary">
            <p class="title">Vertical...</p>
            <p class="subtitle">Top tile</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-primary">
            <p class="title">Vertical...</p>
            <p class="subtitle">Top tile</p>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-primary">
          <p class="title">Vertical...</p>
          <p class="subtitle">Top tile</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import MeCard from '@/components/MeCard.vue';
import ApplicationCard from '@/components/ApplicationCard.vue';

export default {
  components: {
    MeCard,
    ApplicationCard
  }
};
</script>
