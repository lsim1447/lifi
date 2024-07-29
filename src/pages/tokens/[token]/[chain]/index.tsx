import { GetStaticPaths, GetStaticProps } from 'next';
import { Token } from '@/types/token';
import { TokenDetails } from '@/components/TokenDetails';
import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '@/lib/colors';
import { NR_OF_STATIC_TOKEN_DETAILS_PAGES } from '@/lib/constants';

interface TokenDetailPageProps {
  token: Token;
}

const TokenDetailPage = ({ token }: TokenDetailPageProps) => {
  return (
    <>
      <NavigationContainer>
        <BackButtonStyle href={'/'}>
          {'< '} Back to the Token Overview page
        </BackButtonStyle>
      </NavigationContainer>

      <TokenDetails token={token} />
    </>
  );
};

const BackButtonStyle = styled(Link)`
  background-color: ${colors.black};
  border-radius: 5px;
  color: ${colors.white};
  padding: 6px 12px;
`;

const NavigationContainer = styled.div`
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LI_FI_API_URL}/tokens`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
    }
  );
  const data = await response.json();
  const tokens: Token[] = data.tokens['1'].slice(
    0,
    NR_OF_STATIC_TOKEN_DETAILS_PAGES
  ); // restrict to chain "1", first ~100 tokens (in order to not kill the API)

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
  const url = `${process.env.NEXT_PUBLIC_LI_FI_API_URL}/token?chain=${Number(chain)}&token=${token}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { accept: 'application/json' },
  });
  const data = await response.json();

  return {
    props: {
      token: data,
    },
    revalidate: 60,
  };
};

export default TokenDetailPage;
