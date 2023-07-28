type MyWallet = {
  address: string;
  mnemonic: string;
  privateKey: `0x{string}`;
};
export const DRAWORDS_ACCOUNT = "drawords_account";

export const mockInitAccount = async (): Promise<MyWallet> => {
  const myWallet = {
    address: "0xE5452F7831245e0a3e6Be9afA8858d9E6c17ad7A",
    mnemonic:
      "mean gallery couch scorpion stay upper thought camera siren place abandon icon",
    privateKey:
      "0x55d204228d1b4f5d6bfe0d3e1110933ca3bf66b7d22709313a5270b00c4ce9f5" as `0x{string}`,
  } as MyWallet;
  return myWallet;
};

export const initAccount = async (): Promise<MyWallet> => {
  const ethers = require("ethers");
  const wallet = ethers.Wallet.createRandom();
  const myWallet = {
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  } as MyWallet;

  await chrome.storage.local.set({ drawords_account: myWallet });
  return myWallet;
};

export const getLocalAccount = async (): Promise<MyWallet | undefined> => {
  const stg = await chrome.storage.local.get([DRAWORDS_ACCOUNT]);
  return stg.drawords_account;
};
