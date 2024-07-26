import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { colors } from '@/lib/colors';

export interface TokenFilterProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const TokenFilter = ({
  searchTerm,
  setSearchTerm,
}: TokenFilterProps) => {
  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search tokens by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
`;
