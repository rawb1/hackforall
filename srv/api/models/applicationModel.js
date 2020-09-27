const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  hackathonId: {
    type: Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true,
    immutable: true
  },
  form: {
    profile: {
      name: String,
      school: String,
      phone: String,
      garduationYear: String,
      studyFields: [String],
      interests: [String],
      github: String,
      resume: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'File'
        },
        name: String
      },
      teeShirtSize: String,
      dietaryRestrictions: [String],
      needHardware: Boolean,
      needHosting: Boolean,
      needTravelReimbursement: Boolean
    },
    hardware: { hardwareList: [String] },
    travel: {
      paypalAddress: String,
      travelReceipt: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'File'
        },
        name: String
      }
    },
    hosting: { HostingPreferences: [String], hostMatchingDetails: String },
    terms: {
      majority: Boolean,
      liability: Boolean,
      photoRelease: Boolean,
      codeOfConduct: Boolean
    },
    additionalNotes: String
  },
  status: {
    type: String,
    required: true,
    enum: ['INCOMPLETE', 'PENDING', 'REFUSED', 'ACCEPTED', 'CANCELED'],
    default: 'INCOMPLETE'
  },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() }
});

ApplicationSchema.index({ userId: 1, hackathonId: 1 }, { unique: true });

ApplicationSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

mongoose.model('Application', ApplicationSchema);
