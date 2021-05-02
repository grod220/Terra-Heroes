import { LCDClient, MnemonicKey, MsgSend } from '@terra-money/terra.js';
import { CUSTOMER_TERRA_ADDRESS, SERVER_WALLET_MNEMONIC } from './constants';

const terraTestnet = new LCDClient({
  URL: 'https://tequila-lcd.terra.dev',
  chainID: 'tequila-0004',
  // gasPrices: { uusd: 10 },
  gasAdjustment: 2,
});

const mk = new MnemonicKey({ mnemonic: SERVER_WALLET_MNEMONIC });

const wallet = terraTestnet.wallet(mk);

console.log(wallet.key.accAddress);

const send = new MsgSend(wallet.key.accAddress, CUSTOMER_TERRA_ADDRESS, { uusd: 11312029 });

wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'test from terra-x-men',
  })
  .then((tx) => terraTestnet.tx.broadcast(tx))
  .then((result) => {
    console.log(`TX hash: ${JSON.stringify(result)}`);
  })
  .catch(console.log);
