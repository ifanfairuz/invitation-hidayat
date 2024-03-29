export const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const formatTanggal = (
  val: string | number | Date,
  short: boolean = false
) => {
  const d = new Date(val);
  return short
    ? `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    : `${d.getDate()} ${
        MONTHS[d.getMonth()]
      } ${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}`;
};

export const translatePhone = (phone: string) => {
  let res = phone.trim();
  let prefix = res.charAt(0) === "+" || res.match(/^62/g) ? "+" : "";
  res = res.replaceAll(/[^0-9]/g, "");
  if (res.charAt(0) == "0") {
    res = "+62" + res.substring(1);
  }
  res = prefix + res;
  return res.substring(0, 15).trim();
};

export const templateWA = (
  link: string
) => `Assalamualaikum warahmatullahi wabarakatuh.

Bersama dengan undangan ini, saya turut mengundang Bapak/Ibu untuk hadir di acara pernikahan dan khitanan anak kami.

${link}

Demikian undangan dari kami, yang sedang berbahagia.
Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a restu.

Wassalamualaikum warahmatullahi wabarakatuh.`;

export const genLinkInvitation = (username: string, host: string = "") =>
  `${host}/hidayatjendelalangit?name=${username}`;

export const genLinkWA = (wa: string, username: string, host: string) =>
  `https://wa.me/${wa}?text=${encodeURI(
    templateWA(genLinkInvitation(username, host))
  )}`;
