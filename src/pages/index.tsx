import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Tabs } from '@/components/Tabs';
import { TokenList } from '@/components/TokenList';
import { TokenFilter } from '@/components/TokenFilter';
import { device } from '@/lib/device';
import { FAVORITE_TOKENS_CACHE_KEY } from '@/lib/constants';
import { getUniqueIdentifier } from '@/lib/utils';
import { Token } from '@/types/token';
import { useTokenFilter } from '@/contexts/TokenFilterContext';

interface OverviewPageProps {
  tokens: Token[];
}

const OverviewPage = ({ tokens = [] }: OverviewPageProps) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  const { searchTerm, setSearchTerm } = useTokenFilter();

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
    const savedFavorites = JSON.parse(
      localStorage.getItem(FAVORITE_TOKENS_CACHE_KEY) || '[]'
    );
    const extended = getExtendedTokenList(tokens, savedFavorites);

    setAllTokens(extended);
  }, [tokens]);

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

  return (
    <Container>
      <Title> Token Overview </Title>

      <Tabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      <TokenFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <motion.div layout transition={{ duration: '0.6' }}>
        <AnimatePresence>
          <TokenList tokens={filteredTokens} />
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
    font-size: 3em;
  }
  @media ${device.tablet} {
    font-size: 4em;
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  let props: Record<string, any> = {
    tokens: [],
  };

  try {
    const response = await fetch('https://li.quest/v1/tokens', {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    const data = await response.json();
    const tokens: Token[] = Object.values(data.tokens).flat() as Token[];

    props = {
      tokens: tokens,
    };
  } catch (err) {
    throw new Error('Error during data fetch.');
  }

  return {
    props,
  };
};

export default OverviewPage;
