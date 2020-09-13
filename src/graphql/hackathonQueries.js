import gql from 'graphql-tag';

export const HACKATHON_QUERY = gql`
  query {
    hackathon {
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

export const HACKATHONS_QUERY = gql`
  query {
    hackathons {
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
        teams
        refund
      }
    }
  }
`;
