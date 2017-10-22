// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import DMSContract_artifacts from '../../build/contracts/DMSContract.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var DMSContract = contract(DMSContract_artifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function () {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);
    DMSContract.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      var timeleft_element = document.getElementById("timeleft");
      timeleft_element.innerHTML = "(Accessing...) ";
      self.refreshTimeLeft();
    });
  },

  setStatus: function (message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshTimeLeft: function () {
    var self = this;
    var DMS;
    var timeleft_element = document.getElementById("timeleft");


    DMSContract.deployed().then(function (instance) {
      DMS = instance;
      timeleft_element.innerHTML = "hi";
      return DMS.getExpirationTime.call();
    }).then(function (value) {
      var timeleft_element = document.getElementById("timeleft");
      timeleft_element.innerHTML = value.valueOf();
    }).catch(function (e) {
      console.log(e);
      self.setStatus(e);
    });

  },



  tick: function () {
    var self = this;

    var DMS;
    DMSContract.deployed().then(function (instance) {
      DMS = instance;
      return DMS.tick({ from: account });
    }).then(function () {
      self.setStatus("Tick complete!");
      self.refreshTimeLeft();
    }).catch(function (e) {
      console.log(e);
      self.setStatus(e);
    });


  },


  kick: function () {
    var self = this;

    var DMS;
    DMSContract.deployed().then(function (instance) {
      DMS = instance;
      return DMS.kick(Date.now() + 30, { from: account });
    }).then(function () {
      self.setStatus("Kick complete!");
      self.refreshTimeLeft();
    }).catch(function (e) {
      console.log(e);
      self.setStatus(e);
    });


  },

  updateDeathContract: function () {
    var self = this;

    var beneficiary = document.getElementById("beneficiary").value;
    var data = document.getElementById("data").value;

    var dms;

    DMSContract.deployed().then(function (instance) {
      dms = instance;
      return dms.CreateDMSContract(beneficiary, data, Date.now(), { from: account });
    }).then(function () {
      self.setStatus("Transaction complete!");

    }).catch(function (e) {
      console.log(e);
      self.setStatus(e);
    });
  },

  readMessage: function () {
    console.log("readmessage");
    var self = this;
    var sender = document.getElementById("sender").value;

    self.getLastHeartbeat(sender);
    self.getMessage(sender);

  },

  getMessage: function (sender) {
    var self = this;
    var DMS;
    var message_element = document.getElementById("message");
    console.log("getMessage for " + sender);
    DMSContract.deployed().then(function (instance) {
      DMS = instance;
      console.log("resolved contract instance getMessage");
      return DMS.getDataFromAddress.call(sender);
    }).then(function (value) {
      console.log("resolved getDataFromAddress");
      message_element.innerHTML = web3.toAscii(value.valueOf());
    }).catch(function (e) {
      console.log("catch getDataFromAddress");
      console.log(e);
      self.setStatus(e);
      message_element.innerHTML = "Your friend is not dead yet";
    });
  },

  getLastHeartbeat: function (sender) {
    var self = this;
    var DMS;
    var heatbeat_time_element = document.getElementById("heartbeat");
    console.log("getLastHeartbeat for " + sender);
    DMSContract.deployed().then(function (instance) {
      console.log("getLastHeartbeat resolved contract instance");
      DMS = instance;
      return DMS.getExpirationTime.call(sender);
    }).then(function (value) {
      console.log("resolved getExpirationTime " + value);
      var lastHeartbeat = new Date(value * 1000);
      console.log(lastHeartbeat);
      heatbeat_time_element.innerHTML = lastHeartbeat.toString();;
    }).catch(function (e) {
      heatbeat_time_element.innerHTML = "Entry not found";
      console.log("catch getExpirationTime");
      console.log(e);
      self.setStatus(e);
    });
  },

  sendCoin: function () {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    MetaCoin.deployed().then(function (instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, { from: account });
    }).then(function () {
      self.setStatus("Transaction complete!");

    }).catch(function (e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};



window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
