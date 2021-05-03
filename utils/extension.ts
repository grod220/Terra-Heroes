import { Coin, Denom, Extension, MsgSend, StdFee } from '@terra-money/terra.js';

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

    extension.on('onConnect', (w: { address: string }) => {
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
