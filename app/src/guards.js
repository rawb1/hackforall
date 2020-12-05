import client from '@/apollo/client';
import { ME_QUERY } from '@/graphql/userQueries';
import { HACKATHON_QUERY } from '@/graphql/hackathonQueries';

export const isConnected = () =>
  client
    .query({ query: ME_QUERY })
    .then(({ data }) => data && data.me)
    .catch(() => false);

export const isAdmin = () =>
  client
    .query({ query: ME_QUERY })
    .then(({ data }) => data && data.me && data.me.role === 'ADMIN')
    .catch(() => false);

export const isHackathonOpen = () =>
  client
    .query({ query: HACKATHON_QUERY })
    .then(({ data }) => data && data.hackathon && data.hackathon.open)
    .catch(() => false);

export const isHackathonLive = () =>
  client
    .query({ query: HACKATHON_QUERY })
    .then(({ data }) => data && data.hackathon && data.hackathon.live)
    .catch(() => false);
