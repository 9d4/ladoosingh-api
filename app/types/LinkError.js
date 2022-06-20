class LinkError extends Error {
  constructor(message = 'Link not found', code = 404) {
    super(message);
    this.name = 'LinkError';
    this.code = code;
  }
}

module.exports = LinkError;
