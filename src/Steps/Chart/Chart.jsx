import React from 'react'
import { FlexibleXYPlot, XAxis, YAxis, HorizontalBarSeries, DiscreteColorLegend } from 'react-vis';
import './Chart.css';

const Chart = ({ data }) => {
  const stacks = Object.keys(data);

  const renderChartData = () => {
    return stacks.map(stack => {
      const stackData = data[stack];

      return (
        <HorizontalBarSeries
          key={`${stack}`}
          cluster='stack'
          data={stackData}
        />
      )
    })
  }

  return (
    <>
      <h1>Snowball Chart</h1>
      <FlexibleXYPlot
        stackBy="x"
      >
        <h3 className='x-title'>Money</h3>
        <h3 className='y-title'>Months</h3>
        <XAxis
          style={{
            line: { stroke: '#1F0802', strokeWidth: '1px' },
          }}
        />
        <YAxis
          style={{
            line: { stroke: '#1F0802', strokeWidth: '1px' }
          }}
        />

        {renderChartData()}

      </FlexibleXYPlot>
      <DiscreteColorLegend items={stacks} orientation='horizontal' />
    </>
  )
}

export default Chart;
