const bcrypt = require("bcrypt");
const salt = 10;

const hash = (plaintText) => {
    return bcrypt.hash(plaintText, salt);
}

const compare = (plaintText, hashed) => {
    return bcrypt.compare(plaintText, hashed);
}

module.exports = {
    hash,
    compare,
};
