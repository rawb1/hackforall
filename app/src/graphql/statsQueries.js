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

export const STATS_QUERY = gql`
  query {
    stats {
      users
      hackathons
      applications
      teams
      hacks
      date
    }
  }
`;
