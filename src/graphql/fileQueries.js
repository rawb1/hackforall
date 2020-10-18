import gql from 'graphql-tag';

export const FILES_LINK_QUERY = gql`
  query {
    filesLink
  }
`;

export const FILE_LINK_QUERY = gql`
  query($bucket: String) {
    fileLink(bucket: $bucket) {
      name
      link
    }
  }
`;

export const USER_FILE_LINK_QUERY = gql`
  query($userId: ID, $bucket: String) {
    userFileLink(userId: $userId, bucket: $bucket) {
      name
      link
    }
  }
`;
