// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import DMSContract_artifacts from '../../build/contracts/DMSContract.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var DMSContract = contract(DMSContract_artifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function () {
    DMSContract.setProvider(web3.currentProvider);
  },

  readMessage: function () {

    var self = this;
    var sender = document.getElementById("sender");

    self.getLastHeartbeat(sender);
    self.getMessage(sender);
    
  },

  setStatus: function (message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  getLastHeartbeat: function (sender) {
    var self = this;
    var DMS;
    var heatbeat_time_element = document.getElementById("heartbeat");

    DMSContract.deployed().then(function (instance) {
      DMS = instance;
      return DMS.getExpirationTime.call(sender);
    }).then(function (value) {
      // @TODO convert unix timestamp to human time
      lastHeartbeat = new Date( value * 1000 )
      heatbeat_time_element = document.getElementById("heartbeat");
      heatbeat_time_element.value = lastHeartbeat.format("dd.mm.yyyy hh:MM:ss");;
    }).catch(function (e) {
      console.log(e);
      self.setStatus(e);
    });
  },

  getMessage: function () {
    var self = this;
    var DMS;
    var message_element = document.getElementById("message");

    DMSContract.deployed().then(function (instance) {
      DMS = instance;
      return DMS.getDataFromAddress.call();
    }).then(function (value) {
      message_element.innerHTML = web3.toAscii(value.valueOf());
    }).catch(function (e) {
      console.log(e);
      self.setStatus(e);
    });
  },
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
