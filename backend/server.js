require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Neon Store backend is running",
    status: "ok",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Backend health check passed",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.log(`Port ${port} is busy. Trying ${nextPort} instead...`);
      startServer(nextPort);
      return;
    }

    console.error("Server failed to start:", error);
  });
};

const bootstrap = async () => {
  try {
    await connectDB();
    startServer(DEFAULT_PORT);
  } catch (error) {
    console.error("Failed to start backend:", error.message);
    process.exit(1);
  }
};

bootstrap();
