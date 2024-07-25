import { GetStaticPaths, GetStaticProps } from 'next';
import { Token } from '../../../../types/token';
import { TokenDetails } from '@/components/TokenDetails';
import Link from 'next/link';
import styled from 'styled-components';

interface TokenDetailPageProps {
  token: Token;
}

const TokenDetailPage = ({ token }: TokenDetailPageProps) => {
  return (
    <>
      <ButtonContainer>
        <BackButtonStyle href={'/'}>
          {'< '}Back to the Token Overview page
        </BackButtonStyle>
      </ButtonContainer>

      <TokenDetails token={token} />
    </>
  );
};

const BackButtonStyle = styled(Link)`
  background-color: black;
  border: 1px solid grey;
  border-radius: 5px;
  color: white;
  padding: 6px 12px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://li.quest/v1/tokens', {
    method: 'GET',
    headers: { accept: 'application/json' },
  });
  const data = await response.json();
  const tokens: Token[] = data.tokens['1'].slice(0, 100);

  const paths = tokens.map((token) => {
    return {
      params: {
        token: token.address,
        chain: token.chainId.toString(),
      },
    };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { token, chain } = context.params!;
  const url = `https://li.quest/v1/token?chain=${Number(chain)}&token=${token}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { accept: 'application/json' },
  });
  const data = await response.json();

  return {
    props: {
      token: data,
    },
    revalidate: 20, // ISR: Regenerate the page every 20 seconds
  };
};

export default TokenDetailPage;
