import {staticWithWebp} from '../backend/static-webp.js';
import express from "express";
import http from "http";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.use("/api", (req, res) => {
  const target = new URL(req.originalUrl, BACKEND_URL);
  const client = target.protocol === "https:" ? https : http;

  const proxyReq = client.request(
    target,
    {
      method: req.method,
      headers: {
        ...req.headers,
        host: target.host,
      },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );

  proxyReq.on("error", () => {
    if (!res.headersSent) {
      res.status(502).json({
        success: false,
        message: `Backend unavailable at ${BACKEND_URL}`,
      });
    }
  });

  req.pipe(proxyReq);
});

app.use(staticWithWebp(__dirname));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
  console.log(`Proxying API requests to ${BACKEND_URL}`);
});
