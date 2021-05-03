import { NextApiRequest, NextApiResponse } from 'next';
import { Denom, LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { Numeric } from '@terra-money/terra.js/dist/core/numeric';

const terraTestnet = new LCDClient({
  URL: 'https://tequila-lcd.terra.dev',
  chainID: 'tequila-0004',
  gasAdjustment: 2,
});

export interface PurchaseStatusResponse {
  usdTotal: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address } = req.query;
    const tRes = await terraTestnet.auth.accountInfo(address as string);
    const amount = tRes.coins.get(Denom.USD)?.amount.toString();
    res.status(200).send({ usdTotal: amount || 0 } as PurchaseStatusResponse);
  } catch (e) {
    console.log(e);
    res.status(500).send(`Exception: ${e}`);
  }
};
