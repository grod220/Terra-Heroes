import React, { useState } from 'react';
import styled from 'styled-components';
import { Hero } from '../data/heroes';
import { PendingIndication } from './pending-indication';
import { ReadyFormState } from './ready-form-state';
import { SuccessIndication } from './success-indication';
import { ErrorIndication } from './error-indication';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 10px;
  background-color: #424242;
  width: 500px;
  box-shadow: rgba(240, 207, 46, 0.4) 5px 5px, rgba(240, 207, 46, 0.3) 10px 10px, rgba(240, 207, 46, 0.2) 15px 15px,
    rgba(240, 207, 46, 0.1) 20px 20px, rgba(240, 207, 46, 0.05) 25px 25px;
  z-index: 100;
  color: white;
  text-align: center;
  padding-bottom: 40px;
`;

const DismissText = styled.p`
  font-size: 20px;
  text-decoration: underline;
  margin-bottom: 0;
  &:hover {
    cursor: pointer;
  }
`;

interface CheckoutFormProps {
  hero?: Hero;
  dismiss: () => void;
}

export enum RequestState {
  READY,
  PENDING,
  SUCCESS,
  ERROR,
}

export const CheckoutForm = ({ hero, dismiss }: CheckoutFormProps) => {
  const [requestState, setRequestState] = useState(RequestState.READY);
  const [txhash, setTxhash] = useState<string | undefined>();

  return (
    Boolean(hero) && (
      <Container>
        {requestState === RequestState.READY && (
          <ReadyFormState hero={hero} setRequestState={setRequestState} setTxhash={setTxhash} />
        )}
        {requestState === RequestState.PENDING && <PendingIndication />}
        {requestState === RequestState.SUCCESS && <SuccessIndication hero={hero} txhash={txhash} />}
        {requestState === RequestState.ERROR && <ErrorIndication />}
        <DismissText
          onClick={() => {
            dismiss();
            setRequestState(RequestState.READY);
          }}
        >
          CLOSE
        </DismissText>
      </Container>
    )
  );
};
