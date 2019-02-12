module.exports = class RuntimeException extends Error {
  constructor(message) {
    super(message);
    this.msg = message;
  }

  what() {
    return this.msg;
  }
};
