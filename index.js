const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
//vDIq7R0o6ndVHntD
mongoose
  .connect(
    "mongodb+srv://92cs93:vDIq7R0o6ndVHntD@cluster0.7z2ws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const messageSchema = new mongoose.Schema({
  username: String,
  email: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { username, email, message } = req.body;
  try {
    const newMessage = new Message({ username, email, message });
    await newMessage.save();
    res.status(200).send({ message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Failed to save message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
