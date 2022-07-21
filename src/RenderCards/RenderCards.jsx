import React from 'react'
import { Card } from 'semantic-ui-react';
import './RenderCards.css';

const { Header, Content, Description } = Card;

const RenderCards = ({ debtList, clickFunction }) => {
  return (
    <div className='cards-container'>
      {debtList.map((item) => {
        return (
          <Card
            key={item.debtName}
            style={{ cursor: clickFunction ? 'pointer' : '' }}
            onClick={clickFunction ? () => clickFunction(item) : null}
          >
            <Content>
              <Header>{item.debtName}</Header>
              <Description>
                Monthly Payment: {item.minPayment} <br />
                Debt Total: {item.totalDebtAmount}
              </Description>
            </Content>
          </ Card>
        );
      })}
    </div>
  )
}

export default RenderCards