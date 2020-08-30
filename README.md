# How to Deploy fantasygoldinfo

fantasygoldinfo is splitted into 3 repos:
* [https://github.com/fantasygold/fantasygold.info](https://github.com/fantasygold/fantasygoldinfo)
* [https://github.com/fantasygold/fantasygoldinfo-api](https://github.com/fantasygold/fantasygoldinfo-api)
* [https://github.com/fantasygold/fantasygoldinfo-ui](https://github.com/fantasygold/fantasygoldinfo-ui)

## Prerequisites

* node.js v12.0+
* mysql v8.0+
* redis v5.0+

## Deploy fantasygold core
1. `git clone --recursive https://github.com/fantasygold/fantasygold-core.git --branch=fantasygoldinfo`
2. Follow the instructions of [https://github.com/FantasyGold/FantasyGold-Core#building-fantasygold-core](https://github.com/FantasyGold/FantasyGold-Core#building-fantasygold-core) to build fantasygold
3. Run `fantasygoldd` with `-logevents=1` enabled

## Deploy fantasygoldinfo
1. `git clone https://github.com/fantasygold/fantasygoldinfo.git`
2. `cd fantasygoldinfo && npm install`
3. Create a mysql database and import [docs/structure.sql](structure.sql)
4. Edit file `fantasygoldinfo-node.json` and change the configurations if needed.
5. `npm run dev`

It is strongly recommended to run `fantasygoldinfo` under a process manager (like `pm2`), to restart the process when `fantasygoldinfo` crashes.

## Deploy fantasygoldinfo-api
1. `git clone https://github.com/fantasygold/fantasygoldinfo-api.git`
2. `cd fantasygoldinfo-api && npm install`
3. Create file `config/config.prod.js`, write your configurations into `config/config.prod.js` such as:
    ```javascript
    exports.security = {
        domainWhiteList: ['http://example.com']  // CORS whitelist sites
    }
    // or
    exports.cors = {
        origin: '*'  // Access-Control-Allow-Origin: *
    }

    exports.sequelize = {
        logging: false  // disable sql logging
    }
    ```
    This will override corresponding field in `config/config.default.js` while running.
4. `npm start`

## Deploy fantasygoldinfo-ui
This repo is optional, you may not deploy it if you don't need UI.
1. `git clone https://github.com/fantasygold/fantasygoldinfo-ui.git`
2. `cd fantasygoldinfo-ui && npm install`
3. Edit `package.json` for example:
   * Edit `script.build` to `"build": "FANTASYGOLDINFO_API_BASE_CLIENT=/api/ FANTASYGOLDINFO_API_BASE_SERVER=http://localhost:3001/ FANTASYGOLDINFO_API_BASE_WS=//example.com/ nuxt build"` in `package.json` to set the api URL base
   * Edit `script.start` to `"start": "PORT=3000 nuxt start"` to run `fantasygoldinfo-ui` on port 3000
4. `npm run build`
5. `npm start`
