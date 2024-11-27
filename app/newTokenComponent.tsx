"use client";

import { getContract, Address } from "viem";
import { newContractAbi } from "./abi";
import { ConnectWalletClient } from "./client";
import { useState } from "react";

export default function NewTokenComponent() {
  const [contractAddress, setContractAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);
  const walletClient = ConnectWalletClient();

  async function handleButtonClick() {
    const checkedAddress = contractAddress as Address;
    const contract = getContract({
      address: checkedAddress,
      abi: newContractAbi,
      client: walletClient,
    });

    console.log("Connected to Contract: ", contract);

    // Вызов методов контракта
    const symbol = await contract.read.symbol();
    const name = await contract.read.name();

    console.log(`Symbol: ${symbol}\nName: ${name}`);

    const wallet = walletAddress as Address;
    const balance = await contract.read.balanceOf([wallet]);

    alert(`Symbol: ${symbol}\nName: ${name}\nBalance: ${balance}`);
  }

  return (
    <div className="card">
      <label>
        Contract Address:
        <input
          placeholder="Smart Contract Address"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        />
      </label>
      <br />
      <label>
        Wallet Address:
        <input
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={setValue(setWalletAddress)}
        />
      </label>
      <br />
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center"
        onClick={handleButtonClick}
      >
        <h1 className="text-center">Fetch Token Info</h1>
      </button>
    </div>
  );
}