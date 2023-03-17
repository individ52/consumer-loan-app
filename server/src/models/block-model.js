import pkg from "mongoose";
const { Schema, model } = pkg;

const BlockSchema = new Schema({
    warningCount: { type: Number, required: true, default: 0 },
    isBlocked: { type: Boolean, required: true, default: false },
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
});

export default model("Block", BlockSchema);
