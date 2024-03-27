import NodeCache from "node-cache";

// local caching
const myCache = new NodeCache({stdTTL: 60});
export default myCache;
