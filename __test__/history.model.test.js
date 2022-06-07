const { nanoid } = require("nanoid");
const { db, getModels, init } = require("../app/database/models/index");

describe("Model: Link", () => {
  test("create new Link", async () => {
    await init();

    const id = nanoid();
    const a = await getModels()["link"].create({
      linkId: id,
    });

    // find the created link
    const b = await getModels()["link"].findOne({ where: { linkId: id } });
    expect(b).toBeTruthy();

    
    // create history associated with id
    const c = await getModels()["history"].create({
        linkId: b.id,
        data: {
            method: "GET",
        }
    });

    expect(c).toBeTruthy();

    a.destroy();
  });
});
