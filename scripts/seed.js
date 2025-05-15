const mongoose = require("mongoose");
const Topic = require("../models/topic");

// Generate a due date +/- {offsetDays} days from today
function randomDateWithinDays(offsetDays) {
  const now = new Date();
  const offset = Math.floor(Math.random() * offsetDays * 2) - offsetDays;
  return new Date(now.setDate(now.getDate() + offset));
}

const sampleWords = [
  "Optimize", "Refactor", "Design", "Build", "Research", "Test", "Implement",
  "Fix", "Upgrade", "Document", "Deploy", "Analyze", "Benchmark", "Create",
  "Audit", "Plan", "Coordinate", "Review", "Draft", "Debug"
];

const sampleObjects = [
  "authentication module", "dashboard", "API", "user interface",
  "backend logic", "MongoDB schema", "pagination system",
  "search algorithm", "unit tests", "dev pipeline", "CI/CD process",
  "sorting function", "notification system", "logging service",
  "authorization middleware", "data migration script"
];

function generateRandomText(words, objects) {
  const verb = words[Math.floor(Math.random() * words.length)];
  const object = objects[Math.floor(Math.random() * objects.length)];
  return `${verb} the ${object}`;
}

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/devdb");
    console.log("✅ Connected to MongoDB");

    await Topic.deleteMany();

    const topics = [];

    for (let i = 1; i <= 100; i++) {
      const title = generateRandomText(sampleWords, sampleObjects);
      const description = `${generateRandomText(sampleWords, sampleObjects)} to improve project reliability.`;
      const dueDate = randomDateWithinDays(30);

      topics.push({ title, description, dueDate });
    }

    await Topic.insertMany(topics);
    console.log("🌱 Seeded items.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
}

seed();
