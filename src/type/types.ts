export interface InitialState {
  listIcons: Icon[];
  currentIcons: Icon[];
  loader: boolean;
  error: boolean;
}

export interface Icon {
  id: string;
  symbol: string;
  name: string;
}
