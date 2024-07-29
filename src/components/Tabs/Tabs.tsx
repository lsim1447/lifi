// components/Tabs.tsx
import { useTokenFilter } from '@/contexts/TokenFilterContext';
import { colors } from '@/lib/colors';
import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.greyLight};
  margin-bottom: 36px;
  padding-bottom: 12px;
`;

const Tab = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? colors.black : colors.white)};
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? `2px solid ${colors.black}` : 'none'};
  color: ${({ $active }) => ($active ? colors.white : colors.black)};
  cursor: pointer;
  font-size: 18px;
  outline: none;
  padding: 16px 56px;
`;

interface TabsProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ selectedTab, onSelectTab }) => {
  const { resetAllFilters } = useTokenFilter();

  return (
    <TabContainer>
      <Tab
        $active={selectedTab === 'all'}
        onClick={() => {
          onSelectTab('all');
          resetAllFilters();
        }}
      >
        All Tokens
      </Tab>
      <Tab
        $active={selectedTab === 'favorites'}
        onClick={() => {
          onSelectTab('favorites');
          resetAllFilters();
        }}
      >
        Favorite Tokens
      </Tab>
    </TabContainer>
  );
};
