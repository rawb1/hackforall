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
      live
      open
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

export const UPDATE_HACKATHON_MUTATION = gql`
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
      live
      open
    }
  }
`;

export const CANCEL_HACKATHON_MUTATION = gql`
  mutation {
    cancelHackathon {
      id
      active
      live
      open
    }
  }
`;

export const ACTIVATE_HACKATHON_MUTATION = gql`
  mutation($id: ID!) {
    activateHackathon(id: $id) {
      id
      active
      live
      open
    }
  }
`;
