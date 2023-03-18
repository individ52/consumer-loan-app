const { MongoClient } = require("mongodb");

describe("borrower", () => {
    let connection;
    let db;
    let users;
    let loans;
    let blocks;
    let tokens;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db("test");
        users = await db.collection("users");
        loans = await db.collection("loans");
        blocks = await db.collection("blocks");
        tokens = await db.collection("tokens");

        await users.remove();
        await loans.remove();
        await blocks.remove();
        await tokens.remove();
    });

    afterAll(async () => {
        await connection.close();
    });

    it("hello", async () => {
        // await users.remove();
        // const users = db.collection("users");
        // const allUsers = await users.find().map((u) => u);
        // console.log(allUsers.length);
    });
});
