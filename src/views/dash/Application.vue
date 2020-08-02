<template>
  <div class="card is-full-width">
    <div class="card-content">
      <b-steps v-model="activeStep" animated class="tile is-child py-4">
        <h1 class="title has-text-centered">Application</h1>
        <b-step-item
          icon="fa fa-address-book"
          label="Profile"
          :clickable="true"
          :type="{ 'is-danger': isProfileInvalid }"
        >
          <h2 class="subtitle is-hidden-touch has-text-centered">Profile</h2>
          <div class="columns">
            <div class="column">
              <b-field
                label="Name*"
                :type="{ 'is-danger': errors.has('name') }"
                :message="errors.collect('name')"
              >
                <b-input
                  v-model="form.name"
                  v-validate="'required|min:2|max:32'"
                  name="name"
                  type="text"
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Phone*"
                :type="{ 'is-danger': errors.has('phone') }"
                :message="errors.collect('phone')"
              >
                <b-input
                  v-model="form.phone"
                  v-validate="'required|numeric|min:10|max:15'"
                  name="phone"
                  type="tel"
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field
                label="School*"
                :type="{ 'is-danger': errors.has('school') }"
                :message="errors.collect('school')"
              >
                <b-input
                  v-model="form.school"
                  v-validate="'required|max:64'"
                  type="text"
                  name="school"
                  required
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Graduation year*"
                :type="{ 'is-danger': errors.has('garduationYear') }"
                :message="errors.collect('garduationYear')"
              >
                <b-datepicker
                  v-model="form.garduationYear"
                  v-validate="'required'"
                  icon="fas fa-graduation-cap"
                  name="garduationYear"
                  editable
                ></b-datepicker>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field
                label="Study fields*"
                :type="{ 'is-danger': errors.has('studyFields') }"
                :message="errors.collect('studyFields')"
              >
                <b-taginput
                  v-model="form.studyFields"
                  v-validate="'required'"
                  ellipsis
                  icon="fas fa-user-graduate"
                  placeholder="Add study"
                  name="studyFields"
                ></b-taginput>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Interests">
                <b-taginput
                  v-model="form.interests"
                  ellipsis
                  icon="fas fa-user-tag"
                  placeholder="Add interest"
                ></b-taginput>
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
                  v-model="form.github"
                  placeholder="username"
                  type="text"
                  expanded
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field class="file" expanded>
                <b-upload v-model="form.resume" accept="application/pdf">
                  <a class="button is-primary is-full-width">
                    <b-icon icon="upload"></b-icon>
                    <span>Upload your resume</span>
                  </a>
                </b-upload>
                <span v-if="form.resume" class="file-name">{{
                  form.resume.name
                }}</span>
              </b-field>
            </div>
          </div>
          <b-field label="Dietary restrictions">
            <b-taginput
              v-model="form.dietaryRestrictions"
              ellipsis
              icon="fas fa-utensils"
              placeholder="Add restriction"
            ></b-taginput>
          </b-field>
          <b-field
            label="Tee-shirt"
            :type="{ 'is-danger': errors.has('teeShirtSize') }"
            :message="errors.collect('teeShirtSize')"
          >
            <b-select
              v-model="form.teeShirtSize"
              v-validate="'required'"
              placeholder="Tee-shirt size"
              name="teeShirtSize"
              expanded
            >
              <option v-for="size in teeShirtSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </b-select>
          </b-field>
          <div class="divider">Complementary informations</div>
          <div class="field">
            <b-checkbox ref="needHardware" v-model="form.needHardware">
              I will
              <strong>&nbsp;need hardware&nbsp;</strong>.
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox ref="needAccomodation" v-model="form.needAccomodation">
              I want to apply for
              <strong>&nbsp;accomodation</strong>.
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox
              ref="needTravelReimbursement"
              v-model="form.needTravelReimbursement"
            >
              I want to apply for
              <strong>&nbsp;travel reimbursement</strong>.
            </b-checkbox>
          </div>
        </b-step-item>
        <b-step-item
          v-if="form.needHardware"
          icon="fas fa-microchip"
          label="Hardware"
          :clickable="true"
          :type="{ 'is-danger': errors.has('hardwareList') }"
        >
          <h2 class="subtitle is-hidden-touch has-text-centered">Hardware</h2>
          <b-field
            label="Hardware need"
            :type="{ 'is-danger': errors.has('hardwareList') }"
            :message="errors.collect('hardwareList')"
          >
            <b-taginput
              v-model="form.hardwareList"
              v-validate="'required_if:needHardware,true'"
              name="hardwareList"
              ellipsis
              icon="fas fa-microchip"
              placeholder="Add hardware"
            ></b-taginput>
          </b-field>
        </b-step-item>
        <b-step-item
          v-if="form.needTravelReimbursement"
          icon="fas fa-plane"
          label="Travel"
          :clickable="true"
          :type="{
            'is-danger':
              errors.has('paypalAddress') || errors.has('travelReceipt')
          }"
        >
          <h2 class="subtitle is-hidden-touch has-text-centered">
            Travel reimbursement
          </h2>
          <div class="columns">
            <div class="column">
              <b-field
                label="Paypal address*"
                :type="{ 'is-danger': errors.has('paypalAddress') }"
                :message="errors.collect('paypalAddress')"
              >
                <b-input
                  v-model="form.paypalAddress"
                  v-validate="'required_if:needTravelReimbursement,true'"
                  name="paypalAddress"
                  type="email"
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field class="file" expanded>
                <b-upload
                  v-model="form.travelReceipt"
                  v-validate="'required_if:needTravelReimbursement,true'"
                  data-vv-validate-on="input"
                  accept="application/pdf"
                  name="travelReceipt"
                >
                  <a class="button is-primary is-full-width">
                    <b-icon icon="upload"></b-icon>
                    <span>Upload your travel receipt*</span>
                  </a>
                </b-upload>
                <span v-if="form.travelReceipt" class="file-name">{{
                  form.travelReceipt.name
                }}</span>
              </b-field>
              <b-field
                :type="{ 'is-danger': errors.has('travelReceipt') }"
                :message="errors.collect('travelReceipt')"
              ></b-field>
            </div>
          </div>
        </b-step-item>
        <b-step-item
          v-if="form.needAccomodation"
          icon="fas fa-hotel"
          label="Accomodation"
          :clickable="true"
          :type="{
            'is-danger':
              errors.has('AccomodationPreferences') ||
              errors.has('hostMatchingDetails')
          }"
        >
          <h2 class="subtitle is-hidden-touch has-text-centered">
            Accomodation
          </h2>
          <b-field
            label="Accomodation preferences"
            :type="{ 'is-danger': errors.has('AccomodationPreferences') }"
            :message="errors.collect('AccomodationPreferences')"
          >
            <b-select
              v-model="form.AccomodationPreferences"
              v-validate="'required_if:needAccomodation,true'"
              name="AccomodationPreferences"
              placeholder="Accomodation preference"
              expanded
              multiple
            >
              <option
                v-for="preference in accomodationPreferencesList"
                :key="preference"
                :value="preference"
                >{{ preference }}</option
              >
            </b-select>
          </b-field>
          <b-field
            label="Host matching details"
            :type="{ 'is-danger': errors.has('hostMatchingDetails') }"
            :message="errors.collect('hostMatchingDetails')"
          >
            <b-input
              v-model="form.hostMatchingDetails"
              v-validate="'required_if:needAccomodation,true|max:200'"
              name="hostMatchingDetails"
              maxlength="200"
              type="textarea"
            ></b-input>
          </b-field>
        </b-step-item>
        <b-step-item
          icon="fas fa-file-contract"
          label="Terms"
          :clickable="true"
          :type="{
            'is-danger':
              errors.has('majority') ||
              errors.has('photoRelease') ||
              errors.has('codeOfConduct')
          }"
        >
          <h2 class="subtitle is-hidden-touch has-text-centered">Terms</h2>
          <b-field
            :type="{ 'is-danger': errors.has('majority') }"
            :message="errors.collect('majority')"
          >
            <b-checkbox
              v-model="form.majority"
              v-validate="'required:false'"
              name="majority"
              data-vv-validate-on="input"
            >
              <span :class="{ 'has-text-danger': errors.has('majority') }">
                I will be
                <strong>&nbsp;18 years or older&nbsp;</strong>by the day of the
                event.
                <b-tooltip
                  label="We will be checking ID. Minors you will be turned away at the door."
                >
                  <b-icon size="is-small" icon="fas fa-info-circle"></b-icon>
                </b-tooltip>
              </span>
            </b-checkbox>
          </b-field>
          <b-field
            :type="{ 'is-danger': errors.has('photoRelease') }"
            :message="errors.collect('photoRelease')"
          >
            <b-checkbox
              v-model="form.photoRelease"
              v-validate="'required:false'"
              name="photoRelease"
              data-vv-validate-on="input"
            >
              <span :class="{ 'has-text-danger': errors.has('photoRelease') }">
                If we take photos or photos of you, we can share it with the
                world.
                <b-tooltip
                  label="By checking, I affirm that I have read and accepted the terms of the photo release above."
                >
                  <b-icon size="is-small" icon="fas fa-info-circle"></b-icon>
                </b-tooltip>
              </span>
            </b-checkbox>
          </b-field>
          <b-field
            :type="{ 'is-danger': errors.has('codeOfConduct') }"
            :message="errors.collect('codeOfConduct')"
          >
            <b-checkbox
              v-model="form.codeOfConduct"
              v-validate="'required:false'"
              name="codeOfConduct"
              data-vv-validate-on="input"
            >
              <span :class="{ 'has-text-danger': errors.has('codeOfConduct') }">
                I affirm that I have read and agree to the terms of both
                <a target="_blank" href="https://mlh.io/privacy" @click.stop
                  >MLH Privacy Policy</a
                >
                and
                <a
                  target="_blank"
                  href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md"
                  @click.stop
                  >MLH Contest Terms</a
                >.
                <b-tooltip
                  label="I further autorize you to share my form/registration information for event administration,
                  ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons
                  in-line with the MLP privacy policy"
                >
                  <b-icon size="is-small" icon="fas fa-info-circle"></b-icon>
                </b-tooltip>
              </span>
            </b-checkbox>
          </b-field>
          <div class="divider">Complementary informations</div>
          <b-field label="Additional notes">
            <b-input
              v-model="form.additionalNotes"
              placeholder="If there's anything else you need to let us know, tell us here!"
              maxlength="200"
              type="textarea"
            ></b-input>
          </b-field>
        </b-step-item>
        <template slot="navigation" slot-scope="{ previous, next }">
          <nav class="level">
            <div class="level-item">
              <b-button
                outlined
                icon-pack="fas"
                icon-left="backward"
                :disabled="previous.disabled"
                class="mx-1"
                @click.prevent="previous.action"
              ></b-button>
              <b-button
                outlined
                icon-pack="fas"
                icon-right="forward"
                :disabled="next.disabled"
                class="mx-1"
                @click.prevent="next.action"
              ></b-button>
            </div>
          </nav>
          <div class="columns is-centered">
            <div class="column is-one-third-desktop">
              <b-button type="is-primary" expanded @click.prevent="submit"
                >Send</b-button
              >
            </div>
          </div>
        </template>
      </b-steps>
    </div>
  </div>
