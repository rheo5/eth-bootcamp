const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils.js");
const { keccak256 } = require("ethereum-cryptography/keccak.js");

const { JSONBig } = require("json-bigint");

app.use(cors());
app.use(express.json());

const balances = {
  //private key : e688c853879be40d46f25e3dcf0899161a75c306a4744bcd930ebdc98f160154
  "024368924464e87fb9388d140a2b60fe7fcef9aa1af62e34c9e17a9320c826bb5d": 100,
  //private key : 909ccd7853c09e23284c56c22e07e39d9c09293ce06431c4710d3570ab49de13
  "02253bdb3c19d58b3785deabc7bd69646400749014ab4e8c0a934bb594b6d66485": 50, 
  //private key : 503ee9bebd22810b380d5b7e48c94989811dc9447fd9f1a8a5828dc11f8db056
  "0359c072fa0c220bd718635836b355110ac02b0d5477a25d205276f3b443f3960f": 75, 
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send-tools", (req, res) => {
  //TODO : make signature

  const {amount, recipient, privateKey } = req.body;

  let message = utf8ToBytes(recipient + amount); //recipient + amount in string
  let messageHash = keccak256(message);

  const signature = secp256k1.sign(messageHash, privateKey);

  res.send(
    {
      // r : JSON.stringify(JSONBig.parse(signature.r)),
      // s : JSON.stringify(JSONBig.parse(signature.s)),
      r : signature.r.toString(),
      s : signature.s.toString(),
      recovery : signature.recovery
    }
  );
});

app.post("/send", (req, res) => {

  const {sender, amount, recipient, signature } = req.body;

  let message = utf8ToBytes(recipient + amount); //recipient + amount in string
  let messageHash = keccak256(message);

  const isSigned = secp256k1.verify(signature, messageHash, sender);

  if (isSigned == false) {
    res.status(400).send({ message: "Incorrect signature" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } 
  else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
