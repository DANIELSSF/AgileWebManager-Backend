const client = require('twilio')(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const sendCode = (phone) => {
  return new Promise((resolve, reject) => {
    client.verify.v2
      .services(process.env.SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  });
};

const verifyVerificationNumber = ({ phone, code }) => {
  return new Promise((resolve, reject) => {
    client.verify.v2
      .services(process.env.SERVICE_SID)
      .verificationChecks.create({ to: phone, code: code })
      .then((verification_check) => {
        if (verification_check.valid) {
          resolve(true);
        }
        reject(false);
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  });
};

module.exports = { verifyVerificationNumber, sendCode };
