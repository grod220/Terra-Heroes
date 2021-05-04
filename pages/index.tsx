import Head from 'next/head';
import { Header } from '../components/header';
import { Heroes } from '../components/heroes';
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';

const TestNetAddress = styled.h3`
  left: 40px;
  top: 10px;
  position: absolute;
  color: #494949;
`;

const ToTransactions = styled.h3`
  right: 40px;
  top: 10px;
  position: absolute;
  color: #d9b70a;
  &:hover {
    cursor: pointer;
  }
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Terra Heroes</title>
        <meta name="description" content="Coding challenge for Terra Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Heroes />
      <TestNetAddress>Terra Testnet: tequila-0004</TestNetAddress>
      <Link href="/purchases">
        <ToTransactions>Check Transactions ➡</ToTransactions>
      </Link>
    </div>
  );
}
