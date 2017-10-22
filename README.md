# Dead Man's Switch

This is a simple project implementing Dead Man's Swtich at Ethereum Blockchain for the event Decentralized Database Hackathon promoted by BLUZELLE at Launch Academy, Vancouver BC.

## Our Team

Anthony Tsui (anthony.tsui@gmail.com)
Erik Cartman (welsh4568@gmail.com)
Alex Precosky (precosky@mac.com)
Bassem El-Remesh (bassem.remesh@gmail.com)
Phillip B (phillipb163@gmail.com)
Gustavo Nobrega (gustavofn@gmail.com)

## Our objective

TODO

## Flowchart

![Dead Man's Switch Flowchart](https://github.com/deadmenswitch/dms/blob/master/flowchart/dms_flowchart.png?raw=true)

## Requirements

Node.js version +5

## Installation

Install testrpc and truffle
```
npm install -g ethereumjs-testrpc
npm install -g truffle
```

Then clone this project and install the node dependencies
```
git clone https://github.com/deadmenswitch/dms.git
cd dms
npm install
```

Open a second terminal window and execute testrpc and leave the window opened. At this point you should copy the mnemonic seed and configure your Metamask to access the accounts.
```
testrpc
```

At the first terminal window, where you ran npm install, execute the following commands. It will compile the smart contract and migrate to our blockchain
```
truffle compile
truffle migrate
```

If everthing went well (you can see a few log lines at testrpc output) you can start the dApp
```
npm run dev
```

Now you should see these following lines
```
Project is running at http://localhost:8080/
...
webpack: Compiled successfully.
```

Go to your web browser and access the accress http://localhost:8080/create.html to create and deploy the smart contract.
 
Done!
