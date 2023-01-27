const crypto = require("crypto");

function createHashPassword(password, salt = undefined) {
  return crypto
    .pbkdf2Sync(
      password,
      salt || crypto.randomBytes(16).toString("hex"),
      1000,
      64,
      "sha512"
    )
    .toString("hex");
}

const HANDLER = {
  pass:{
    gen: (password) => console.log(createHashPassword(password || 'admin'))
  }
}

try {
  let args = [...process.argv].slice(2);
  let task = args.shift().split(":");
  let group = task.shift();
  let subgroup = task.shift();

  HANDLER[group][subgroup](...args);

} catch (error) {
  console.error(error);
}