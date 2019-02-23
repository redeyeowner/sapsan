const handleResponse = res => (typeof res === 'object' && res !== null
  ? JSON.stringify(res)
  : res);

module.exports.handleResponse = handleResponse;
