const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

exports.getDb = async () => {
  let res = await readFile("./db.json", "utf8");
  return JSON.parse(res);
};

exports.serveDb = async (data) => {
  let res = JSON.stringify(data);
  return await writeFile("./db.json", res);
};
