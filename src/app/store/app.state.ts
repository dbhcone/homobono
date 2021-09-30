export interface AppState {
  readonly cart: { items: []; shipping: number; taxRate: number };
  readonly user: { username: string };
}
