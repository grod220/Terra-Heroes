import styled from 'styled-components';

const AppName = styled.h1`
  font-family: 'Monoton', cursive;
  font-size: 100px;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtext = styled.h2`
  text-align: center;
  color: white;
`;

const Highlight = styled.span`
  color: #d9b70a;
`;

export const Header = () => {
  return (
    <>
      <AppName>
        <Highlight>Terra Heroes</Highlight>
      </AppName>
      <Subtext>
        With global crime rates hitting an all-time low, the X-Men are a bit strapped for cash.
        <br />
        Now with <Highlight>Terra UST</Highlight>, you can easily book them for a party, arm wrestle, or whatever you'd
        like---they are broke.
        <br />
        Pay and instantly they'll be on their way.
      </Subtext>
    </>
  );
};
