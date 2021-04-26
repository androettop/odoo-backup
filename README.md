[![npm version](https://badge.fury.io/js/odoo-backup.svg)](https://badge.fury.io/js/odoo-backup)
[![GitHub version](https://badge.fury.io/gh/androettop%2Fodoo-backup.svg)](https://badge.fury.io/gh/androettop%2Fodoo-backup)
# Installation

### With yarn 
```
yarn global add odoo-backup
```

### With npm 
```
npm i -g odoo-backup
```

# Usage

You need to set the following enviroment variables before running odoo-backup.

| Variable            | Description                                            | Example           |
|---------------------|--------------------------------------------------------|-------------------|
| ODOO_BACKUP_DIR     | Directory where the backups will be saved              | ~/backups         |
| ODOO_URL            | The odoo instance URL                                  | http://localhost/ |
| ODOO_DATABASE_NAME  | The odoo database name                                 | odoo              |
| ODOO_ADMIN_PASSWORD | The odoo master password                               | odoo              |
| ODOO_DRIVE_DIR      | Google drive directory where the backups will be saved | /backups          |

Then run:

```
odoo-backup
```