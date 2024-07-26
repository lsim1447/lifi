import Link from 'next/link';
import { Token } from '@/types/token';
import styled from 'styled-components';
import Image from 'next/image';
import { SMALL_IMAGE_SIZE, SMALL_PLACEHOLDER_IMAGE_URL } from '@/lib/constants';
import { colors } from '@/lib/colors';

export interface TokenListItemProps {
  token: Token;
  lastItemRef: ((node: HTMLLIElement) => void) | null;
}

export const TokenListItem = ({ token, lastItemRef }: TokenListItemProps) => {
  return (
    <Container ref={lastItemRef}>
      <Link legacyBehavior href={`/tokens/${token.address}/${token.chainId}`}>
        <a>
          <FavoriteIcon
            $favorited={Boolean(token.isFavorite)}
            onClick={() => {}}
          >
            ★
          </FavoriteIcon>
          <TokenImage
            src={token?.logoURI || SMALL_PLACEHOLDER_IMAGE_URL}
            alt={token.name}
            width={SMALL_IMAGE_SIZE}
            height={SMALL_IMAGE_SIZE}
          />
          <TokenDetailsContaner>
            <TokenName>{token.name}</TokenName>
            <TokenAddress>{token.address}</TokenAddress>
          </TokenDetailsContaner>
        </a>
      </Link>
    </Container>
  );
};

const Container = styled.li`
  border-bottom: 1px solid ${colors.greyLight};
  margin-bottom: 10px;
  padding: 12px 0px 12px 0px;

  a {
    display: flex;
    align-items: center;
    gap: 32px;
    text-decoration: none;
    color: ${colors.black};
  }

  &: hover {
    background-color: ${colors.greyLightest};
  }
`;

const TokenImage = styled(Image)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const TokenDetailsContaner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TokenName = styled.span`
  font-size: 21px;
  font-weight: 500;
`;

const TokenAddress = styled.span`
  font-size: 14px;
  font-weight: 300;
  overflow-wrap: anywhere;
`;

const FavoriteIcon = styled.span<{ $favorited: boolean }>`
  color: ${({ $favorited }) => ($favorited ? colors.gold : colors.grey)};
  cursor: pointer;
  font-size: 24px;
`;
