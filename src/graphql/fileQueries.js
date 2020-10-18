import gql from 'graphql-tag';

export const FILES_LINK_QUERY = gql`
  query {
    filesLink
  }
`;

export const FILE_LINK = gql`
  query($bucket: String) {
    fileLink(bucket: $bucket)
  }
`;

export const USER_FILE_LINK = gql`
  query($userId: ID, $bucket: String) {
    fileLink(userId: $userId, bucket: $bucket)
  }
`;
