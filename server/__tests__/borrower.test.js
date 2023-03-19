import mongoose from "mongoose";
describe("borrower", () => {
    const DB_URL = "mongodb+srv://test:test@cluster0.usufuwy.mongodb.net/?retryWrites=true&w=majority";
    let mongoClient;

    beforeAll(async () => {
        mongoClient = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoClient.connection.close();
    });

    afterEach(async () => {
        await mongoClient.connection.db.dropDatabase();
    });

    it("registration", async () => {
        console.log("okay")
    });
});
