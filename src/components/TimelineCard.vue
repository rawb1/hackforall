<template>
  <div class="card">
    <div class="card-content">
      <div v-if="!$apollo.queries.hackathon.loading" class="timeline">
        <header class="timeline-header">
          <span class="tag is-primary">
            {{ new Date(hackathon.dates.start).getFullYear() }}
          </span>
        </header>
        <TimelineNow
          v-if="now < new Date(hackathon.dates.applications.open)"
          :date="now"
          :options="options"
        />
        <div class="timeline-item">
          <div class="timeline-marker is-success is-icon">
            <i class="far fa-address-card"></i>
          </div>
          <div class="timeline-content">
            <p class="heading">
              {{ open }}
            </p>
            <p>Applications open</p>
          </div>
        </div>
        <TimelineNow
          v-if="
            new Date(hackathon.dates.applications.open) < now &&
              now < new Date(hackathon.dates.applications.close)
          "
          :date="now"
          :options="options"
        />
        <div class="timeline-item">
          <div class="timeline-marker is-warning is-icon">
            <i class="far fa-address-card"></i>
          </div>
          <div class="timeline-content">
            <p class="heading">
              {{ close }}
            </p>
            <p>Applications close</p>
          </div>
        </div>

        <TimelineNow
          v-if="
            new Date(hackathon.dates.applications.close) < now &&
              now < new Date(hackathon.dates.start)
          "
          :date="now"
          :options="options"
        />
        <div class="timeline-item">
          <div class="timeline-marker is-primary is-icon">
            <i class="fas fa-code"></i>
          </div>
          <div class="timeline-content">
            <p class="heading">
              {{ start }}
            </p>
            <p>Hackathon start</p>
          </div>
        </div>
        <TimelineNow
          v-if="
            new Date(hackathon.dates.start) < now &&
              now < new Date(hackathon.dates.end)
          "
          :date="now"
          :options="options"
        />
        <div class="timeline-item">
          <div class="timeline-marker is-danger is-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="timeline-content">
            <p class="heading">
              {{ end }}
            </p>
            <p>Hackathon end</p>
          </div>
        </div>
        <TimelineNow
          v-if="new Date(hackathon.dates.end) < now"
          :date="now"
          :options="options"
        />
        <div class="timeline-header">
          <span class="tag is-primary">End</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineNow from '@/components/TimelineNow.vue';
import { HACKATHON_QUERY } from '@/graphql/hackathonQueries';
const INTERVAL = 60 * 1000;
export default {
  components: { TimelineNow },
  data: () => ({
    now: new Date(),
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  }),
  computed: {
    open() {
      return new Date(
        this.hackathon.dates.applications.open
      ).toLocaleDateString(undefined, this.options);
    },
    close() {
      return new Date(
        this.hackathon.dates.applications.close
      ).toLocaleDateString(undefined, this.options);
    },
    start() {
      return new Date(this.hackathon.dates.start).toLocaleDateString(
        undefined,
        this.options
      );
    },
    end() {
      return new Date(this.hackathon.dates.end).toLocaleDateString(
        undefined,
        this.options
      );
    }
  },
  mounted() {
    setInterval(() => {
      this.now = new Date();
    }, INTERVAL);
  },
  apollo: {
    hackathon: HACKATHON_QUERY
  }
};
</script>
