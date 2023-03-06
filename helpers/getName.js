const jwt = require("jsonwebtoken");

const getName = (token) => {
    
  try {
    const { name } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    return name;
  } catch (error) {
    return "Sin nombre";
  }
};

module.exports = {
  getName,
};
