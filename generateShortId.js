const { nanoid } = require('nanoid');

const generateShortId = () => {
  return nanoid(8); // 8-character short ID
};

module.exports = generateShortId;
