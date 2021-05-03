import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { Database } from '../utils/database';
import { Receipt } from '../components/receipt';
import React from 'react';

const Container = styled.div`
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const BackArrow = styled.a`
  color: #d9b70a;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

export default function Purchases() {
  const db = new Database();
  return (
    <div>
      <Head>
        <title>Terra Heroes - Purchases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <BackArrow>
          <h1>⬅ Back to heroes</h1>
        </BackArrow>
      </Link>
      <Container>
        {db.getPurchases().map((purchase) => (
          <Receipt key={purchase.terraAddress} purchase={purchase} />
        ))}
      </Container>
    </div>
  );
}
