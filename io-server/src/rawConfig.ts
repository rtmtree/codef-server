if (!process.env.SERVICE_TYPE) {
  throw new Error("Missing SERVICE_TYPE");
}
if (!process.env.SERVICE_DOMAIN) {
  throw new Error("Missing SERVICE_DOMAIN");
}
if (!process.env.SERVICE_PORT) {
  throw new Error("Missing SERVICE_PORT");
}
if (!process.env.ADDITIONAL_CORS_HOSTS) {
  throw new Error("Missing ADDITIONAL_CORS_HOSTS");
}

export const {
  SERVICE_TYPE,
  SERVICE_DOMAIN,
  SERVICE_PORT,
  ADDITIONAL_CORS_HOSTS,
} = process.env;
