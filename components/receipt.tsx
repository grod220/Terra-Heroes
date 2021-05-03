import React from 'react';
import { heroes } from '../data/heroes';
import styled from 'styled-components';
import { PurchaseModel } from '../utils/database';
import { useQuery } from 'react-query';
import { PurchaseStatusResponse } from '../pages/api/purchase-status/[address]';

const Card = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  width: 500px;
  color: gray;
`;

const fetchUSDBalance = async (terraAddress: string) => {
  const res = await fetch(`/api/purchase-status/${terraAddress}`);
  return await res.json();
};

export const Receipt = ({ purchase }: { purchase: PurchaseModel }) => {
  const { isLoading, data } = useQuery<PurchaseStatusResponse>(purchase.terraAddress, () =>
    fetchUSDBalance(purchase.terraAddress),
  );
  return (
    <Card>
      <p>Hero Id: {purchase.heroId}</p>
      <p>Hero Name: {heroes.find((hero) => hero.id === purchase.heroId)?.name}</p>
      <p>Customer Name: {purchase.customerName}</p>
      <p>Requested Location: {purchase.requestedLocation}</p>
      <p>Terra address: {purchase.terraAddress}</p>
      {isLoading && (
        <>
          <p>Balance: ⏳ Loading... </p>
          <p>Funded: ⏳ Loading...</p>
        </>
      )}
      {data && (
        <>
          <p>Balance: {parseInt(data.usdTotal) / 1000000} USD</p>
          <p>
            Funded:
            {parseInt(data.usdTotal) / 1000000 >= heroes.find((hero) => hero.id === purchase.heroId).price
              ? 'Yes ✅'
              : 'No ⛔️'}
          </p>
        </>
      )}
    </Card>
  );
};
