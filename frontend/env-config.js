const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.GRAPHQL_URL": prod ? "prod_api_url" : "http://localhost:4000"
};
