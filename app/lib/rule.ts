import mongoose from "mongoose";

const RuleSchema = new mongoose.Schema({
  mediaId:    { type: String, required: true },
  keywords:   { type: [String], required: true },
  commentMsg: { type: String, required: true },
  dmMsg:      { type: String },
  active:     { type: Boolean, default: true },
  createdAt:  { type: Date, default: Date.now },
});

export const Rule = mongoose.models.Rule || mongoose.model("Rule", RuleSchema);