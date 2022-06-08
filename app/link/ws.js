let serverCopy;

/**
 * Server getter setter
 * @param {import('@hapi/hapi').Server} s
 * @returns {import('@hapi/hapi').Server}
 */
const server = (s) => {
  if (s) {
    serverCopy = s;
  }

  return serverCopy;
};

/**
 * Init websocket subscription
 * @param {import('@hapi/hapi').Server} s
 */
const initLinkWS = (s) => {
  server(s);
  s.subscription('/ws/{linkId}', {});
};

/**
 * Send message to subscribers who subscribed to the '/ws/{linkId}' route
 * @param {*} linkId
 * @param {*} message
 * @param {import('@hapi/hapi').Server} server
 */
const sendMessage = async (linkId, message, s = serverCopy) => {
  s.publish(`/ws/${linkId}`, message);
};

module.exports = { initLinkWS, sendMessage, server };
