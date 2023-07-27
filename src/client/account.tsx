type MyWallet = {
  address: string;
  mnemonic: string;
  privateKey: `0x{string}`;
};
export const DRAWORDS_ACCOUNT = "drawordsAccount";

export const initAccount = async (): Promise<MyWallet> => {
  const ethers = require("ethers");
  const wallet = ethers.Wallet.createRandom();
  const myWallet = {
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  } as MyWallet;
  console.log("init account", myWallet);

  await chrome.storage.local.set({ drawordsAccount: myWallet });
  return myWallet;
};

export const getLocalAccount = async (): Promise<MyWallet | undefined> => {
  const stg = await chrome.storage.local.get([DRAWORDS_ACCOUNT]);
  return stg.drawordsAccount;
};
