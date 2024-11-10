import React, { useEffect, useState, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend } from "recharts";

const RVsBCalculator = () => {
    const [homePrice, setHomePrice] = useState(372681.95);
    const [downPayment, setDownPayment] = useState(66000);
    const [loanTerm, setLoanTerm] = useState(360);
    const [interestRate, setInterestRate] = useState(6.5);
    const [propertyTax, setPropertyTax] = useState(0);
    const [homeValueIncrease, setHomeValueIncrease] = useState(3);
    const [currentRent, setCurrentRent] = useState(2000);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [loanTermHomePlan, setLoanTermHomePlan] = useState(360);  // Added state for loanTermHomePlan

    const calculateEMI = useCallback(() => {
        const principal = homePrice - downPayment;
        const monthlyInterest = interestRate / 100 / 12;
        const numPayments = loanTerm;

        const monthlyEMI =
            monthlyInterest === 0
                ? principal / numPayments
                : (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numPayments)) /
                (Math.pow(1 + monthlyInterest, numPayments) - 1);

        const estimatedPayment = monthlyEMI + propertyTax / 12;
        setMonthlyPayment(estimatedPayment.toFixed(2));
    }, [homePrice, downPayment, loanTerm, interestRate, propertyTax]);

    useEffect(() => {
        calculateEMI();
    }, [calculateEMI]);

    // Data for the column chart
    const chartData = [
        { name: "Renting Payments", value: currentRent * 12, color: "#0088FE" },
        { name: "Buying Payments", value: monthlyPayment * 12, color: "#00C49F" },
        { name: "Savings On Buying", value: (currentRent * 12) - (monthlyPayment * 12), color: "#FFBB28" },
    ];

    // Calculate total savings based on appreciation of home price
    useEffect(() => {
        const appreciationRate = homeValueIncrease / 100;
        const futureHomePrice = homePrice * Math.pow(1 + appreciationRate, loanTerm / 12);
        setTotalSavings(futureHomePrice - homePrice);
    }, [homePrice, homeValueIncrease, loanTerm]);

    return (
        <div className="mortgageCalculatorParent">
            <div className="mortgageCalculator">
                <div className="mortgageCalculatorHeaderContent">
                    <span className="mortgageCalculatorHeader">Renting Vs Buying Calculator*</span>
                    <span className="mortgageCalculatorContent">
                        Use the calculator below to compare the advantages and disadvantages of owning vs. renting a home.
                    </span>
                </div>
                <div className="mortgageCalculatorBox">
                    <div className="leftSideBox">
                        {/* Current Rent */}
                        <label>
                            Current Rent: <br />
                            <input
                                type="text"
                                value={`$ ${Number(currentRent).toLocaleString()}`}
                                onChange={(e) => setCurrentRent(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="50000"
                                value={currentRent}
                                onChange={(e) => setCurrentRent(+e.target.value)}
                            />
                        </label>

                        {/* Purchase Price of Home */}
                        <label>
                            Purchase Price of Home: <br />
                            <input
                                type="text"
                                value={`$ ${Number(homePrice).toLocaleString()}`}
                                onChange={(e) => setHomePrice(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1000000"
                                value={homePrice}
                                onChange={(e) => setHomePrice(+e.target.value)}
                            />
                        </label>

                        {/* Down Payment */}
                        <label>
                            Percentage of Down Payment (%): <br />
                            <input
                                type="text"
                                value={`${(downPayment / homePrice * 100).toFixed(2)}%`}
                                onChange={(e) => setDownPayment(homePrice * (parseFloat(e.target.value) / 100))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="0.001"
                                value={downPayment / homePrice * 100}
                                onChange={(e) => setDownPayment(homePrice * (parseFloat(e.target.value) / 100))}
                            />
                        </label>

                        {/* Loan Term */}
                        <label>
                            Length of Loan Term: <br />
                            <select value={loanTerm} onChange={(e) => setLoanTerm(+e.target.value)}>
                                {Array.from({ length: 29 }, (_, i) => (i + 2) * 12).map((term) => (
                                    <option key={term} value={term}>
                                        {term} months (or) {term / 12} years
                                    </option>
                                ))}
                            </select>
                            <input
                                type="range"
                                min="12"
                                max="360"
                                value={loanTerm}
                                step="12"
                                onChange={(e) => setLoanTerm(+e.target.value)}
                            />
                        </label>

                        {/* Interest Rate */}
                        <label>
                            Interest rate (%): <br />
                            <input
                                type="text"
                                value={`${interestRate.toFixed(2)}%`}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={interestRate}
                                step="0.001"
                                onChange={(e) => setInterestRate(+e.target.value)}
                            />
                        </label>

                        {/* Home Plan Stay */}
                        <label>
                            You Plan to Stay in This Home: <br />
                            <select value={loanTermHomePlan} onChange={(e) => setLoanTermHomePlan(+e.target.value)}>
                                {Array.from({ length: 29 }, (_, i) => (i + 2) * 12).map((term) => (
                                    <option key={term} value={term}>
                                        {term} months (or) {term / 12} years
                                    </option>
                                ))}
                            </select>
                            <input
                                type="range"
                                min="12"
                                max="360"
                                value={loanTermHomePlan}
                                step="12"
                                onChange={(e) => setLoanTermHomePlan(+e.target.value)}
                            />
                        </label>

                        {/* Property Tax */}
                        <label>
                            Yearly Property Tax Rate (%): <br />
                            <input
                                type="text"
                                value={`${propertyTax.toFixed(2)}%`}
                                onChange={(e) => setPropertyTax(parseFloat(e.target.value))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={propertyTax}
                                onChange={(e) => setPropertyTax(+e.target.value)}
                            />
                        </label>

                        {/* Home Value Increase */}
                        <label>
                            Yearly Home Value Increase Rate (%): <br />
                            <input
                                type="text"
                                value={`${homeValueIncrease.toFixed(2)}%`}
                                onChange={(e) => setHomeValueIncrease(parseFloat(e.target.value))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={homeValueIncrease}
                                onChange={(e) => setHomeValueIncrease(+e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="rightSideBox">
                        <div><span>Total Savings:</span> <span>${totalSavings.toFixed(2)}</span></div>

                        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
                            <span>Renting Payments: ${currentRent * 12}</span>
                            <span>Buying Payments: ${monthlyPayment * 12}</span>
                            <span>Savings On Buying: ${(currentRent * 12 - monthlyPayment * 12).toFixed(2)}</span>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <BarChart width={500} height={300} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip />
                                <Legend />
                                {/* Only use one Bar component */}
                                <Bar dataKey="value" fill="#8884d8">
                                    {/* Assign unique color for each entry in chartData */}
                                    {chartData.map((data, index) => (
                                        <Bar key={index} dataKey="value" fill={data.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </div>


                        <div className="affordrightSideBottom RVBCrightSideBottom">
                            <div><span>Price of Home After Appreciation:</span> <span>${monthlyPayment}</span></div>
                            <div><span>Remaining Balance After 40 year(s):</span> <span>$4,094.08</span></div>
                            <div><span>Equity Earned:</span> <span>$2,208,039.66</span></div>
                            <div><span>Tax Savings (at 28%):</span> <span>$17,360.00</span></div>
                            <div><span>Avg. Monthly Payment Over Time </span> <span>$85,226.38</span><span>$0.00</span></div>
                            <div><span>Total Payment:</span> <span>$40,908,661.69</span><span>$0.00</span></div>
                        </div>
                    </div>

                </div>
                <div className="mortgageCalculatorHeaderContent">
                    <span className="mortgageCalculatorContent">
                        * Note: The calculator above uses these items in its calculations: private mortgage insurance, homeowner's insurance cost, loan closing cost, cost of selling a home, property tax, homeowner's tax saving, and rent increases. Calculator results are estimates only.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RVsBCalculator;
