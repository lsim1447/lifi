import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {
  FAVORITE_TOKENS_CACHE_KEY,
  MEDIUM_IMAGE_SIZE,
  MEDIUM_PLACEHOLDER_IMAGE_URL,
} from '@/lib/constants';
import { colors } from '@/lib/colors';
import { getUniqueIdentifier } from '@/lib/utils';
import { Token } from '@/types/token';

export interface TokenDetailsProps {
  token: Token;
}

export const TokenDetails = ({ token }: TokenDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem(FAVORITE_TOKENS_CACHE_KEY) || '[]'
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    setIsFavorite(favorites.includes(getUniqueIdentifier(token)));
  }, [favorites, token]);

  const handleFavoriteIconOnClick = () => {
    let updatedFavorites = [...favorites];
    const uniqueIdentifier: string = getUniqueIdentifier(token);

    if (!favorites.includes(uniqueIdentifier)) {
      updatedFavorites.push(uniqueIdentifier);
    } else {
      updatedFavorites = updatedFavorites.filter(
        (favoriteItem) => favoriteItem !== uniqueIdentifier
      );
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(
      FAVORITE_TOKENS_CACHE_KEY,
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <Container>
      <TokenDetailsContainer>
        <FavoriteIcon
          $favorited={Boolean(isFavorite)}
          onClick={() => handleFavoriteIconOnClick()}
        >
          ★
        </FavoriteIcon>
        <TokenTextInfoContainer>
          <TokenName>
            {token.name} · {token.symbol} · {token.coinKey}
          </TokenName>
          <TokenPrice>{token.priceUSD}$</TokenPrice>

          <TokenAddress>Address: {token.address}</TokenAddress>
          <TokenAddress>Chain ID: {token.chainId}</TokenAddress>
          <TokenAddress>Decimals: {token.decimals}</TokenAddress>
        </TokenTextInfoContainer>

        <TokenImage
          src={token?.logoURI || MEDIUM_PLACEHOLDER_IMAGE_URL}
          alt={token.name || ''}
          width={MEDIUM_IMAGE_SIZE}
          height={MEDIUM_IMAGE_SIZE}
        />
      </TokenDetailsContainer>
    </Container>
  );
};

const FavoriteIcon = styled.span<{ $favorited: boolean }>`
  color: ${({ $favorited }) => ($favorited ? colors.gold : colors.grey)};
  cursor: pointer;
  font-size: 32px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
  overflow-wrap: anywhere;
`;

const TokenDetailsContainer = styled.div`
  background-color: ${colors.greyLightest};
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
  width: ${MEDIUM_IMAGE_SIZE}x;
  height: ${MEDIUM_IMAGE_SIZE}px;
  margin-bottom: 24px;
`;

const TokenTextInfoContainer = styled.div`
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
