import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load .env before importing the database package. The compiled file lives in
// bms/apps/web-socket server/dist, while .env lives beside the bms folder.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = path.resolve(__dirname, "../../../../.env");
const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  throw new Error(`Unable to load environment variables from ${envPath}`, {
    cause: envResult.error
  });
}

// Wrap in async IIFE to use await
(async () => {
  const { WebSocketServer } = await import("ws");
  const { client } = await import("@repo/db/client");

  const server = new WebSocketServer({
    port: 3001
  });

  server.on("connection", async (socket) => {
    try {
      await client.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString()
        }
      })
      socket.send("Hi there you are connected to the server");
    } catch (error) {
      console.error("Error:", error);
      socket.send("Error connecting to server");
    }
  })
})();
