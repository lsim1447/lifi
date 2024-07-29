import { Token } from '@/types/token';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getUniqueIdentifier = (token: Token): string => {
  return `${token.address}-${token.chainId}`;
};
