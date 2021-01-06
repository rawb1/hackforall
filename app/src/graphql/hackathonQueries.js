import gql from 'graphql-tag';

export const hackathonFragment = gql`
  fragment hackathonFragment on Hackathon {
    id
    name
    active
    dates {
      start
      end
      applications {
        open
        close
      }
    }
    limits {
      hackers
      team
      refund
    }
    status
  }
`;

export const HACKATHON_QUERY = gql`
  query {
    hackathon {
      ...hackathonFragment
    }
  }
  ${hackathonFragment}
`;

export const HACKATHONS_QUERY = gql`
  query {
    hackathons {
      ...hackathonFragment
      createdAt
      updatedAt
    }
  }
  ${hackathonFragment}
`;

export const UPDATE_HACKATHON_MUTATION = gql`
  mutation($hackathon: HackathonInput!) {
    updateHackathon(hackathon: $hackathon) {
      ...hackathonFragment
    }
  }
  ${hackathonFragment}
`;

export const CREATE_HACKATHON_MUTATION = gql`
  mutation($hackathon: HackathonInput!) {
    createHackathon(hackathon: $hackathon) {
      ...hackathonFragment
      createdAt
      updatedAt
    }
  }
  ${hackathonFragment}
`;

export const CANCEL_HACKATHON_MUTATION = gql`
  mutation {
    cancelHackathon {
      id
      active
    }
  }
`;

export const ACTIVATE_HACKATHON_MUTATION = gql`
  mutation($id: ID!) {
    activateHackathon(id: $id) {
      ...hackathonFragment
    }
  }
  ${hackathonFragment}
`;
