export interface PurchaseModel {
  heroId: number;
  terraAddress: string;
  customerName: string;
  requestedLocation: string;
}

const TERRA_HEROES_DB = 'terra_heroes_db';

export class Database {
  savePurchase(purchase: PurchaseModel) {
    if (!localStorage.getItem(TERRA_HEROES_DB)) {
      localStorage.setItem(TERRA_HEROES_DB, JSON.stringify([]));
    }
    const currentPurchases: PurchaseModel[] = JSON.parse(localStorage.getItem(TERRA_HEROES_DB));
    currentPurchases.push(purchase);
    localStorage.setItem(TERRA_HEROES_DB, JSON.stringify(currentPurchases));
  }

  getPurchases(): PurchaseModel[] {
    if (!global.window) return [];
    return JSON.parse(localStorage.getItem(TERRA_HEROES_DB)) || [];
  }

  purchaseMadeForAddress(address: string): boolean {
    const purchases = this.getPurchases();
    const res = purchases.find((p) => p.terraAddress === address);
    return Boolean(res);
  }
}
