import React, { useMemo, useState } from 'react';

export interface TokenFilterInterface {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  resetAllFilters: () => void;
}

export interface TokenFilterProviderProps {}

const TokenFilterContext = React.createContext<TokenFilterInterface>(
  {} as TokenFilterInterface
);
TokenFilterContext.displayName = 'Token Filter';

const TokenFilterProvider = ({
  ...props
}: React.PropsWithChildren<TokenFilterProviderProps>) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const resetAllFilters = () => {
    setSearchTerm('');
  };

  const memoValue = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      resetAllFilters,
    }),
    [searchTerm, setSearchTerm]
  );

  return <TokenFilterContext.Provider value={memoValue} {...props} />;
};

function useTokenFilter() {
  return React.useContext(TokenFilterContext);
}

export { TokenFilterProvider, useTokenFilter };
