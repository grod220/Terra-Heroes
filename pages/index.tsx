import Head from 'next/head';
import { Header } from '../components/header';
import { Heroes } from '../components/heroes';
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';

const ToTransactions = styled.h3`
  color: #d9b70a;
  position: absolute;
  top: 10px;
  right: 40px;

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
      <Link href="/purchases">
        <ToTransactions>Check Transactions ➡</ToTransactions>
      </Link>
    </div>
  );
}
