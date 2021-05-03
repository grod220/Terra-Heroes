import { Coin, Denom, Extension, MsgSend, StdFee } from '@terra-money/terra.js';
import { Database } from './database';

interface TransactionResponse {
  id: number;
  msgs: string[];
  fee: string;
  origin: string;
  purgeQueue: boolean;
  success: boolean;
  waitForConfirmation: boolean;
  result: {
    gas_used: number;
    gas_wanted: number;
    height: number;
    txhash: string;
    raw_log: string;
    logs: any[];
    fee: { amount: { gas: number } };
    memo: string;
  };
}

interface TransactionRequest {
  address: string;
}

export const sendTransactionWithExtension = async (
  merchantAddress: string,
  price: number,
): Promise<TransactionResponse> =>
  new Promise((resolve, reject) => {
    const extension = new Extension();
    extension.connect();
    const db = new Database();

    extension.on('onConnect', (w: { address: string }) => {
      // Definitely hacky, but a limitation on SDK doesn't allow us to cleanup listeners
      // Reading DB first to ensure transaction has not been made
      console.log(merchantAddress);
      console.log(db.purchaseMadeForAddress(merchantAddress));
      if (db.purchaseMadeForAddress(merchantAddress)) return;

      const toSend = new MsgSend(w.address, merchantAddress, {
        uusd: price * 1000000, // micro-dollars
      });
      extension.post({
        msgs: [toSend],
        purgeQueue: true,
        waitForConfirmation: true,
        fee: new StdFee(1000000, [new Coin(Denom.USD, 1000000)]),
      });
    });

    extension.on((payload: TransactionResponse | TransactionRequest) => {
      if (!('id' in payload)) return;
      if (payload.success) {
        resolve(payload);
      } else {
        reject(payload);
      }
    });
  });
