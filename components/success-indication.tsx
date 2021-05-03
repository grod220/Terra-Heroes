import React from 'react';
import { Hero } from '../data/heroes';
import styled from 'styled-components';

const Highlight = styled.p`
  a {
    color: #d9b70a;
  }
`;

export const SuccessIndication = ({ hero, txhash }: { hero: Hero; txhash: string }) => {
  return (
    <>
      <h1>🚀 Successful request</h1>
      <h2>{hero.name} is on the way to you 💯</h2>
      <p>Transaction hash</p>
      <Highlight>
        <a href={`https://finder.terra.money/tequila-0004/tx/${txhash}`} target="_blank">
          {txhash}
        </a>
      </Highlight>
    </>
  );
};
