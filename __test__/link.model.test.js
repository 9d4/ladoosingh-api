const { nanoid } = require('nanoid');
const { getModels, init } = require('../app/database/models/index');

describe('Model: Link', () => {
  test('create new Link', async () => {
    await init();

    const id = nanoid();
    const a = await getModels()['link'].create({
      linkId: id,
    });

    // find the created link
    const b = await getModels()['link'].findOne({where: {linkId: id}});
    expect(b).toBeTruthy();

    a.destroy();
  });
});
