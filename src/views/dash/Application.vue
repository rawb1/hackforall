<template>
  <div class="card is-full-width">
    <div class="card-content">
      <form>
        <b-steps
          v-model="activeStep"
          animated
          class="tile is-child py-4"
          size="is-medium"
        >
          <b-step-item
            icon="fa fa-address-book"
            label="Profile"
            :clickable="true"
          >
            <h1 class="title has-text-centered">Profile</h1>
            <div class="columns">
              <div class="column">
                <b-field label="Name*">
                  <b-input
                    ref="name"
                    v-model="application.name"
                    type="text"
                    required
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Phone*">
                  <b-input
                    v-model="application.phone"
                    type="text"
                    min="10"
                    max="20"
                    pattern="^[0-9]+$"
                    required
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="School*">
                  <b-input
                    ref="school"
                    v-model="application.school"
                    type="text"
                    required
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Graduation year*">
                  <b-datepicker
                    v-model="application.garduationYear"
                    icon="fas fa-graduation-cap"
                    editable
                  >
                  </b-datepicker>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Study fields*">
                  <b-taginput v-model="application.studyFields"> </b-taginput>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Interests">
                  <b-taginput v-model="application.interests"> </b-taginput>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Github">
                  <p class="control">
                    <span class="button is-static">https://github.com/</span>
                  </p>
                  <b-input
                    v-model="application.github"
                    placeholder="username"
                    type="text"
                    expanded
                  ></b-input>
                </b-field>
              </div>

              <div class="column">
                <b-field class="file" position="is-centered">
                  <b-upload
                    v-model="application.resume"
                    accept="application/pdf"
                  >
                    <a class="button is-primary is-full-width">
                      <b-icon icon="upload"></b-icon>
                      <span>Upload your resume</span>
                    </a>
                  </b-upload>
                  <span v-if="application.resume" class="file-name">
                    {{ application.resume.name }}
                  </span>
                </b-field>
              </div>
            </div>

            <b-field label="Dietary restrictions">
              <b-taginput v-model="application.dietaryRestrictions">
              </b-taginput>
            </b-field>
            <b-field label="Tee-shirt">
              <b-select
                v-model="application.teeShirtSize"
                placeholder="Tee-shirt size"
                expanded
                required
              >
                <option
                  v-for="size in teeShirtSizes"
                  :key="size"
                  :value="size"
                  >{{ size }}</option
                >
              </b-select>
            </b-field>
            <div class="divider">Complementary informations</div>
            <div class="field">
              <b-checkbox v-model="application.needHardware">
                I will
                <strong>&nbsp;need hardware&nbsp;</strong>.
              </b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="application.needAccomodation">
                I want to apply for
                <strong>&nbsp;accomodation</strong>.
              </b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="application.needTravelReimbursement">
                I want to apply for <strong>&nbsp;reimbursement</strong>.
              </b-checkbox>
            </div>
          </b-step-item>

          <b-step-item
            v-if="application.needHardware"
            icon="fas fa-microchip"
            label="Hardware"
            :clickable="true"
          >
          </b-step-item>
          <b-step-item
            v-if="application.needTravelReimbursement"
            icon="fas fa-plane"
            label="Travel"
            :clickable="true"
          >
          </b-step-item>
          <b-step-item
            v-if="application.needAccomodation"
            icon="fas fa-hotel"
            label="Accomodation"
            :clickable="true"
          >
          </b-step-item>
          <b-step-item
            icon="fas fa-file-contract"
            label="Terms"
            :clickable="true"
          >
            <h1 class="title has-text-centered">Terms</h1>

            <div class="field">
              <b-checkbox v-model="application.majority">
                With tooltip I will be
                <strong>&nbsp;18 years or older&nbsp;</strong>by the day of the
                event.
                <b-tooltip
                  label="We will be checking ID. Minors you will be turned away at the door."
                >
                  <b-icon size="is-small" icon="fas fa-info-circle"></b-icon>
                </b-tooltip>
              </b-checkbox>
            </div>
          </b-step-item>
        </b-steps>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeStep: 0,
    teeShirtSizes: ['XS', 'S', 'M', 'L', 'XL'],
    application: {
      // Profile
      name: '',
      school: '',
      majority: false,
      phone: null,
      // Studies
      garduationYear: new Date(),
      studyFields: null,
      interests: [],
      github: '',
      resume: null,
      // Complementary informations
      dietaryRestrictions: [],
      teeShirtSize: 'M',
      // Needs
      needHardware: false,
      needAccomodation: false,
      needTravelReimbursement: false,

      // Hardware needs
      hardwareList: [],

      // Accomodation
      AccomodationPreferences: [],
      hostMatchingDetails: '',

      // Travel
      paypalAdresse: '',
      travelReceipt: null,

      // Terms
      liability: '',
      photoRelease: '',
      codeOfConduct: '',
      contestTerms: '',
      additionalNotes: ''
    }
  }),
  methods: {
    isProfileValid: function() {
      let isValid = true;
      isValid = isValid && this.$refs.name.checkHtml5Validity();
      isValid = isValid && this.$refs.phone.checkHtml5Validity();
      isValid = isValid && this.$refs.school.checkHtml5Validity();

      isValid = isValid && !!this.application.garduationYear;
      isValid = isValid && this.$application.studyFields.length > 0;
      return isValid;
    },
    submit: async function() {}
  }
};
</script>
