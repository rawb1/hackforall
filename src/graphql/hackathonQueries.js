import gql from 'graphql-tag';

export const HACKATHON_QUERY = gql`
  query {
    hackathon {
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
    }
  }
`;

export const HACKATHONS_QUERY = gql`
  query {
    hackathons {
      id
      name
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
    }
  }
`;

export const HACKATHON_UPDATE_MUTATION = gql`
  mutation($hackathon: HackathonInput!) {
    updateHackathon(hackathon: $hackathon) {
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
    }
  }
`;

export const HACKATHON_CANCEL_MUTATION = gql`
  mutation {
    cancelHackathon {
      id
      active
    }
  }
`;

export const HACKATHON_ACTIVATE_MUTATION = gql`
  mutation($id: ID!) {
    activateHackathon(id: $id) {
      id
      active
    }
  }
`;
