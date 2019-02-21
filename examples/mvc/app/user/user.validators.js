const { Exceptions: { BadRequestException } } = require('../../../../index');

const userCreateValidator = async (ctx) => {
  try {
    const body = await ctx.getBody();
    if (body.email) {
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
