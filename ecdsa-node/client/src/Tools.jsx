import server from "./server";

import React, { useState } from "react";

function Tools() {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function tools(evt) {
    evt.preventDefault();

    try {
      const signature = await server.post(`send-tools`, {
        amount: parseInt(sendAmount),
        recipient,
        privateKey,
      });
      console.log(signature);
      alert(
        "r : " + signature.data.r +
        "s : " + signature.data.s +
        "recovery    : " + signature.data.recovery
        );
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container tools" onSubmit={tools}>
      <h1>Send Transaction</h1>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Private Key
        <input
          placeholder="Private Key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>
      <input type="submit" className="button" value="Tools" />
    </form>
  );
}

export default Tools;
