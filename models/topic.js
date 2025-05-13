const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

module.exports = Topic;