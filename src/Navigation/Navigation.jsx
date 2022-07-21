import React from 'react';
import './navigation.css';
import { Button } from 'semantic-ui-react';

const Navigation = ({ step, setStep, debtList, extraToPay, setChartData }) => {
  const handleNavigation = (navDirection) => {
    if (navDirection === 'back' && step > 0) {
      setStep(step - 1)
    } else if (step < 2) {
      setStep(step + 1)
    }
  }

  const getRightButton = () => {
    if (step < 1) {
      return (
        <Button
          onClick={() => handleNavigation('next')}
          size='huge'
          color='blue'
          floated='right'
        >
          Next
        </Button>
      )
    }
    else if (step === 1) {
      return (
        <Button
          onClick={() => handleNavigation('next')}
          size='huge'
          color='green'
          floated='right'
        >
          Calculate
        </Button>
      )
    }
    return null;
  }

  return (
    <div className='nav-container' style={{ justifyContent: step === 0 ? 'flex-end' : 'space-between' }}>
      {step > 0 &&
        <Button
          onClick={() => handleNavigation('back')}
          size='huge'
          color='grey'
          floated='left'
        >
          Back
        </Button>
      }
      {getRightButton()}
    </div>
  )
}

export default Navigation;