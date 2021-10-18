const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const cors = require("cors");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwks = require("jwks-rsa");
require("dotenv").config({ path: "../.env" });

app.use(cors());

// Serve any static files
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "build");
  app.use(express.static(buildPath));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "build/index.html"));
  });
}

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  audience: process.env.AUTH_0_AUDIENCE,
  issuer: process.env.AUTH_0_ISSUER,
  algorithms: ["RS256"],
});

const checkScopes = jwtAuthz(["Admin"], { customScopeKey: "permissions" });

app.get("/protected/is-admin", verifyJwt, checkScopes, async (req, res) => {
  res.send(true);
});

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on(
    "message",
    ({ name, message, time, isAdmin, messageAdminOnly, userId }) => {
      if (!messageAdminOnly) {
        io.emit("message", {
          name,
          message,
          time,
          isAdmin,
          messageAdminOnly,
          userId,
        });
      }
      if (messageAdminOnly && isAdmin) {
        io.emit("adminOnly", {
          name,
          message,
          time,
          isAdmin,
          messageAdminOnly,
          userId,
        });
      }
    }
  );
  console.log("A new user has joined the chat");
});

io.on("disconnect", () => {
  console.log("A user disconnected");
});

console.log("REACT_API_PORT: " + process.env.REACT_APP_DOMAIN_AUTH0);

const PORT = process.env.SERVER_PORT || 8080;
http.listen(PORT, () => console.log(`Server Running`, PORT));
