export enum PurchaseState {
  STARTED,
  COMPLETED,
  ERROR,
}

interface PurchaseModel {
  cartId: string;
  heroId: number;
  merchantTerraAddress: string;
  customerName: string;
  state: PurchaseState;
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
}
