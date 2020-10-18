const NodeCache = require('node-cache');
const nodeCache = new NodeCache();

const cache = (key, method, ttl) =>
  nodeCache.get(key) ||
  method().then(data => nodeCache.set(key, data, ttl) && data);

module.exports = cache;
