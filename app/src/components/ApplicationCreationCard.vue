<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title has-text-centered">Application</h1>
      <p class="subtitle has-text-centered">@creation</p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
      iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
      <a href="#">#responsive</a>
      <br />
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click.prevent="create">create</a>
    </footer>
  </div>
</template>
<script>
import { CREATE_APPLICATION_MUTATION } from '@/graphql/applicationQueries';

export default {
  methods: {
    async create() {
      await this.$apollo.mutate({
        mutation: CREATE_APPLICATION_MUTATION
      });
      this.$emit('created');
    }
  }
};
</script>
