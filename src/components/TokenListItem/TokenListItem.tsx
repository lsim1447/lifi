import Link from 'next/link';
import { Token } from '@/types/token';
import styled from 'styled-components';
import Image from 'next/image';
import { SMALL_PLACEHOLDER_IMAGE_URL } from '@/lib/constants';

export interface TokenListItemProps {
  token: Token;
  lastItemRef: ((node: HTMLLIElement) => void) | null;
}

export const TokenListItem = ({ token, lastItemRef }: TokenListItemProps) => {
  return (
    <Container ref={lastItemRef}>
      <Link legacyBehavior href={`/tokens/${token.address}/${token.chainId}`}>
        <a>
          <TokenImage
            src={token?.logoURI || SMALL_PLACEHOLDER_IMAGE_URL}
            alt={token.name}
            width={40}
            height={40}
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
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
  padding: 12px 0px 12px 0px;

  a {
    display: flex;
    align-items: center;
    gap: 32px;
    text-decoration: none;
    color: #000;
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
