import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { Hero } from '../data/heroes';
import { RequestState } from './checkout-form';
import { MerchantAddressResponse } from '../pages/api/merchant-address';
import { sendTransactionWithExtension } from '../utils/extension';
import { Database } from '../utils/database';

const HeroName = styled.h2`
  color: #d9b70a;
  font-size: 100px;
  margin: -10px 0 40px 0;
`;

const Field = styled.input`
  width: 60%;
  height: 40px;
  display: block;
  margin: 0 auto 20px auto;
`;

const PurchaseButton = styled.input`
  padding: 10px 15px;
  color: white;
  background-color: #d9b70a;
  border: 1px solid #000000;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const initTransaction = async (
  hero: Hero,
  name: string,
  requestedLocation: string,
  setTxhash: Dispatch<React.SetStateAction<string>>,
) => {
  const res = await fetch('/api/merchant-address');
  const body: MerchantAddressResponse = await res.json();

  const db = new Database();
  db.savePurchase({
    heroId: hero.id,
    terraAddress: body.merchantTerraAddress,
    requestedLocation,
    customerName: name,
  });

  const tx = await sendTransactionWithExtension(body.merchantTerraAddress, hero.price);
  setTxhash(tx.result.txhash);
};

interface ReadyFormStateProps {
  hero: Hero;
  setRequestState: Dispatch<React.SetStateAction<RequestState>>;
  setTxhash: Dispatch<React.SetStateAction<string>>;
}

export const ReadyFormState = ({ hero, setRequestState, setTxhash }: ReadyFormStateProps) => {
  const [name, setName] = useState('');
  const [requestedLocation, setRequestedLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, hero: Hero, name: string, location: string) => {
    try {
      e.preventDefault();
      setRequestState(RequestState.PENDING);
      await initTransaction(hero, name, location, setTxhash);
      setRequestState(RequestState.SUCCESS);
    } catch (e) {
      setRequestState(RequestState.ERROR);
    }
  };

  return (
    <>
      <h1>Request an immediate visit from:</h1>
      <HeroName>{hero.name}</HeroName>
      <form onSubmit={(e) => handleSubmit(e, hero, name, requestedLocation)}>
        <Field placeholder="Full Name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Field
          name="location"
          placeholder="Location (address, lat/long, maps link, etc)"
          type="text"
          value={requestedLocation}
          onChange={(e) => setRequestedLocation(e.target.value)}
        />
        <h2>Price: {hero.price} UST</h2>
        <PurchaseButton type="submit" value="Purchase with Terra Station" />
      </form>
    </>
  );
};
