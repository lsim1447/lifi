import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Token } from '../types/token'
import styled from 'styled-components';
import { TokenList } from '../components/TokenList';

interface OverviewPageProps {
  tokens: Token[];
}

const OverviewPage = ({ tokens = [] }: OverviewPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>Token Overview</Title>

      <SearchInput
        type="text"
        placeholder="Search tokens"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TokenList tokens={filteredTokens}/>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
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
  let props: Record<string, any> = {
    tokens: []
  }

  try {
    const response = await fetch('https://li.quest/v1/tokens', { method: 'GET', headers: { accept: 'application/json' }});
    const data = await response.json()
    const tokens: Token[] = data.tokens["1"].slice(0, 10);;

    props = {
      tokens: tokens,
    }
  
  } catch (err) {
    throw new Error('Error during data fetch.')
  }

  return {
    props
  };
};

export default OverviewPage;