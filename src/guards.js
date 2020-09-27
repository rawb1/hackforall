import client from '@/apollo/client';
import { ME_QUERY } from '@/graphql/userQueries';
import { HACKATHON_QUERY } from '@/graphql/hackathonQueries';

import { CONNECTED_QUERY, CONNECTED_MUTATION } from '@/apollo/state';

const isMe = async () => {
  const isMe = await client
    .query({ query: ME_QUERY })
    .then(({ data }) => data && data.me)
    .catch(() => false);
  await client.mutate({
    mutation: CONNECTED_MUTATION,
    variables: { connected: isMe }
  });
  return isMe;
};

export const isConnected = client
  .query({ query: CONNECTED_QUERY })
  .then(({ data }) => (data ? data.connected : isMe()))
  .catch(() => false);

export const isAdmin = client
  .query({ query: ME_QUERY })
  .then(({ data }) => data && data.me && data.me.role === 'ADMIN')
  .catch(() => false);

export const isHackathonOpen = client
  .query({ query: HACKATHON_QUERY })
  .then(({ data }) => data && data.hackathon && data.hackathon.open)
  .catch(() => false);

export const isHackathonLive = client
  .query({ query: HACKATHON_QUERY })
  .then(({ data }) => data && data.hackathon && data.hackathon.live)
  .catch(() => false);
