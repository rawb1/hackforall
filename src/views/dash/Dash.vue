<template>
  <section class="section py-5">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical is-4">
          <MeCard class="tile is-child" />
          <article class="tile is-child notification is-warning">
            <p class="title">...tiles</p>
            <p class="subtitle">Bottom tile</p>
          </article>
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
    </div>
  </section>
</template>

<script>
import MeCard from '@/components/MeCard.vue';
export default {
  components: {
    MeCard
  }
};
</script>
