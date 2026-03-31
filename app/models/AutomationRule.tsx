// models/AutomationRule.ts
import mongoose from "mongoose";

const AutomationRuleSchema = new mongoose.Schema({
  mediaId:   { type: String, required: true },
  reelUrl:   { type: String, required: true },
  keyword:   { type: String, required: true },
  message:   { type: String, required: true },
  isActive:  { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const AutomationRule = mongoose.models.AutomationRule || 
  mongoose.model("AutomationRule", AutomationRuleSchema);