</template>
<script>
import {
  GET_APPLICATION_QUERY,
  APPLY_MUTATION
} from '@/graphql/applicationQueries';

export default {
  data: () => ({
    activeStep: 0,
    teeShirtSizes: ['XS', 'S', 'M', 'L', 'XL'], // TODO move server side
    accomodationPreferencesList: [
      // TODO move server side
      'None',
      'No animal(s)',
      'Small animal(s)',
      'No smoking',
      'Group hosting'
    ],
    form: {
      // Profile
      name: '',
      school: '',
      phone: null,
      // Studies
      garduationYear: null,
      studyFields: null,
      interests: null,
      github: '',
      resume: null,
      // Complementary informations
      dietaryRestrictions: null,
      teeShirtSize: 'M',
      // Needs
      needHardware: false,
      needAccomodation: false,
      needTravelReimbursement: false,
      // Hardware needs
      hardwareList: null,
      // Travel
      paypalAddress: '',
      travelReceipt: null,
      // Accomodation
      AccomodationPreferences: [],
      hostMatchingDetails: '',
      // Terms
      majority: false,
      liability: false,
      photoRelease: false,
      codeOfConduct: false,
      additionalNotes: ''
    }
  }),
  computed: {
    isProfileInvalid: function() {
      return (
        this.errors.has('name') ||
        this.errors.has('school') ||
        this.errors.has('phone') ||
        this.errors.has('garduationYear') ||
        this.errors.has('studyFields')
      );
    }
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.$apollo.mutate({
            mutation: APPLY_MUTATION,
            variables: this.form
          });
        } else {
          this.goToError();
        }
      });
    },
    goToError() {
      if (this.errors.has('hardwareList')) {
        this.activeStep = 1;
      } else if (
        this.errors.has('paypalAddress') ||
        this.errors.has('travelReceipt')
      ) {
        this.activeStep = !!this.form.needHardware + 1;
      } else if (
        this.errors.has('AccomodationPreferences') ||
        this.errors.has('hostMatchingDetails')
      ) {
        this.activeStep =
          !!this.form.needHardware + !!this.form.needTravelReimbursement + 1;
      } else if (
        this.errors.has('majority') ||
        this.errors.has('photoRelease') ||
        this.errors.has('codeOfConduct')
      ) {
        this.activeStep =
          !!this.form.needHardware +
          !!this.form.needAccomodation +
          !!this.form.needTravelReimbursement +
          1;
      }
    }
  },
  apollo: {
    form: {
      query: GET_APPLICATION_QUERY,
      update: function(data) {
        if (!data.getApplication) {
          return this.form;
        }
        const form = data.getApplication.form;
        form.garduationYear = form.garduationYear
          ? new Date(form.garduationYear)
          : null;
        return form;
      }
    }
  }
};
</script>
