const { nanoid } = require('nanoid');
const { db, getModels, init } = require('../app/database/models/index');

describe('Model: Link', () => {
  test('create new Link', async () => {
    await init();

    const id = nanoid();
    const a = await getModels()['link'].create({
      linkId: id,
    });

    // find the created link
    const b = await getModels()['link'].findOne({ where: { linkId: id } });
    expect(b).toBeTruthy();

    // create history associated with id
    const c = await getModels()['history'].create({
      linkId: b.id,
      data: {
        method: 'GET',
      },
    });

    expect(c).toBeTruthy();

    await a.destroy();
  });

  test('delete older history, keep 50 only', async () => {
    await init();

    const id = nanoid();
    const a = await getModels()['link'].create({
      linkId: id,
    });

    // find the created link
    const b = await getModels()['link'].findOne({ where: { linkId: id } });
    expect(b).toBeTruthy();

    // create history associated with id 55 times
    for (let i = 0; i < 55; i++) {
      const c = await getModels()['history'].create({
        linkId: b.id,
        data: {
          method: 'GET',
        },
      });
    }

    // find all histories
    const histories = await getModels()['history'].findAll({
      where: {
        linkId: b.id,
      },
    });

    // expect there are only 50 histories
    expect(histories.length).toBe(50);

    await a.destroy();
  });
});
