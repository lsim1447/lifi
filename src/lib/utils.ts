import { Token } from '@/types/token';

export const getUniqueIdentifier = (token: Token): string => {
  return `${token.address}-${token.chainId}`;
};
