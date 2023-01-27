const crypto = require("crypto");

function createHashPassword(password, salt = undefined) {
  const s = salt || crypto.randomBytes(16).toString("hex");
  const p = crypto
    .pbkdf2Sync(
      password,
      s,
      1000,
      64,
      "sha512"
    )
    .toString("hex");

  return `PASS: ${p}\nSALT: ${s}`;
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