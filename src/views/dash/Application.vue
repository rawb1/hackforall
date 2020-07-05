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
            <h2 class="title has-text-centered">Profile</h2>
            <div class="columns">
              <div class="column">
                <b-field
                  label="Name*"
                  :type="{ 'is-danger': errors.has('name') }"
                  :message="errors.first('name')"
                >
                  <b-input
                    ref="name"
                    v-model="application.name"
                    v-validate="'required|email'"
                    name="name"
                    type="text"
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
                <b-field
                  label="Graduation year*"
                  :type="{ 'is-danger': formErrors.garduationYear }"
                  :message="{
                    'Graduation year required': formErrors.garduationYear
                  }"
                >
                  <b-datepicker
                    v-model="application.garduationYear"
                    icon="fas fa-graduation-cap"
                    editable
                    @blur="validate('garduationYear')"
                  >
                  </b-datepicker>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field
                  label="Study fields*"
                  :type="{ 'is-danger': formErrors.studyFields }"
                  :message="{ 'Study fields required': formErrors.studyFields }"
                >
                  <b-taginput
                    v-model="application.studyFields"
                    ellipsis
                    icon="fas fa-user-graduate"
                    placeholder="Add study"
                    @blur="validate('studyFields')"
                    @remove="validate('studyFields')"
                  >
                  </b-taginput>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Interests">
                  <b-taginput
                    v-model="application.interests"
                    ellipsis
                    icon="fas fa-user-tag"
                    placeholder="Add interest"
                  >
                  </b-taginput>
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
              <b-taginput
                v-model="application.dietaryRestrictions"
                ellipsis
                icon="fas fa-utensils"
                placeholder="Add restriction"
              >
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
            <h2 class="title has-text-centered">Hardware</h2>
            <b-field label="Hardware need">
              <b-taginput
                v-model="application.hardwareList"
                ellipsis
                icon="fas fa-microchip"
                placeholder="Add hardware"
              >
              </b-taginput>
            </b-field>
          </b-step-item>
          <b-step-item
            v-if="application.needTravelReimbursement"
            icon="fas fa-plane"
            label="Travel"
            :clickable="true"
          >
            <h2 class="title has-text-centered">Travel reimbursement</h2>
            <div class="columns">
              <div class="column">
                <b-field label="Paypal address*">
                  <b-input
                    ref="name"
                    v-model="application.paypalAddress"
                    type="text"
                  ></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field class="file" position="is-centered">
                  <b-upload
                    v-model="application.travelReceipt"
                    accept="application/pdf"
                  >
                    <a class="button is-primary is-full-width">
                      <b-icon icon="upload"></b-icon>
                      <span>Upload your travel receipt*</span>
                    </a>
                  </b-upload>
                  <span v-if="application.travelReceipt" class="file-name">
                    {{ application.travelReceipt.name }}
                  </span>
                </b-field>
              </div>
            </div>
          </b-step-item>
          <b-step-item
            v-if="application.needAccomodation"
            icon="fas fa-hotel"
            label="Accomodation"
            :clickable="true"
          >
            <h2 class="title has-text-centered">Accomodation</h2>
            <b-field label="Accomodation preferences">
              <b-select
                v-model="application.AccomodationPreferences"
                placeholder="Accomodation preference"
                expanded
                multiple
                required
              >
                <option
                  v-for="preference in accomodationPreferencesList"
                  :key="preference"
                  :value="preference"
                  >{{ preference }}</option
                >
              </b-select>
            </b-field>
            <b-field label="Host matching details">
              <b-input
                v-model="application.hostMatchingDetails"
                maxlength="200"
                type="textarea"
              ></b-input>
            </b-field>
          </b-step-item>
          <b-step-item
            icon="fas fa-file-contract"
            label="Terms"
            :clickable="true"
          >
            <h2 class="title has-text-centered">Terms</h2>
            <div class="field">
              <b-checkbox v-model="application.majority">
                I will be
                <strong>&nbsp;18 years or older&nbsp;</strong>by the day of the
                event.
                <b-tooltip
                  label="We will be checking ID. Minors you will be turned away at the door."
                >
                  <b-icon size="is-small" icon="fas fa-info-circle"></b-icon>
                </b-tooltip>
              </b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="application.photoRelease">
                If we take photos or photos of you, we can share it with the
                world.
                <b-tooltip
                  label="By checking, I affirm that I have read and accepted the terms of the photo release above."
                >
                  <b-icon size="is-small" icon="fas fa-info-circle"></b-icon>
                </b-tooltip>
              </b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="application.codeOfConduct">
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
                >
                <b-tooltip
                  label="I further autorize you to share my application/registration information for event administration,
                  ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons
                  in-line with the MLP privacy policy"
                >
                  <b-icon size="is-small" icon="fas fa-info-circle"></b-icon>
                </b-tooltip>
              </b-checkbox>
            </div>
            <div class="divider">Complementary informations</div>
            <b-field label="Additional notes">
              <b-input
                v-model="application.additionalNotes"
                placeholder="If there's anything else you need to let us know, tell us here!"
                maxlength="200"
                type="textarea"
              ></b-input>
            </b-field>
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
    teeShirtSizes: ['XS', 'S', 'M', 'L', 'XL'], // TODO move server side
    accomodationPreferencesList: [
      // TODO move server side
      'None',
      'No animal(s)',
      'Small animal(s)',
      'No smoking',
      'Group hosting'
    ],
    formErrors: { garduationYear: false, studyFields: false },
    application: {
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
      needHardware: true,
      needAccomodation: true,
      needTravelReimbursement: true,
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
      contestTerms: false,
      additionalNotes: ''
    }
  }),
  methods: {
    isProfileValid: function() {
      let isValid = true;
      isValid = isValid && this.$refs.name.checkHtml5Validity();
      isValid = isValid && this.$refs.phone.checkHtml5Validity();
      isValid = isValid && this.$refs.school.checkHtml5Validity();

      isValid = isValid && !this.formErrors.garduationYear;
      isValid = isValid && !this.formErrors.studyFields;
      return isValid;
    },
    validate: function(input) {
      this.$log.debug(this.application[input]);
      const val = this.application[input];
      this.formErrors[input] = Array.isArray(val) ? val.length === 0 : !val;
    }
  }
};
</script>
