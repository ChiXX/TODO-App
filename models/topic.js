const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

module.exports = Topic;
