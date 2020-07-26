import gql from 'graphql-tag';

export const SAVE_APPLICATION_MUTATION = gql`
  mutation(
    $name: String
    $school: String
    $phone: String
    $garduationYear: String
    $studyFields: [String]
    $interests: [String]
    $github: String
    $resume: Upload
    $dietaryRestrictions: [String]
    $teeShirtSize: String
    $needHardware: Boolean
    $needAccomodation: Boolean
    $needTravelReimbursement: Boolean
    $hardwareList: [String]
    $paypalAddress: String
    $travelReceipt: Upload
    $AccomodationPreferences: [String]
    $hostMatchingDetails: String
    $majority: Boolean
    $liability: Boolean
    $photoRelease: Boolean
    $codeOfConduct: Boolean
    $additionalNotes: String
  ) {
    saveApplication(
      application: {
        name: $name
        school: $school
        phone: $phone
        garduationYear: $garduationYear
        studyFields: $studyFields
        interests: $interests
        github: $github
        resume: $resume
        dietaryRestrictions: $dietaryRestrictions
        teeShirtSize: $teeShirtSize
        needHardware: $needHardware
        needAccomodation: $needAccomodation
        needTravelReimbursement: $needTravelReimbursement
        hardwareList: $hardwareList
        paypalAddress: $paypalAddress
        travelReceipt: $travelReceipt
        AccomodationPreferences: $AccomodationPreferences
        hostMatchingDetails: $hostMatchingDetails
        majority: $majority
        liability: $liability
        photoRelease: $photoRelease
        codeOfConduct: $codeOfConduct
        additionalNotes: $additionalNotes
      }
    ) {
      _id
    }
  }
`;
