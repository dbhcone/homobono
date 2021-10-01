export interface AppState {
  readonly cart: { items: []; shipping: number; taxRate: number };
  readonly userObj: { user: { username: string; email: string; role: string } };
}
