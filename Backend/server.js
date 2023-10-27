const http = require("http");
require("dotenv").config();

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error(
    "API key is not set. Please set it as an environment variable."
  );
  process.exit(1);
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, Node.js Server!");
});

const port = 3000;
server.listen(port, () => {
  console.log("-------------------------");
  console.log(`API key is ${apiKey}`);
  console.log(`Server is running on http://localhost:${port}`);
  console.log("-------------------------");
});
