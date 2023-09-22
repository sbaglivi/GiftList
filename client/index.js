const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const tree = new MerkleTree(niceList);

  const ourIndex = Math.floor(Math.random() * niceList.length);
  const proof = tree.getProof(ourIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name: niceList[ourIndex]
  });

  console.log({ gift });
}

main();