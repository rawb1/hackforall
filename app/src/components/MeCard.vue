<template>
  <div class="card">
    <div v-if="me" class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <v-gravatar :email="me.email" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ me.username }}</p>
          <p class="subtitle is-6">
            @{{ me.email.substr(0, me.email.indexOf('@')) }}
          </p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
        <a href="#">#responsive</a>
        <br />
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
</template>
<script>
import { ME_QUERY } from '@/graphql/userQueries';

export default {
  apollo: {
    me: ME_QUERY
  }
};
</script>
