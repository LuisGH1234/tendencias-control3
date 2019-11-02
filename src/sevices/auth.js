const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

const hash = plaintText => {
    return bcrypt.hash(plaintText, salt);
};

const compare = (plaintText, hashed) => {
    return bcrypt.compare(plaintText, hashed);
};

const verify = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || authorization.length === 0)
            return res.status(401).send(new UnauthorizedError());
        // console.log(authorization);
        const token = authorization.split(" ");
        // { exp, user, iat }
        const payload = jwt.verify(token[1], "secretkey");
        // console.log(payload);

        const now = Math.floor(Date.now() / 1000);
        if (payload.exp <= now)
            return res.status(401).send(new UnauthorizedError("El token ha expirado"));

        req.user = payload.user;
        next();
    } catch (error) {
        return res.status(401).send(new UnauthorizedError(error.message));
    }
};

module.exports = {
    hash,
    compare,
};
