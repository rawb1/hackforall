import gql from 'graphql-tag';

export const HACKATHON_STATS_QUERY = gql`
  query {
    hackathonStats {
      hackers
      applications
      teams
      date
    }
  }
`;
