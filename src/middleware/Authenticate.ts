import { verify } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = "3be17c7406dc4904c247ab8d78d11c05";

const validateToken = (req, res, next?) => {
  if (!req.headers["cookie"]) {
    res.status(400);
    res.send("Cookie não encontrada");
    return;
  }
  const accessToken = req.headers["cookie"].split("=")[1];

  if (!accessToken) {
    return res.status(400).json({ message: "User not Autheticated!" });
  }

  try {
    const validToken = verify(accessToken, ACCESS_TOKEN_SECRET);

    if (validToken) {
      req.authenticated = true;
      if (res) {
        try {
          res.status(200);
          //res.send("Cookie aceite");
        } catch {}
      }

      if (next) return next();
      return;
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export { validateToken };
