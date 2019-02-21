module.exports.createUseDeserializer = async (response) => {
  const {
    method,
    name,
    body,
    state,
  } = response;
  return {
    org: {
      method,
      body,
      state,
    },
    toShow: {
      name,
    },
    timestamp: Date.now(),
  };
};
