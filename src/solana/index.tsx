import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import React from 'react';
import { toast } from 'react-toastify';

let cluster;
let connection: Connection;
export let wallet: Wallet;

export type Wallet = {
  signAndSendTransaction: (t: Transaction) => { signature: string };
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  publicKey: PublicKey;
  on: any;
  isPhantom: boolean;
  isSolflare: boolean;
  signTransaction: (t: Transaction) => Transaction;
};

export function getWallet() {
  return wallet;
}

export const initSol = () => {
  cluster =
    process.env.REACT_APP_SOLANA_CLUSTER || 'https://api.devnet.solana.com'; //'https://api.mainnet-beta.solana.com/';
  connection = new Connection(cluster, 'confirmed');
};

export enum WalletType {
  Phantom,
  Solflare,
}

export const initWallet = (
  walletType: WalletType,
  callback: (isConnected: boolean, walletAddress: string) => void
) => {
  switch (walletType) {
    case WalletType.Phantom:
      if (window.solana?.isPhantom) {
        wallet = window.solana;
      } else {
        toast.error('Phantom is not installed');
      }
      break;
    case WalletType.Solflare:
      if (window.solflare?.isSolflare) {
        wallet = window.solflare;
      } else {
        toast.error('Solflare is not installed');
      }
      break;
  }

  wallet.on('connect', () => {
    callback(wallet.isConnected, wallet.publicKey.toString());
  });

  wallet.on('disconnect', () => {
    callback(wallet.isConnected, '');
  });
};

export async function checkWallet() {
  if (!wallet) {
    toast.warn('Please connect your wallet');
    return false;
  }

  if (!wallet.isConnected) {
    await wallet.connect();

    if (!wallet.isConnected) {
      return false;
    }
  }

  return true;
}

export async function sendSolToWallet(sol: number) {
  const isWalletConnected = await checkWallet();

  if (!isWalletConnected) {
    throw new Error('Wallet not connected');
  }

  if (!process.env.REACT_APP_WALLET_ADDRESS) {
    throw new Error('Wallet address is not provided');
  }

  const transferSol = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: new PublicKey(process.env.REACT_APP_WALLET_ADDRESS),
    lamports: LAMPORTS_PER_SOL * sol,
  });

  const transaction = await setPayerAndBlockhashTransaction([transferSol]);

  let signature;

  if (wallet.isPhantom) {
    signature = (await wallet.signAndSendTransaction(transaction)).signature;
  } else {
    const signedTransaction = await wallet.signTransaction(transaction);
    signature = await connection.sendRawTransaction(
      signedTransaction.serialize()
    );
  }

  toast.info(
    <>
      <a
        href={'https://explorer.solana.com/tx/' + signature}
        style={{ color: '#8540df' }}
        target="_blank"
      >
        Transaction
      </a>{' '}
      sent
    </>
  );

  await connection.confirmTransaction(signature);

  toast.success(
    <>
      <a
        href={'https://explorer.solana.com/tx/' + signature}
        style={{ color: '#8540df' }}
        target="_blank"
      >
        Transaction
      </a>{' '}
      confirmed!
    </>
  );
  return signature;
}

export async function setPayerAndBlockhashTransaction(
  instructions: TransactionInstruction[]
) {
  const transaction = new Transaction();
  instructions.forEach((element) => {
    transaction.add(element);
  });
  transaction.feePayer = wallet.publicKey;
  const hash = await connection.getRecentBlockhash();
  transaction.recentBlockhash = hash.blockhash;
  return transaction;
}
