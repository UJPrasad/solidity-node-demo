const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
web3.currentProvider.setMaxListeners(300);

const {abi, bytecode} = require('../compile');

let account;
let inbox;

beforeEach(async ()=>{
  //get all accounts
  accounts = await web3.eth.getAccounts();

  //use one to deploy contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({data: bytecode,arguments:['Hi There!']})
    .send({from: accounts[0],gas:'1000000'});
});

describe('Inbox',()=>{
  it('deploys a contract',()=>{
      assert.ok(inbox.options.address);
  });
  it('has a default message',async ()=>{
    const msg = await inbox.methods.message().call();
    assert.equal(msg,'Hi There!');
  });
  it('can set message', async ()=>{
    await inbox.methods.setMessage('Bye').send({from:accounts[0]});
    const msg = await inbox.methods.message().call();
    assert.equal(msg,'Bye');
  });
});
