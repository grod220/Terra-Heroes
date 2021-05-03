import { NextApiRequest, NextApiResponse } from 'next';
import { LCDClient, MnemonicKey } from '@terra-money/terra.js';

const terraTestnet = new LCDClient({
  URL: 'https://tequila-lcd.terra.dev',
  chainID: 'tequila-0004',
  gasAdjustment: 2,
});

export interface MerchantAddressResponse {
  merchantTerraAddress: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mk = new MnemonicKey();
    const wallet = terraTestnet.wallet(mk);
    res.status(200).send({ merchantTerraAddress: wallet.key.accAddress } as MerchantAddressResponse);
  } catch (e) {
    res.status(500).send(`Exception: ${e}`);
  }
};
