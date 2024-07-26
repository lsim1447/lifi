import { Token } from '@/types/token';
import styled from 'styled-components';
import { TokenListItem } from '../TokenListItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NR_OF_TOKENS_TO_LOAD } from '@/lib/constants';
import { getUniqueIdentifier } from '@/lib/utils';

export interface TokenListProps {
  tokens: Token[];
}

export const TokenList = ({ tokens }: TokenListProps) => {
  const [visibleItems, setVisibleItems] = useState<Token[]>([]);
  const [page, setPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);

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
    const newItems: Token[] = tokens.slice(0, page * NR_OF_TOKENS_TO_LOAD);
    setVisibleItems(newItems);
  }, [page, tokens]);

  return (
    <Container>
      {visibleItems.map((token: Token, index: number) => (
        <TokenListItem
          key={getUniqueIdentifier(token)}
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
