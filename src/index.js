const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(`${req.method} -${req.url} - ${new Date().toISOString()}`);
  res.status(200).json({ message: "Welcome" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

console.error('Error');
console.info('Information')
console.warn('Warning');
console.debug('Debug')