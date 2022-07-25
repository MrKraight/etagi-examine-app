const bcrypt = require('bcrypt');

module.exports = {
    passwordEncrypt: async (pw) => {
        const encrPw = await bcrypt.hash(pw, 10);
        return encrPw;
    }
}