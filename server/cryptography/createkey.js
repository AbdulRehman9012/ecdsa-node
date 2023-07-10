const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privatekey= secp.secp256k1.utils.randomPrivateKey();
console.log(toHex(privatekey));
const publickey=secp.secp256k1.getPublicKey(privatekey);
function getAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20);
}
console.log(toHex(getAddress(publickey)));
