module.exports = class ConfigBase {
  isEmpty() {
    return Object.getOwnPropertyNames(this).every(name => !this[name]);
  }
}