<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="@/assets/logo.png" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ hackathon.name }}</p>
          <p class="subtitle is-6">
            {{ new Date(hackathon.dates.start).toLocaleDateString() }}
          </p>
        </div>
      </div>
      <div class="divider">General</div>
      <b-field
        label="Name"
        :type="{ 'is-danger': errors.has('name') }"
        :message="errors.collect('name')"
      >
        <b-input
          v-model="hackathon.name"
          v-validate="'required|min:2|max:32'"
          name="name"
          type="text"
        ></b-input>
      </b-field>
      <div class="divider">Dates</div>

      <b-field
        label="Hackathon"
        :type="{ 'is-danger': errors.has('hackathonDatesRange') }"
        :message="errors.collect('hackathonDatesRange')"
      >
        <b-datepicker
          ref="hackathonDatesRange"
          v-model="hackathonDatesRange"
          v-validate="'required'"
          icon="fas fa-graduation-cap"
          name="start"
          editable
          range
        ></b-datepicker>
      </b-field>
      <b-field
        label="Applications"
        :type="{ 'is-danger': errors.has('applicationsDatesRange') }"
        :message="errors.collect('applicationsDatesRange')"
      >
        <b-datepicker
          v-model="applicationsDatesRange"
          v-validate="'required|before:hackathonDatesRange[0]'"
          icon="fas fa-graduation-cap"
          name="end"
          editable
          :max-date="hackathonDatesRange[0]"
          range
        ></b-datepicker>
      </b-field>
      <div class="divider">Limits</div>
      <b-field label="hackers">
        <b-numberinput
          v-model="hackathon.limits.hackers"
          step="1"
          size="is-small"
          exponential
          controls-rounded
        >
        </b-numberinput>
      </b-field>
      <b-field label="Team size">
        <b-numberinput
          v-model="hackathon.limits.team"
          step="1"
          size="is-small"
          exponential
          controls-rounded
        >
        </b-numberinput>
      </b-field>
      <b-field label="Refund">
        <b-numberinput
          v-model="hackathon.limits.refund"
          step="1"
          size="is-small"
          exponential
          controls-rounded
        >
        </b-numberinput>
      </b-field>
      <div class="divider">Sponsors</div>

      <b-notification :closable="false">
        WIP
      </b-notification>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <a class="has-text-danger" @click="$emit('close')">
          close
        </a>
      </p>
      <p class="card-footer-item">
        <a class="has-text-success" @click.prevent="create">
          create
        </a>
      </p>
    </footer>
  </div>
</template>
<script>
import { CREATE_HACKATHON_MUTATION } from '@/graphql/hackathonQueries';

export default {
  data: () => ({
    hackathon: {
      name: 'Hackathon',
      dates: {
        start: new Date(),
        end: new Date(),
        applications: {
          open: new Date(),
          close: new Date()
        }
      },
      limits: {
        hackers: 200,
        team: 5,
        refund: 0
      }
    }
  }),
  computed: {
    hackathonDatesRange: {
      get: function() {
        return [this.hackathon.dates.start, this.hackathon.dates.end];
      },
      set: function(val) {
        [this.hackathon.dates.start, this.hackathon.dates.end] = val;
      }
    },
    applicationsDatesRange: {
      get: function() {
        return [
          this.hackathon.dates.applications.open,
          this.hackathon.dates.applications.close
        ];
      },
      set: function(val) {
        [
          this.hackathon.dates.applications.open,
          this.hackathon.dates.applications.close
        ] = val;
      }
    }
  },
  methods: {
    create() {
      return this.$apollo
        .mutate({
          mutation: CREATE_HACKATHON_MUTATION,
          variables: { hackathon: this.hackathon }
        })
        .then(() => this.$apollo.getClient().resetStore())
        .then(() => this.$emit('close'));
    }
  }
};
</script>
