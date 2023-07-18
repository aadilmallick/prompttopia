import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Please provide a prompt"],
  },
  tags: {
    type: [String],
    required: [true, "Please provide at least one tag"],
  },
});

// need this for hot module replacement, to prevent redefining models
const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
export default Prompt;
