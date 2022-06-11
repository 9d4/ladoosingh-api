const { customAlphabet } = require('nanoid');
const { getModels } = require('../database/models');

/**
 * Helper to create linkId
 * @returns {String}
 */
const generateLinkId = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
  const length = 11;
  return customAlphabet(alphabet, length)();
};

/**
 * Handler to generate new link that will be inspected.
 *
 * @param {import('@hapi/hapi').Request} req
 * @param {import('@hapi/hapi').ResponseToolkit} res
 */
const createNewLink = async (req, res) => {
  try {
    const link = await getModels().link.create({
      linkId: generateLinkId(),
    });

    return res.response({
      link: link.linkId,
    }).code(201);
  } catch (err) {
    return res.response(err.stack).code(500);
  }
};

class HookError extends Error {
  constructor(message = 'Hook not found', code = 404) {
    super(message);
    this.name = 'HookError';
    this.code = code;
  }
}

/**
 * Link hook where the request will be inspected.
 *
 * @param {import('@hapi/hapi').Request} req
 * @param {import('@hapi/hapi').ResponseToolkit} res
 */
const linkHook = async (req, res) => {
  try {
    const link = await getModels().link.findOne({
      where: {
        linkId: req.params.linkId,
      },
    });

    if (link === null) {
      throw new HookError();
    }

    if (new Date(link.expiredAt) < new Date()) {
      link.destroy();
      throw new HookError();
    }

    const reqData = {
      method: req.method,
      path: req.raw.req.url,
      http: req.raw.req.httpVersion,
      header: req.raw.req.headers,
      info: req.info,
      body: req.payload,
    };

    await getModels().history.create({
      linkId: link.id,
      data: reqData,
    });
  } catch (err) {
    if (err instanceof HookError) {
      return res.response({ error: err.name, message: err.message }).code(err.code);
    }

    return res.response({ error: 'Internal Server Error' }).code(500);
  }

  return res.response('OK').code(200);
};

module.exports = { createNewLink, linkHook };
