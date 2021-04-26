#! /usr/bin/env node

const fs = require("fs");
const request = require("request");
const { spawnSync } = require("child_process");

const getEnv = (env, required = true) => {
  if (!required || process.env[env]) {
    return process.env[env];
  } else {
    throw new Error(`$${env} is empty`);
  }
};

const driveInstalled = () => {
  try {
    fs.accessSync("./.gd/credentials.json", fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

try {
  const backupDir = getEnv("ODOO_BACKUP_DIR");
  const database = getEnv("ODOO_DATABASE_NAME");
  const odooUrl = getEnv("ODOO_URL");
  const adminPassword = getEnv("ODOO_ADMIN_PASSWORD");
  const driveDir = getEnv("ODOO_DRIVE_DIR", false);
  const backupName = `${database}.${new Date().toISOString()}.zip`;
  const fullFileName = `${backupDir}/${backupName}`;

  // Create the backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    console.log("Backup directory created");
  }

  // Download backup
  console.log("Downloading backup...");
  new Promise((resolve, reject) => {
    request
      .post(`${odooUrl}/web/database/backup`, {
        form: {
          master_pwd: adminPassword,
          name: database,
          backup_format: "zip",
        },
      })
      .on("error", function (e) {
        reject(`ERROR: ${e.message}`);
      })
      .on("complete", function (err) {
        resolve();
      })
      .pipe(fs.createWriteStream(fullFileName));
  })
    .then(() => {
      console.log("\nBackup downloaded")

      if (driveDir && driveInstalled()) {
        spawnSync("drive", [
          "push",
          "-quiet",
          "-destination",
          driveDir,
          fullFileName,
        ]);
      } else {
        console.log(
          "\nYou can upload your backups to google drive.\
        \ninstall drive using: sudo snap install drive\
        \nand sign in with: drive init"
        );
      }
    })
    .catch((e) => {
      console.log(e);
    });
} catch (e) {
  console.log(`ERROR: ${e.message}`);
}