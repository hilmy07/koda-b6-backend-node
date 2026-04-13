export const corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // handle preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};
