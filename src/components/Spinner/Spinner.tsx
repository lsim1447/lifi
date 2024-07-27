import { colors } from '@/lib/colors';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: ' ';
    display: block;
    width: 48px;
    height: 48px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${colors.grey};
    border-color: ${colors.grey} ${colors.transparent} ${colors.grey}
      ${colors.transparent};
    animation: ${spin} 1.2s linear infinite;
  }
`;

export const Spinner: React.FC = () => <SpinnerWrapper />;
