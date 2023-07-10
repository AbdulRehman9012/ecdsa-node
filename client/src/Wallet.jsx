import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privatekey, setprivatekey}) {
  async function onChange(evt) {
    const privatekey = evt.target.value;
    setprivatekey(privatekey);
    const publickey=secp.secp256k1.getPublicKey(privatekey);
    const address=toHex(keccak256(publickey.slice(1)).slice(-20));
    setAddress(address);
    console.log(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type your private key" value={privatekey} datatype="Hex" onChange={onChange}></input>
      </label>

      <div>
        Address:{"\n"}
        {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
