<template>
  <div
    v-if="hackathon"
    class="card"
    :class="{ 'is-danger': !hackathon.active, 'has-border': !hackathon.active }"
  >
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ hackathon.name }}</p>
          <p class="subtitle is-6">
            {{ new Date(hackathon.dates.start).toLocaleDateString() }}
          </p>
        </div>
      </div>
      <b-tabs v-model="tab" class="formTabs">
        <b-tab-item label="General">
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
        </b-tab-item>
        <b-tab-item label="Dates">
          <div class="columns">
            <div class="column">
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
            </div>
            <div class="column">
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
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Limits">
          <b-field label="hackers">
            <b-numberinput
              v-model="hackathon.limits.hackers"
              step="1"
              exponential
              controls-rounded
            >
            </b-numberinput>
          </b-field>
          <b-field label="Team size">
            <b-numberinput
              v-model="hackathon.limits.team"
              step="1"
              exponential
              controls-rounded
            >
            </b-numberinput>
          </b-field>
          <b-field label="Refund">
            <b-numberinput
              v-model="hackathon.limits.refund"
              step="1"
              exponential
              controls-rounded
            >
            </b-numberinput>
          </b-field>
        </b-tab-item>
        <b-tab-item label="Sponsors">
          <b-notification :closable="false">
            WIP
          </b-notification>
        </b-tab-item>
      </b-tabs>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <a class="has-text-danger" @click.prevent="cancel">
          cancel
        </a>
      </p>
      <p class="card-footer-item">
        <a
          v-if="hackathon.active"
          class="has-text-success"
          @click.prevent="update"
        >
          update
        </a>
        <a v-else class="has-text-success" @click.prevent="activate">
          activate
        </a>
      </p>
    </footer>
  </div>
</template>
<script>
import {
  HACKATHON_QUERY,
  HACKATHON_UPDATE_MUTATION,
  HACKATHON_CANCEL_MUTATION,
  HACKATHON_ACTIVATE_MUTATION
} from '@/graphql/hackathonQueries';

export default {
  data: () => ({
    tab: 0
  }),
  computed: {
    hackathonDatesRange: {
      get: function() {
        return [
          new Date(this.hackathon.dates.start),
          new Date(this.hackathon.dates.end)
        ];
      },
      set: function(val) {
        if (this.hackathon) {
          [this.hackathon.dates.start, this.hackathon.dates.end] = val;
        }
      }
    },
    applicationsDatesRange: {
      get: function() {
        return [
          new Date(this.hackathon.dates.applications.open),
          new Date(this.hackathon.dates.applications.close)
        ];
      },
      set: function(val) {
        if (this.hackathon) {
          [
            this.hackathon.dates.applications.open,
            this.hackathon.dates.applications.close
          ] = val;
        }
      }
    }
  },
  methods: {
    update() {
      return this.$apollo.mutate({
        mutation: HACKATHON_UPDATE_MUTATION,
        variables: { hackathon: this.hackathon }
      });
    },
    cancel() {
      return this.$apollo.mutate({ mutation: HACKATHON_CANCEL_MUTATION });
    },
    activate() {
      return this.$apollo.mutate({
        mutation: HACKATHON_ACTIVATE_MUTATION,
        variables: { id: this.hackathon.id }
      });
    }
  },
  apollo: {
    hackathon: HACKATHON_QUERY
  }
};
</script>
