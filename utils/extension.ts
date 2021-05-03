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

// Definitely hacky, but a limitation on SDK doesn't allow us to cleanup listeners
let transactionCount = 0;
let onConnectCount = 0;

export const sendTransactionWithExtension = async (
  merchantAddress: string,
  price: number,
): Promise<TransactionResponse> =>
  new Promise((resolve, reject) => {
    transactionCount++;
    const extension = new Extension();
    extension.connect();

    extension.on('onConnect', (w: { address: string }) => {
      if (onConnectCount < transactionCount) {
        const toSend = new MsgSend(w.address, merchantAddress, {
          uusd: price * 1000000, // micro-dollars
        });
        extension.post({
          msgs: [toSend],
          purgeQueue: true,
          waitForConfirmation: true,
          fee: new StdFee(1000000, [new Coin(Denom.USD, 1000000)]),
        });
        onConnectCount++;
      }
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
