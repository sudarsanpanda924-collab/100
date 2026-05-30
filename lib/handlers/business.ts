export function handleGSTCalculator(inputs: Record<string, any>) {
  const amount = parseFloat(inputs.amount || "0");
  const rate = parseFloat(inputs.rate || "18");
  const isInclusive = inputs.type === "inclusive";

  let taxAmount = 0;
  let netAmount = 0;
  let grossAmount = 0;

  if (isInclusive) {
    grossAmount = amount;
    taxAmount = amount - (amount / (1 + rate / 100));
    netAmount = amount - taxAmount;
  } else {
    netAmount = amount;
    taxAmount = amount * (rate / 100);
    grossAmount = amount + taxAmount;
  }

  return {
    baseAmount: netAmount.toFixed(2),
    gstRate: `${rate}%`,
    taxAmount: taxAmount.toFixed(2),
    totalAmount: grossAmount.toFixed(2),
    summary: `Base price is ₹${netAmount.toFixed(2)}. GST (${rate}%) is ₹${taxAmount.toFixed(2)}, resulting in a total of ₹${grossAmount.toFixed(2)}.`
  };
}

export function handleCurrencyProfitCalculator(inputs: Record<string, any>) {
  const invoiced = parseFloat(inputs.invoiced || "0");
  const rateReceived = parseFloat(inputs.rateReceived || "0");
  const rateCurrent = parseFloat(inputs.rateCurrent || "0");

  const amountReceived = invoiced * rateReceived;
  const amountIdeal = invoiced * rateCurrent;
  const profitOrLoss = amountReceived - amountIdeal;

  return {
    amountReceived: amountReceived.toFixed(2),
    amountIdeal: amountIdeal.toFixed(2),
    difference: profitOrLoss.toFixed(2),
    status: profitOrLoss >= 0 ? "Gain" : "Loss / Opportunity Cost",
    summary: `For $${invoiced} USD, you received ₹${amountReceived.toFixed(2)} (at ₹${rateReceived}/USD). Ideal receipt at current rate is ₹${amountIdeal.toFixed(2)} (at ₹${rateCurrent}/USD). Variance: ₹${Math.abs(profitOrLoss).toFixed(2)} (${profitOrLoss >= 0 ? "gain" : "loss"}).`
  };
}

export function handleProfitMarginCalculator(inputs: Record<string, any>) {
  const cost = parseFloat(inputs.cost || "0");
  const revenue = parseFloat(inputs.revenue || "0");

  const profit = revenue - cost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const markup = cost > 0 ? (profit / cost) * 100 : 0;

  return {
    grossProfit: profit.toFixed(2),
    profitMargin: `${margin.toFixed(2)}%`,
    markup: `${markup.toFixed(2)}%`,
    summary: `A product costing $${cost.toFixed(2)} sold for $${revenue.toFixed(2)} yields a gross profit of $${profit.toFixed(2)}. Gross profit margin is ${margin.toFixed(2)}%, and markup is ${markup.toFixed(2)}%.`
  };
}

export function handleEMICalculator(inputs: Record<string, any>) {
  const principal = parseFloat(inputs.principal || "0");
  const rateOfYear = parseFloat(inputs.interest || "0");
  const years = parseFloat(inputs.tenure || "0");

  const monthlyRate = rateOfYear / (12 * 100);
  const months = years * 12;

  let emi = 0;
  if (monthlyRate > 0) {
    emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  } else {
    emi = principal / months;
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEMI: emi.toFixed(2),
    principalAmount: principal.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    summary: `For a loan of $${principal.toFixed(2)} at ${rateOfYear}% over ${years} years, the Monthly EMI is $${emi.toFixed(2)}. Total repayment is $${totalPayment.toFixed(2)} (Principal: $${principal.toFixed(2)}, Interest: $${totalInterest.toFixed(2)}).`
  };
}

export function handleROICalculator(inputs: Record<string, any>) {
  const initial = parseFloat(inputs.initial || "0");
  const final = parseFloat(inputs.final || "0");

  const gain = final - initial;
  const roi = initial > 0 ? (gain / initial) * 100 : 0;

  return {
    investmentGain: gain.toFixed(2),
    returnOnInvestment: `${roi.toFixed(2)}%`,
    ratio: (final / initial).toFixed(2),
    summary: `An initial investment of $${initial.toFixed(2)} growing to $${final.toFixed(2)} yields a net gain of $${gain.toFixed(2)}. This represents a Return on Investment (ROI) of ${roi.toFixed(2)}% (multiplier of ${ (final / initial).toFixed(2) }x).`
  };
}

export function handleBreakEvenCalculator(inputs: Record<string, any>) {
  const fixed = parseFloat(inputs.fixed || "0");
  const price = parseFloat(inputs.price || "0");
  const variable = parseFloat(inputs.variable || "0");

  const contributionMargin = price - variable;
  const breakEvenUnits = contributionMargin > 0 ? fixed / contributionMargin : 0;
  const breakEvenSales = breakEvenUnits * price;

  return {
    unitContributionMargin: contributionMargin.toFixed(2),
    breakEvenUnits: Math.ceil(breakEvenUnits),
    breakEvenRevenue: breakEvenSales.toFixed(2),
    summary: `With fixed costs of $${fixed.toFixed(2)}, selling price of $${price.toFixed(2)}, and variable cost of $${variable.toFixed(2)}, your contribution margin per unit is $${contributionMargin.toFixed(2)}. You must sell ${Math.ceil(breakEvenUnits)} units (generating $${breakEvenSales.toFixed(2)} in revenue) to break even.`
  };
}

export function handleStartupCostCalculator(inputs: Record<string, any>) {
  const assets = parseFloat(inputs.assets || "0");
  const expenses = parseFloat(inputs.expenses || "0");
  const runway = parseFloat(inputs.runway || "6");

  const runwayExpenses = expenses * runway;
  const total = assets + runwayExpenses;

  return {
    assetCosts: assets.toFixed(2),
    monthlyRunwayCosts: runwayExpenses.toFixed(2),
    totalCapitalRequired: total.toFixed(2),
    summary: `To start your business with $${assets.toFixed(2)} in one-time assets and cover $${expenses.toFixed(2)}/month in expenses for a ${runway}-month runway, you require a total initial capital of $${total.toFixed(2)}.`
  };
}
