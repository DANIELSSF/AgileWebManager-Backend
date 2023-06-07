const jwt = require("jsonwebtoken");

const generateJWT = ({ uid, name, status, role, phone, email }) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name,status,role,phone,email };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Could not generate token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};