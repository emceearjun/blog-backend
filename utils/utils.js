const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");

const generateId = () => {
  return uuidv4();
};

const generateSlug = (url) => {
  const options = {
    strict: true,
    lower: true
  };
  return slugify(url, options);
};

const createApiResponse = (payload, success, message)  => {
  return {
    payload,
    success,
    message
  }
}

module.exports = {
  generateId,
  generateSlug,
  createApiResponse
};
