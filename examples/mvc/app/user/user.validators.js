const { Exceptions: { BadRequestException } } = require('../../../../index');

const userCreateValidator = async (ctx) => {
  try {
    const body = await ctx.getBody();
    const isEmailPresent = Boolean(body.email);
    const isNamePresent = Boolean(body.name);
    if (isEmailPresent && isNamePresent) {
      return true;
    }
  } catch (error) {
    console.error('error :: ', error);
  }
  throw new BadRequestException({
    message: 'no email',
    isBadRequestException: true,
  });
};

module.exports.userCreateValidator = userCreateValidator;
