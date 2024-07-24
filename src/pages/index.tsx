import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Token } from '../types/token'

interface OverviewPageProps {
  tokens: Token[];
}

const OverviewPage = ({ tokens = [] }: OverviewPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Token Overview</h1>

      <input
        type="text"
        placeholder="Search tokens"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredTokens.map(token => (
          <li key={token.address}>
            <Link legacyBehavior href={`/tokens/${token.address}/${token.chainId}`}>
              <a>
                <Image src={token.logoURI} alt={token.name} width={30} height={30} />
                {token.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let props: Record<string, any> = {
    tokens: []
  }

  try {
    const response = await fetch('https://li.quest/v1/tokens', { method: 'GET', headers: { accept: 'application/json' }});
    const data = await response.json()
    const tokens: Token[] = data.tokens["1"];

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