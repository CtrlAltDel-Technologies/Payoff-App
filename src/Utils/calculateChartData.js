const calculateChartData = (debtList, extraToPay) => {
  const paymentsTracker = {};

  const monthSnapshotData = {};
  let extraToPayTotal = extraToPay;
  let overAmount = 0;

  debtList.map(item => {
    paymentsTracker[item.debtName] = { ...item };
  })

  const runAMonth = () => {
    let keysToRemove = [];

    Object.keys(paymentsTracker).map((item, index) => {
      const debt = paymentsTracker[item];
      const amountToSubtract = index === 0 ? debt.minPayment + extraToPayTotal + overAmount : debt.minPayment + overAmount
      const newTotal = debt.totalDebtAmount - amountToSubtract;

      if (!monthSnapshotData[debt.debtName]) {
        monthSnapshotData[debt.debtName] = [];
      }

      if (overAmount > 0) overAmount = 0;

      if (newTotal > 0) {
        // Create our x value for the chart
        const newItem = {
          x: newTotal,
          y: monthSnapshotData[debt.debtName].length + 1
        };
        // Alter the item total debt amount and the debt amount of our copy to reflect this months payment
        debt.totalDebtAmount = newTotal;
        // Push our copy of the new item totals to our monthData for the snapshot
        monthSnapshotData[debt.debtName].push(newItem);
      } else {
        // We paid something off so we need to account for the overage, take the absolute value and set that to the overAmount
        overAmount = Math.abs(newTotal);
        // Our extraToPayTotal goes up by our min payment so that we can snowball
        extraToPayTotal += debt.minPayment;
        // Set our x value to 0 for the chart
        const newItem = {
          x: 0,
          y: monthSnapshotData[debt.debtName].length + 1
        };
        // We paid off the debt so we should set the debt amount to 0
        debt.totalDebtAmount = 0;
        // We still want to track that we paid off the item this month so we push the data to the monthData
        monthSnapshotData[debt.debtName].push(newItem);
        // Add this index to our list to remove
        keysToRemove.push(item);
      }
    })

    if (keysToRemove.length > 0) {
      keysToRemove.map(key => {
        delete paymentsTracker[key];
      })

      keysToRemove = [];
    }

    if (Object.keys(paymentsTracker).length > 0) {
      runAMonth();
    }
  }

  runAMonth()

  return monthSnapshotData;
}

export {
  calculateChartData
}