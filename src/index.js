const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(`${req.method} -${req.url} - ${new Date().toDateString()}`);
  res.status(200).json({ message: "Welcome" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
