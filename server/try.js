const crypto = require("crypto");

const list = crypto.randomBytes(32).toLocaleString("hex");

console.log(list);
