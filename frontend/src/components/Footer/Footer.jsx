
import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  line-height: 1;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 12px;
  color: gray;
  font-style: italic;
  display: block;
  align-self: center;
  margin-bottom: 10px;
  text-align: center;
`;

export const Footer = () => (
  <Container>
    <Text>
      Results based on data extracted from{' '}
      <a href="https://jobs.github.com/api">GitHub's Jobs API</a>.
    </Text>
    <Text>
      LowBudget Development @ 2020 - All rights reserved.
    </Text>
  </Container>
)

export default Footer;
