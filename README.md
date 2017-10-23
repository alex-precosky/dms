# Dead Man's Switch

This is a simple project implementing Dead Man's Swtich at Ethereum Blockchain for the event Decentralized Database Hackathon promoted by BLUZELLE at Launch Academy, Vancouver BC.

## Our Team

* Alex Precosky (precosky@mac.com)
* Anthony Tsui (anthony.tsui@gmail.com)
* Bassem El-Remesh (bassem.remesh@gmail.com)
* Erik Ryhorchuk (welsh4568@gmail.com)
* Gustavo Nobrega (gustavofn@gmail.com)
* Phillip B (phillipb163@gmail.com)

## What it is?

A dead man's switch is a switch that is automatically operated if the human operator becomes incapacitated, such as through death, loss of consciousness, or being bodily removed from control. Originally applied to switches on a vehicle or machine, it has since come to be used to describe other intangible uses like in computer software.

Software versions of dead man's switches are generally only used by people with technical expertise, and can serve several purposes; such as sending a notification to friends or deleting and encrypting data. The "non-event" triggering these can be almost anything, such as failing to log in for 7 consecutive days, not responding to an automated e-mail, ping, a GPS-enabled telephone not moving for a period of time, or merely failing to type a code within a few minutes of a computer's boot. An example of a software based dead man's switch is a Dead Man's Switch which starts when the computer boots up and can encrypt or delete user specified data if an unauthorised user should ever gain access to the protected computer. Google's Inactive Account Manager allows the account holder to nominate someone else to access their services if not used for an extended period.

Source: https://en.wikipedia.org/wiki/Dead_man%27s_switch

## How it will work here?

Basically we created an smart contract on Ethereum Blockchain that a trustor will attach a secret information and sign the contract with his private key. This contract will expire eventually in some point of time in future. The trustor have to interact with our dApp to inform he is alive and so his secret remains protect. If in case the trustor do not interact with the dApp we assume he's dead so the smart contract will expire. In that event, anyone with the trustor public address can recover his secret.

### Flowchart

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

## Screenshots

 ![Creating an entry in the smart contract](https://github.com/alex-precosky/dms/blob/master/screenshots/create.jpg)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

