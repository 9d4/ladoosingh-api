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

module.exports = { createNewLink };
