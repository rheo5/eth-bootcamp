import React, { useState } from 'react';
import Wallet from './Wallet';
import Transfer from './Transfer';

function HomePage() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      {/* LHS */}
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      {/* RHS */}
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default HomePage;