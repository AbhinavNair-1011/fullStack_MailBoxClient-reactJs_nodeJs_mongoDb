const app = require("./app");
const connectDB = require("./database/dbConfig");

const http = require("http");

const server = http.createServer(app);
const { init } = require("./config/socket");

init(server);

const PORT = process.env.PORT || 3000;

async function runServer() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    process.exit(1)
  }
}

runServer();
