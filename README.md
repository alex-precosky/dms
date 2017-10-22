# Dead Man's Switch project to 

This is a simple project implementing Dead Man's Swtich at Ethereum Blockchain for the event Decentralized Database Hackathon promoted by BLUZELLE at Launch Academy, Vancouver BC.

## Our Team:

Anthony Tsui (anthony.tsui@gmail.com)
Erik Cartman (welsh4568@gmail.com)
Alex Precosky (precosky@mac.com)
Bassem El-Remesh (bassem.remesh@gmail.com)
Phillip B (phillipb163@gmail.com)
Gustavo Nobrega (gustavofn@gmail.com)

## Our objective:

TODO



## Requirements

Node.js version +5

## Installation

Install testrpc
```
npm install -g ethereumjs-testrpc
```

git clone https://github.com/deadmenswitch/dms.git
cd dms
npm install

In another terminal window, run:
testrpm

truffle compile
truffle migrate
npm run dev

## Building and the frontend

1. First run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `npm run dev` to build the app and serve it on http://localhost:8080

## Possible upgrades

* Use the webpack hotloader to sense when contracts or javascript have been recompiled and rebuild the application. Contributions welcome!

## Common Errors

* **Error: Can't resolve '../build/contracts/MetaCoin.json'**

This means you haven't compiled or migrated your contracts yet. Run `truffle compile` and `truffle migrate` first.

Full error:

```
ERROR in ./app/main.js
Module not found: Error: Can't resolve '../build/contracts/MetaCoin.json' in '/Users/tim/Documents/workspace/Consensys/test3/app'
 @ ./app/main.js 11:16-59
```
