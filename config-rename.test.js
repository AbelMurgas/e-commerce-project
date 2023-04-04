const MONGO_USER = "";
const MONGO_PASSWORD = "";
const MONGO_DEFAULT_DATABASE = "";
export default {
  mongoUri: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ssc1tcl.mongodb.net/${MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
};
