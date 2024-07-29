import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Tabs } from '@/components/Tabs';
import { TokenList, TokenListLoadingPlaceholder } from '@/components/TokenList';
import { TokenFilter } from '@/components/TokenFilter';
import { device } from '@/lib/device';
import { FAVORITE_TOKENS_CACHE_KEY } from '@/lib/constants';
import { fetcher, getUniqueIdentifier } from '@/lib/utils';
import { Token } from '@/types/token';
import { useTokenFilter } from '@/contexts/TokenFilterContext';
import useSWR from 'swr';

const OverviewPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  const { searchTerm, setSearchTerm } = useTokenFilter();
  const { data, error } = useSWR<{ tokens: Token[] }>(
    `${process.env.NEXT_PUBLIC_LI_FI_API_URL}/tokens`,
    fetcher
  );

  const getExtendedTokenList = (toks: Token[], favs: string[]): Token[] => {
    return toks
      .filter((token: Token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((token: Token) => {
        return {
          ...token,
          isFavorite: favs.includes(getUniqueIdentifier(token)),
        };
      });
  };

  useEffect(() => {
    if (data) {
      const tokens = Object.values(data.tokens).flat() as Token[];
      const savedFavorites = JSON.parse(
        localStorage.getItem(FAVORITE_TOKENS_CACHE_KEY) || '[]'
      );
      const extended = getExtendedTokenList(tokens, savedFavorites);

      setAllTokens(extended);
    }
  }, [data]);

  useEffect(() => {
    const filteredTokens =
      selectedTab === 'favorites'
        ? allTokens
            .filter((token) => token.isFavorite)
            .filter((token: Token) =>
              token.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        : allTokens.filter((token: Token) =>
            token.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

    setFilteredTokens(filteredTokens);
  }, [allTokens, searchTerm, selectedTab]);

  if (error) return <div> Failed to load the tokens. </div>;

  return (
    <Container>
      <Title> Token Overview </Title>

      <Tabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      <TokenFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <motion.div layout transition={{ duration: '0.6' }}>
        <AnimatePresence>
          {data && <TokenList tokens={filteredTokens} />}
          {!data && <TokenListLoadingPlaceholder />}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  @media ${device.mobile} {
    padding: 32px;
  }
  @media ${device.tablet} {
    padding: 3rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;

  @media ${device.mobile} {
    font-size: 2.5em;
  }
  @media ${device.tablet} {
    font-size: 3.5em;
  }
`;

export default OverviewPage;
