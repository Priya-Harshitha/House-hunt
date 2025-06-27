const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

mongoose.connect(
  "mongodb://localhost:27017/adminDashboard" //, //{
  // useNewUrlParser: true,
  //useUnifiedTopology: true,
  //}
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    role: {
      type: String,
      enum: ["owner", "renter"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: function () {
        return this.role === "owner" ? "pending" : "approved";
      },
    },
  })
);

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.put("/api/users/:id", async (req, res) => {
  const { status } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updatedUser);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
