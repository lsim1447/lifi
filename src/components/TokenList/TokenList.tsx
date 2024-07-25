import { Token } from '../../types/token';
import styled from 'styled-components';
import { TokenListItem } from '../TokenListItem';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface TokenListProps {
  tokens: Token[];
}

export const TokenList = ({ tokens }: TokenListProps) => {
  const [visibleItems, setVisibleItems] = useState<Token[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const itemsPerPage = 10;

  const lastItemRef = useCallback(
    (node: HTMLLIElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [setPage]
  );

  useEffect(() => {
    const newItems = tokens.slice(0, page * itemsPerPage);
    setVisibleItems(newItems);
  }, [page, tokens]);

  return (
    <Container>
      {visibleItems.map((token: Token, index: number) => (
        <TokenListItem
          key={`${token.address}-${token.chainId}`}
          lastItemRef={index === visibleItems.length - 1 ? lastItemRef : null}
          token={token}
        />
      ))}
      {visibleItems.length < tokens.length && <Loader> Loading... </Loader>}
    </Container>
  );
};

const Container = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Loader = styled.div`
  text-align: center;
  padding: 10px;
`;
