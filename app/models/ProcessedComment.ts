// models/ProcessedComment.ts
import mongoose from "mongoose";

const ProcessedCommentSchema = new mongoose.Schema({
  dedupKey: { 
    type: String, 
    required: true, 
    unique: true // commenterId:mediaId
  },
  ruleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "AutomationRule", 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export const ProcessedComment = mongoose.models.ProcessedComment || 
  mongoose.model("ProcessedComment", ProcessedCommentSchema);