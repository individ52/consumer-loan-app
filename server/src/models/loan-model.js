import pkg from "mongoose";
const { Schema, model } = pkg;

const LoanSchema = new Schema({
    amount: { type: Number, required: true },
    term: { type: Number, required: true },
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    addedDate: { type: Date, required: true },
});

export default model("Loan", LoanSchema);
