# How to deploy fantasygoldinfo and fantasygoldinfo-ui

## Prerequisites

* node.js v10.5+
* mongodb v4.0+

## Deploy fantasygold core

1. `git clone --recursive https://github.com/fantasygold/fantasygold-core.git`
2. Follow the instructions [Located Here](https://github.com/FantasyGold/fantasygold-core#building-fantasygold-core) to build fantasygold
3. Run `fantasygoldd` with `-logevents=1` enabled

## Deploy fantasygoldinfo

1. `git clone https://github.com/FantasyGold/fantasygoldinfo.git && cd fantasygoldinfo`
2. `npm install`
3. `mkdir packages/explorer` (you may change the directory name) and write files `package.json` and `fantasygoldinfo-node.json` to it

    ```json
    // package.json
    {
        "name": "explorer-mainnet",
        "private": true,
        "scripts": {
            "start": "fantasygoldinfo-node start"
        },
        "dependencies": {
            "fantasygoldinfo-api": "^0.0.1",
            "fantasygoldinfo-node": "^0.0.1",
            "fantasygoldinfo-ws": "^0.0.1"
        }
    }
    ```

    ```json
    // fantasygoldinfo-node.json
    {
        "chain": "mainnet",
        "port": 3001,
        "datadir": "/absolute/path/to/fantasygoldinfo/packages/explorer/data",
        "services": [
            "fantasygoldinfo-api",
            "fantasygoldinfo-ws",
            "address",
            "balance",
            "block",
            "contract",
            "db",
            "header",
            "mempool",
            "p2p",
            "transaction",
            "web"
        ],
        "servicesConfig": {
            "db": {
            "mongodb": {
                "url": "mongodb://localhost:27017/",
                "database": "fantasygoldinfo-mainnet"
            },
            "rpc": {
                "protocol": "http",
                "host": "localhost",
                "port": 57810,
                "user": "user",
                "password": "password"
            }
            },
            "p2p": {
            "peers": [
                {
                    "ip": {
                        "v4": "127.0.0.1"
                    },
                    "port": 57814
                }
            ]
            },
            "fantasygoldinfo-ws": {
                "port": 3002
            }
        }
    }
    ```

4. `npm run lerna bootstrap`
5. run `npm start` in `packages/explorer` directory

## Deploy fantasygoldinfo-ui

1. `git clone https://github.com/FantasyGold/fantasygoldinfo-ui.git && cd fantasygoldinfo-ui` is this supposed to say ui?
2. `npm install` \
    You may modify `package.json` as follows:
    * rewrite `script.build` to `"build": "FANTASYGOLDINFO_API_BASE_CLIENT=/api/ FANTASYGOLDINFO_API_BASE_SERVER=http://localhost:3001/fantasygoldinfo-api/ FANTASYGOLDINFO_API_BASE_WS=//example.com/ws/ nuxt build"` in `package.json` to set the api URL base
    * rewrite `script.start` to `"start": "PORT=12345 nuxt start"` to frontend on port 12345
3. `npm run build`
4. `npm start`
