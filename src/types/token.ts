export interface Token {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI?: string;
  priceUSD: string;
  isFavorite?: boolean;
}
