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

    // link createdAt should be 3 days older than expiredAt
    const createdAt = new Date(b.createdAt);
    const expiredAt = new Date(b.expiredAt);
    const after = 1000 * 60 * 60 * 24 * 3; // 3 days
    expect(Math.floor((expiredAt - createdAt) / 10)).toBe(Math.floor(after / 10));

    a.destroy();
  });
});
