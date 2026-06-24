import dotenv from "dotenv";
import { fileURLToPath } from "url";

// dist/index.js is three levels below the bms workspace root.
const envPath = fileURLToPath(new URL("../../../.env", import.meta.url));
const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  throw new Error(`Unable to load environment variables from ${envPath}`, {
    cause: envResult.error,
  });
}

// Wrap in async IIFE to use await
(async () => {
  const express = await import("express");
  const { client } = await import("@repo/db/client");

  const app = express.default();
  app.use(express.default.json());
  app.get("/", (req, res) => {
    res.send("Hi there");
  })
  app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await client.user.create({
      data: {
        username: username,
        password: password
      }
    })
    res.json({
      message: "Signup sucessful",
      id: user.id
    })
  })
  app.listen(3002);
})();
