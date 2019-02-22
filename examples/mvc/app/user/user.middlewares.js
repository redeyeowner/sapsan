module.exports.addToNamePrefixMiddleware = (ctx) => {
  const { state } = ctx;
  const { personal } = state;
  return {
    personal: {
      prefixedName: `prefix_${personal.name}`,
    },
  };
};
