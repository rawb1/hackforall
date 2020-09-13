<template>
  <div v-if="hackathon" class="card">
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
        <b-tab-item label="Sponsors"> </b-tab-item>
      </b-tabs>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <a class="has-text-danger" @click.prevent="cancel">
          cancel
        </a>
      </p>
      <p class="card-footer-item">
        <a @click.prevent="submit">
          update
        </a>
      </p>
    </footer>
  </div>
</template>
<script>
import { HACKATHON_QUERY } from '@/graphql/hackathonQueries';

export default {
  data: () => ({
    tab: 0,
    hackathonDatesRange: [],
    applicationsDatesRange: []
  }),
  apollo: {
    hackathon: {
      query: HACKATHON_QUERY,
      update: function({ hackathon }) {
        this.hackathonDatesRange = [
          new Date(hackathon.dates.start),
          new Date(hackathon.dates.end)
        ];
        this.applicationsDatesRange = [
          new Date(hackathon.dates.applications.open),
          new Date(hackathon.dates.applications.close)
        ];
        return hackathon;
      }
    }
  }
};
</script>
