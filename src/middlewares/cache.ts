import NodeCache from "node-cache";

const myCache = new NodeCache({stdTTL: 5});
export default myCache;
