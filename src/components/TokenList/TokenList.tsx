import { Token } from '../../types/token';
import styled from 'styled-components';
import { TokenListItem } from '../TokenListItem';

export interface TokenListProps {
  tokens: Token[];
}

export const TokenList = ({ tokens }: TokenListProps) => {
  return (
    <Container>
      {tokens.map((token: Token) => (
        <TokenListItem
          key={`${token.address}-${token.chainId}`}
          token={token}
        />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  list-style-type: none;
  padding: 0;
`;
