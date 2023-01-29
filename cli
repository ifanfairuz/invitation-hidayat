const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function createHashPassword(password, salt = undefined) {
  const s = salt || crypto.randomBytes(16).toString("hex");
  const p = crypto.pbkdf2Sync(password, s, 1000, 64, "sha512").toString("hex");

  return `RAW: ${password}\nPASS: ${p}\nSALT: ${s}`;
}

async function generatePhone(filename, invitationId = 1) {
  const file = path.join(__dirname, filename);
  const vcf = fs.readFileSync(file, { encoding: "utf-8" }).toString();
  const items = vcf.split("END:VCARD").filter((i) => !!i);

  function translatePhone(phone) {
    let res = phone.trim();
    let prefix = res.charAt(0) === "+" || res.match(/^62/g) ? "+" : "";
    res = res.replaceAll(/[^0-9]/g, "");
    if (res.charAt(0) == "0") {
      res = "+62" + res.substring(1);
    }
    res = prefix + res;
    return res.substring(0, 15).trim();
  }

  const contacts = items.map((i) => {
    const raw = i
      .replace(/\n?^BEGIN:VCARD\n/gm, "")
      .replace(/^VERSION:\S+\n/gm, "")
      .replace(/^N:[a-zA-Z0-9_\'\" ;]+$\nFN:/gm, "")
      .replace(/^\d+:\S+\n/gm, "")
      .replace(/item[0-9].[a-zA-Z0-9_\-:; ]+$\n/gm, "")
      .replace(/\n\n/gm, "")
      .split("\n");
    const rawWA =
      raw.length > 1 ? raw[1].match(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g) : null;
    const wa = translatePhone(rawWA ? rawWA[1] : "");
    return { name: raw[0], wa };
  });

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  const getTamuByUsername = (username) =>
    prisma.tamu.findFirst({ where: { username } });
  const nameToUsername = (text) => {
    const slug = text
      .toString()
      .toLowerCase()
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .replace(/\s+/g, "-")
      .replace(/\-\-+/g, "-")
      .replace(/[^\w\-]+/g, "");
    return getTamuByUsername(slug).then((user) =>
      !!user ? nameToUsername(slug + Math.random()) : slug
    );
  };

  const tamu = await Promise.all(
    contacts.map(
      (c) =>
        new Promise(async (cb) => {
          cb({
            ...c,
            username: await nameToUsername(c.name),
            alamat: "",
            sent: false,
            invitationId,
          });
        })
    )
  );

  console.log(`generated ${tamu.length} contacts`);
  const inserted = await prisma.tamu.createMany({ data: tamu });
  console.log(`inserted ${inserted.count} tamu`);

  return "OK";
}

const HANDLER = {
  pass: {
    gen: async (password) => console.log(await createHashPassword(password)),
  },
  tamu: {
    genfromvcf: async (file) => console.log(await generatePhone(file)),
  },
};

try {
  let args = [...process.argv].slice(2);
  let task = args.shift().split(":");
  let group = task.shift();
  let subgroup = task.shift();

  HANDLER[group][subgroup](...args);
} catch (error) {
  console.error(error);
}
