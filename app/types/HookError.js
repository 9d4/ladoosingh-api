class HookError extends Error {
  constructor(message = 'Hook not found', code = 404) {
    super(message);
    this.name = 'HookError';
    this.code = code;
  }
}

module.exports = HookError;
