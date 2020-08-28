import gql from 'graphql-tag';

export const APPLICATION_QUERY = gql`
  query {
    application {
      _id
      userId
      hackathonId
      status
      form {
        name
        school
        phone
        garduationYear
        studyFields
        interests
        github
        resume {
          name
          type
        }
        dietaryRestrictions
        teeShirtSize
        needHardware
        needAccomodation
        needTravelReimbursement
        hardwareList
        paypalAddress
        travelReceipt {
          name
          type
        }
        AccomodationPreferences
        hostMatchingDetails
        majority
        liability
        photoRelease
        codeOfConduct
        additionalNotes
      }
    }
  }
`;

export const APPLY_MUTATION = gql`
  mutation(
    $name: String!
    $school: String!
    $phone: String!
    $garduationYear: String!
    $studyFields: [String]!
    $interests: [String]
    $github: String
    $resume: Upload
    $dietaryRestrictions: [String]
    $teeShirtSize: String!
    $needHardware: Boolean
    $needAccomodation: Boolean
    $needTravelReimbursement: Boolean
    $hardwareList: [String]
    $paypalAddress: String
    $travelReceipt: Upload
    $AccomodationPreferences: [String]
    $hostMatchingDetails: String
    $majority: Boolean!
    $liability: Boolean!
    $photoRelease: Boolean!
    $codeOfConduct: Boolean!
    $additionalNotes: String
  ) {
    apply(
      form: {
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
      status
    }
  }
`;

export const CANCEL_MUTATION = gql`
  mutation($id: ID!) {
    cancel(id: $id) {
      status
    }
  }
`;

export const ACCEPT_MUTATION = gql`
  mutation($id: ID!) {
    accept(id: $id) {
      status
    }
  }
`;

export const REFUSE_MUTATION = gql`
  mutation($id: ID!) {
    refuse(id: $id) {
      status
    }
  }
`;
