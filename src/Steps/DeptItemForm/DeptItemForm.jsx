import React, { useState } from 'react'
import { Header, Input, Icon, Form, Button } from 'semantic-ui-react';
import RenderCards from '../../RenderCards/RenderCards';
import './DebtItemForm.css';

const { Field } = Form;

const DeptItemForm = ({ debtList, setDebtList }) => {
  const [debtName, setDebtName] = useState('');
  const [totalDebtAmount, setTotalDebtAmount] = useState(0);
  const [minPayment, setMinPayment] = useState(0);

  const handleAddDebtItem = () => {
    const debtObj = {};

    if (debtName) {
      debtObj.debtName = debtName;
      setDebtName('');
    }

    if (totalDebtAmount) {
      debtObj.totalDebtAmount = totalDebtAmount;
      setTotalDebtAmount(0);
    }

    if (minPayment) {
      debtObj.minPayment = minPayment;
      setMinPayment(0);
    }

    setDebtList([...debtList, debtObj]);
  }

  return (
    <>
      <Header as='h1'>
        Debts
        <Header.Subheader>
          Here you can enter your debts that you wish to pay off
        </Header.Subheader>
      </Header>

      <div className='added-debts'>
        <Header as='h3'>Added Depts</Header>
        <div>
          <RenderCards debtList={debtList} />
        </div>
      </div>
      <Form className='form-area' onSubmit={handleAddDebtItem}>
        <Field>
          <label>Debt Name</label>
          <Input
            name='debtName'
            value={debtName}
            onChange={(e) => setDebtName(e.target.value)}
          />
        </Field>

        <Field>
          <label>Total Debt Amount</label>
          <Input
            type='number'
            icon='dollar'
            iconPosition='left'
            name='totalDebtAmount'
            value={totalDebtAmount}
            onChange={(e) => setTotalDebtAmount(Number(e.target.value))}
          />
        </Field>

        <Field>
          <label>Monthly Minimum Payment</label>
          <Input
            type='number'
            icon='dollar'
            iconPosition='left'
            name='minPayment'
            value={minPayment}
            onChange={(e) => setMinPayment(Number(e.target.value))}
          />
        </Field>

        <Button color='green' type='submit'>
          <Icon name='add circle' />
          Add
        </Button>
      </Form>
    </>
  )
}

export default DeptItemForm;