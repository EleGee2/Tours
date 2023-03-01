export default () => ({
  appSecret: process.env.JWT_SECRET,
  secretDuration: process.env.EXPIRESIN,
});
