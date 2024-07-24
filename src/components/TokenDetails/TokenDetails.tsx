import { Token } from '../../types/token';
import styled from 'styled-components';
import Image from 'next/image';

export interface TokenDetailsProps {
  token: Token;
}

export const TokenDetails = ({ token }: TokenDetailsProps) => {
  return (
    <Container>
      <TokenDetailsContainer>
        <FlexContainer>
          <TokenName>
            {token.name} · {token.symbol} · {token.coinKey}
          </TokenName>
          <TokenPrice>{token.priceUSD}$</TokenPrice>

          <TokenAddress>Address: {token.address}</TokenAddress>
          <TokenAddress>Chain ID: {token.chainId}</TokenAddress>
          <TokenAddress>Decimals: {token.decimals}</TokenAddress>
        </FlexContainer>

        <TokenImage
          src={token?.logoURI || 'https://fakeimg.pl/150x150'}
          alt={token.name || ''}
          width={150}
          height={150}
        />
      </TokenDetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
  overflow-wrap: anywhere;
`;

const TokenDetailsContainer = styled.div`
  background-color: #f4f4f4;
  border: 1px solid transparent;
  border-radius: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 48px;

  padding: 24px;
  width: fit-content;
`;

const TokenImage = styled(Image)`
  width: 150x;
  height: 150px;
  margin-bottom: 24px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TokenName = styled.span`
  font-size: 24px;
  font-weight: 400;
`;

const TokenPrice = styled.span`
  font-size: 42px;
  font-weight: 500;
`;

const TokenAddress = styled.span`
  font-size: 14px;
  font-weight: 300;
`;
