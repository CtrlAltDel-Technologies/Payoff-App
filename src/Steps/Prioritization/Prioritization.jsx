import React, { useState, useEffect } from 'react';
import { Header, Input } from 'semantic-ui-react';
import RenderCards from '../../RenderCards/RenderCards';
import './Prioritization.css';

const Prioritization = ({ debtList, setDebtList, extraToPay, setExtraToPay }) => {
  const [prioritizedList, setPrioritizedList] = useState([]);
  const [debtListCopy, setDebtListCopy] = useState([...debtList]);

  useEffect(() => {
    if (debtListCopy.length === 0) {
      setDebtList(prioritizedList);
    }
  }, [prioritizedList, debtListCopy, setDebtList])

  const addToPriorityList = (item) => {
    const newList = [...prioritizedList, item];

    debtListCopy.map((debtItem, index) => {
      if (debtItem.debtName === item.debtName) {
        const newDebtList = [...debtListCopy];
        newDebtList.splice(index, 1);
        setDebtListCopy(newDebtList);
      }
    })

    setPrioritizedList(newList);
  }

  const removeFromPriorityList = (item) => {
    const newList = [...debtListCopy, item];

    prioritizedList.map((debtItem, index) => {
      if (debtItem.debtName === item.debtName) {
        const newPriorityList = [...prioritizedList];
        newPriorityList.splice(index, 1);
        setPrioritizedList(newPriorityList);
      }
    })

    setDebtListCopy(newList);
  }

  return (
    <>
      <Header as='h1'>Prioritization & Payments</Header>
      <div className="card-list-container">
        <RenderCards debtList={debtListCopy} clickFunction={addToPriorityList} />
        <RenderCards debtList={prioritizedList} clickFunction={removeFromPriorityList} />
      </div>
      {debtListCopy.length === 0 && (
        <div className='input-container'>
          <label>How much extra can you pay per month?</label>
          <Input
            type='number'
            name='extraToPay'
            value={extraToPay}
            onChange={(e) => setExtraToPay(Number(e.target.value))}
          />
        </div>
      )}
    </>
  )
}

export default Prioritization;