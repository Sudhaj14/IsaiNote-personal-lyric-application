const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sudha:sudha123@lyric-manager.zz2x5db.mongodb.net/?retryWrites=true&w=majority&appName=lyric-manager")
  .then(() => console.log("✅ Connected to MongoDB Atlas!"))
  .catch((err) => console.error("❌ Failed to connect:", err));
