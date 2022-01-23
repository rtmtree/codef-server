if (!process.env.SERVICE_TYPE) {
  throw new Error('Missing SERVICE_TYPE')
}
if (!process.env.SERVICE_DOMAIN) {
  throw new Error('Missing SERVICE_DOMAIN')
}
if (!process.env.SERVICE_PORT) {
  throw new Error('Missing SERVICE_PORT')
}
if (!process.env.SOCKET_SERVER_ENDPOINT) {
  throw new Error('Missing SOCKET_SERVER_ENDPOINT')
}
if (!process.env.SOCKET_SERVER_PORT) {
  throw new Error('Missing SOCKET_SERVER_PORT')
}

export const {
  SERVICE_TYPE,
  SERVICE_DOMAIN,
  SERVICE_PORT,

  SOCKET_SERVER_ENDPOINT,
  SOCKET_SERVER_PORT,
} = process.env
