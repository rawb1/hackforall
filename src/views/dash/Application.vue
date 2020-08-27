<template>
  <div
    class="card is-full-width has-border"
    :class="statusColorClass(application.status)"
  >
    <div class="card-content">
      <h1 class="title has-text-centered">Application</h1>
      <p
        class="subtitle has-text-centered"
        :class="statusTextColorClass(application.status)"
      >
        @{{ application.status }}
      </p>
      <b-steps v-model="activeStep" animated>
        <p></p>
        <b-step-item
          icon="fa fa-address-book"
          label="Profile"
          :clickable="true"
          :type="{ 'is-danger': isProfileInvalid }"
        >
          <div class="columns">
            <div class="column">
              <b-field
                label="Name*"
                :type="{ 'is-danger': errors.has('name') }"
                :message="errors.collect('name')"
              >
                <b-input
                  v-model="application.form.name"
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
                  v-model="application.form.phone"
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
                  v-model="application.form.school"
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
                  v-model="application.form.garduationYear"
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
                  v-model="application.form.studyFields"
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
                  v-model="application.form.interests"
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
                  v-model="application.form.github"
                  placeholder="username"
                  type="text"
                  expanded
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field class="file" expanded>
                <b-upload
                  v-model="application.form.resume"
                  accept="application/pdf"
                >
                  <a class="button is-primary is-full-width">
                    <b-icon icon="upload"></b-icon>
                    <span>Upload your resume</span>
                  </a>
                </b-upload>
                <span v-if="application.form.resume" class="file-name">{{
                  application.form.resume.name
                }}</span>
              </b-field>
            </div>
          </div>
          <b-field label="Dietary restrictions">
            <b-taginput
              v-model="application.form.dietaryRestrictions"
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
              v-model="application.form.teeShirtSize"
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
            <b-checkbox
              ref="needHardware"
              v-model="application.form.needHardware"
            >
              I will
              <strong>&nbsp;need hardware&nbsp;</strong>.
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox
              ref="needAccomodation"
              v-model="application.form.needAccomodation"
            >
              I want to apply for
              <strong>&nbsp;accomodation</strong>.
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox
              ref="needTravelReimbursement"
              v-model="application.form.needTravelReimbursement"
            >
              I want to apply for
              <strong>&nbsp;travel reimbursement</strong>.
            </b-checkbox>
          </div>
        </b-step-item>
        <b-step-item
          v-if="application.form.needHardware"
          icon="fas fa-microchip"
          label="Hardware"
          :clickable="true"
          :type="{ 'is-danger': errors.has('hardwareList') }"
        >
          <b-field
            label="Hardware need"
            :type="{ 'is-danger': errors.has('hardwareList') }"
            :message="errors.collect('hardwareList')"
          >
            <b-taginput
              v-model="application.form.hardwareList"
              v-validate="'required_if:needHardware,true'"
              name="hardwareList"
              ellipsis
              icon="fas fa-microchip"
              placeholder="Add hardware"
            ></b-taginput>
          </b-field>
        </b-step-item>
        <b-step-item
          v-if="application.form.needTravelReimbursement"
          icon="fas fa-plane"
          label="Travel"
          :clickable="true"
          :type="{
            'is-danger':
              errors.has('paypalAddress') || errors.has('travelReceipt')
          }"
        >
          <div class="columns">
            <div class="column">
              <b-field
                label="Paypal address*"
                :type="{ 'is-danger': errors.has('paypalAddress') }"
                :message="errors.collect('paypalAddress')"
              >
                <b-input
                  v-model="application.form.paypalAddress"
                  v-validate="'email'"
                  name="paypalAddress"
                  type="email"
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field class="file" expanded>
                <b-upload
                  v-model="application.form.travelReceipt"
                  data-vv-validate-on="input"
                  accept="application/pdf"
                  name="travelReceipt"
                >
                  <a class="button is-primary is-full-width">
                    <b-icon icon="upload"></b-icon>
                    <span>Upload your travel receipt*</span>
                  </a>
                </b-upload>
                <span v-if="application.form.travelReceipt" class="file-name">{{
                  application.form.travelReceipt.name
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
          v-if="application.form.needAccomodation"
          icon="fas fa-hotel"
          label="Accomodation"
          :clickable="true"
          :type="{
            'is-danger':
              errors.has('AccomodationPreferences') ||
              errors.has('hostMatchingDetails')
          }"
        >
          <b-field
            label="Accomodation preferences"
            :type="{ 'is-danger': errors.has('AccomodationPreferences') }"
            :message="errors.collect('AccomodationPreferences')"
          >
            <b-select
              v-model="application.form.AccomodationPreferences"
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
              v-model="application.form.hostMatchingDetails"
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
          <b-field
            :type="{ 'is-danger': errors.has('majority') }"
            :message="errors.collect('majority')"
          >
            <b-checkbox
              v-model="application.form.majority"
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
              v-model="application.form.photoRelease"
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
              v-model="application.form.codeOfConduct"
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
              v-model="application.form.additionalNotes"
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
            <div class="column">
              <b-button type="is-danger" @click.prevent="cancel"
                >Cancel</b-button
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
  APPLICATION_QUERY,
  APPLY_MUTATION,
  CANCEL_MUTATION
} from '@/graphql/applicationQueries';
import { applicationMixin } from '@/mixins';

export default {
  mixins: [applicationMixin],
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
    application: {
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
          this.$apollo
            .mutate({
              mutation: APPLY_MUTATION,
              variables: this.application.form
            })
            .then(() => {
              this.$buefy.toast.open({
                message: 'Application saved !',
                type: 'is-success'
              });
            });
        } else {
          this.goToError();
        }
      });
    },
    cancel() {
      this.$apollo
        .mutate({
          mutation: CANCEL_MUTATION,
          variables: { id: this.application._id }
        })
        .then(() => {
          this.$buefy.toast.open({
            message: 'Application canceled !',
            type: 'is-success'
          });
        });
    },
    goToError() {
      // move stepper to the first errored step
      if (this.isProfileInvalid) {
        this.activeStep = 0;
      } else if (this.errors.has('hardwareList')) {
        this.activeStep = 1;
      } else if (
        this.errors.has('paypalAddress') ||
        this.errors.has('travelReceipt')
      ) {
        this.activeStep = !!this.application.form.needHardware + 1;
      } else if (
        this.errors.has('AccomodationPreferences') ||
        this.errors.has('hostMatchingDetails')
      ) {
        this.activeStep =
          !!this.application.form.needHardware +
          !!this.application.form.needTravelReimbursement +
          1;
      } else if (
        this.errors.has('majority') ||
        this.errors.has('photoRelease') ||
        this.errors.has('codeOfConduct')
      ) {
        this.activeStep =
          !!this.application.form.needHardware +
          !!this.application.form.needAccomodation +
          !!this.application.form.needTravelReimbursement +
          1;
      }
    }
  },
  apollo: {
    application: {
      query: APPLICATION_QUERY,
      update: function({ application }) {
        application = application || this.application;
        application.form.garduationYear = application.form.garduationYear
          ? new Date(application.form.garduationYear)
          : null;
        return application;
      }
    }
  }
};
</script>
