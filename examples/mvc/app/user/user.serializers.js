const {
  Exceptions: {
    InternalServerErrorException,
  },
} = require('../../../../index');

module.exports.createUseSerializer = async (ctx) => {
  let body;
  try {
    body = await ctx.getBody();
    const {
      email,
      name,
    } = body;
    return {
      personal: {
        email,
        name,
      },
    };
  } catch (error) {
    throw new InternalServerErrorException('get body error');
  }
};
