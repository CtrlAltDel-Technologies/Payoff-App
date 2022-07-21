import './App.css';
import { useEffect, useState } from 'react';
import { DeptItemForm, Prioritization, Chart } from './Steps';
import Navigation from './Navigation/Navigation';
import { calculateChartData } from './Utils/calculateChartData';

function App() {
  const [step, setStep] = useState(0);
  const [debtList, setDebtList] = useState([]);
  const [extraToPay, setExtraToPay] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (step === 1) {
      setChartData(calculateChartData(debtList, extraToPay))
    }
  }, [step, debtList, extraToPay])

  const getStepComponent = () => {
    switch (step) {
      case 0:
        return <DeptItemForm debtList={debtList} setDebtList={setDebtList} />;
      case 1:
        return <Prioritization
          debtList={debtList}
          setDebtList={setDebtList}
          extraToPay={extraToPay}
          setExtraToPay={setExtraToPay}
        />;
      case 2:
        return <Chart data={chartData} debtList={debtList} />
      default:
        return <DeptItemForm debtList={debtList} setDebtList={setDebtList} />;
    }
  }
  return (
    <div className='main'>
      <div className='content-container'>
        {getStepComponent()}
      </div>
      <Navigation
        step={step}
        setStep={setStep}
        debtList={debtList}
        extraToPay={extraToPay}
        setChartData={setChartData}
      />
    </div>
  );
}

export default App;
