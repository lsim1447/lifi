import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Token } from '@/types/token';
import styled from 'styled-components';
import { TokenList } from '@/components/TokenList';
import { AnimatePresence, motion } from 'framer-motion';
import { device } from '@/lib/device';

interface OverviewPageProps {
  tokens: Token[];
}

const OverviewPage = ({ tokens = [] }: OverviewPageProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const [favoriteTokens, setFavoriteTokens] = useState<Token[]>(tokens);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    setFilteredTokens(
      tokens
        .filter((token) =>
          token.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((token: Token) => {
          return {
            ...token,
            isFavorite: favorites.includes(`${token.address}-${token.chainId}`),
          };
        })
    );
  }, [searchTerm, setFilteredTokens, tokens, favorites]);

  useEffect(() => {
    setFavoriteTokens(filteredTokens.filter((token) => token.isFavorite));
  }, [filteredTokens]);

  return (
    <>
      <Title>Token Overview</Title>
      <Container>
        <div>
          <ColumnTitle> All tokens </ColumnTitle>
          <SearchInput
            type="text"
            placeholder="Search tokens by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <motion.div layout transition={{ duration: '0.6' }}>
            <AnimatePresence>
              <TokenList tokens={filteredTokens} />
            </AnimatePresence>
          </motion.div>
        </div>

        <div>
          <ColumnTitle> Favorite tokens </ColumnTitle>

          <motion.div layout transition={{ duration: '0.6' }}>
            <AnimatePresence>
              <TokenList tokens={favoriteTokens} />
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  gap: 24px;
  padding: 20px;

  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  text-align: center;
`;

const ColumnTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 32px;
  text-align: left;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
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
