const path = require('path');
const fs = require('fs');

const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');

const source = fs.readFileSync(inboxPath,'utf8');
var input = {
    language: 'Solidity',
    sources: {
        'Inbox': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

var compiled = solc.compile(JSON.stringify(input));

compiled = JSON.parse(compiled);

module.exports = {abi: compiled.contracts.Inbox.Inbox.abi, bytecode: compiled.contracts.Inbox.Inbox.evm.bytecode.object};
