import pkg from "mongoose";
const { Schema, model } = pkg;

const LoanSchema = new Schema({
    amount: { type: Number, required: true },
    term: { type: Number, required: true },
    name: { type: String, required: true },
    borrowerId: { type: Schema.Types.ObjectId, ref: "User" },
    addedDate: { type: Date, required: true },
    monthlyInterestRate: {type: Number, required: true, default: 0.05}
});

export default model("Loan", LoanSchema);
