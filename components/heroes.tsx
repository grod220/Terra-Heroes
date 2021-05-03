import styled from 'styled-components';
import { Hero, heroes } from '../data/heroes';
import { useState } from 'react';
import { CheckoutForm } from './checkout-form';

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
  margin: 50px 0;
  color: white;
`;

const Wrapper = styled.div`
  position: relative;
`;

const RequestOverlay = styled.div<{ hovered: boolean }>`
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  transition: all 300ms;
  opacity: ${({ hovered }) => (hovered ? 1 : 0)};
  cursor: pointer;
`;

const CardContent = styled.div<{ img: string; hovered: boolean }>`
  height: 400px;
  transition: all 300ms;
  background: url(${({ img }) => img}) no-repeat center center;
  background-size: cover;
  opacity: ${({ hovered }) => (hovered ? 0.5 : 1)};
  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.h3`
  font-size: 60px;
  mix-blend-mode: color-burn;
  color: #d5acac;
  margin-top: 0;
`;

const Price = styled.h4`
  font-size: 30px;
  opacity: 0.8;
`;

export const Heroes = () => {
  const [cardIdHovered, setCardIdHovered] = useState<Number>(0);
  const [heroClicked, setHeroClicked] = useState<Hero | undefined>();
  return (
    <>
      <CheckoutForm hero={heroClicked} dismiss={() => setHeroClicked(undefined)} />
      <HeroGrid>
        {heroes.map((hero) => (
          <Wrapper
            key={hero.id}
            onMouseEnter={() => setCardIdHovered(hero.id)}
            onMouseLeave={() => setCardIdHovered(0)}
            onClick={() => setHeroClicked(hero)}
          >
            <RequestOverlay hovered={cardIdHovered === hero.id}>Request</RequestOverlay>
            <CardContent img={hero.thumbnail} hovered={cardIdHovered === hero.id}>
              <Name>{hero.name}</Name>
              <Price>${hero.price}</Price>
            </CardContent>
          </Wrapper>
        ))}
      </HeroGrid>
    </>
  );
};
