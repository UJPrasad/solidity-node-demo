const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {abi,bytecode} = require('./compile');

const MNEMONIC = "<<REPLACE WITH YOUR MNEMONIC>>";
const INFURA_API = "<<REPLACE WITH YOUR URL>>";

const provider = new HDWalletProvider(MNEMONIC,INFURA_API);

const web3 = new Web3(provider);
//0xA846DcbCfb726afFe065f4eA17474CFa1eBFCf0F // address of contract
const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();
  console.log(`Trying to deploy from ${accounts[0]}`);

  const result = await new web3.eth.Contract(abi)
    .deploy({data: '0x'+bytecode, arguments: ['Hi There!']})
    .send({from: accounts[0], gas: '1000000'});

  console.log(`Contract deployed to ${result.options.address}`);

}
// deploy();
