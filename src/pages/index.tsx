import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Token } from '@/types/token';
import styled from 'styled-components';
import { TokenList } from '@/components/TokenList';
import { AnimatePresence, motion } from 'framer-motion';

interface OverviewPageProps {
  tokens: Token[];
}

const OverviewPage = ({ tokens = [] }: OverviewPageProps) => {
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredTokens(
      tokens.filter((token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, setFilteredTokens, tokens]);

  return (
    <Container>
      <Title>Token Overview</Title>

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
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
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
