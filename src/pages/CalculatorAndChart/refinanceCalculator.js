import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const RefinanceCalculator = () => {
    const [principalBalance, setPrincipalBalance] = useState(150000);
    const [monthlyDebt, setMonthlyDebt] = useState(2000);
    const [downPayment] = useState(66000); // Removing `setDownPayment` if unused
    const [homePrice] = useState(3726819.45); // Removing `setHomePrice` if unused
    const [loanTerm, setLoanTerm] = useState(360);
    const [currentInterestRate, setCurrentInterestRate] = useState(6.5);
    const [refinanceInterestRate, setRefinanceInterestRate] = useState(6.5);
    const [closingCosts, setClosingCosts] = useState(0);
    const [financeClosingCosts, setFinanceClosingCosts] = useState("No");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);
    const calculateEMI = useCallback(() => {
        const principal = homePrice - downPayment;
        const monthlyInterest = refinanceInterestRate / 100 / 12;
        const numPayments = loanTerm;

        const monthlyEMI =
            monthlyInterest === 0
                ? principal / numPayments
                : (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numPayments)) /
                (Math.pow(1 + monthlyInterest, numPayments) - 1);

        setMonthlyPayment(monthlyEMI.toFixed(2));
        setMonthlySavings((principalBalance - monthlyEMI).toFixed(2));
    }, [homePrice, downPayment, loanTerm, refinanceInterestRate, principalBalance]);

    useEffect(() => {
        calculateEMI();
    }, [calculateEMI]);

    // If they are meant to be used later, add the following lines above them:
    // eslint-disable-next-line no-unused-vars
    const displayMonthlyPayment = `$ ${Number(Math.round(monthlyPayment / 12)).toLocaleString()}`;
    // eslint-disable-next-line no-unused-vars
    const displayMonthlySavings = `$ ${Number(Math.round(monthlySavings / 12)).toLocaleString()}`;



    const data = [
        { name: 'Monthly Payment', value: Math.round(monthlyPayment / 12) },
        { name: 'Monthly Savings', value: Math.round(monthlySavings / 12) },
        // Add other data points as needed
    ];


    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className="mortgageCalculatorParent">
            <div className="mortgageCalculator">
                <div className="mortgageCalculatorHeaderContent">
                    <h1 className="mortgageCalculatorHeader">Refinance Analysis Calculator*</h1>
                    <p className="mortgageCalculatorContent RefinanceCalculatorContent">
                        This calculator will help you to decide whether or not you should refinance your current mortgage at a lower interest rate. Not only will this calculator calculate the monthly payment and net interest savings, but it will also calculate how many months it will take to break even on the closing costs.
                    </p>
                </div>
                <div className="mortgageCalculatorBox">
                    <div className="leftSideBox">
                        <label>
                            Principal balance of your mortgage: <br />
                            <input
                                type="text"
                                value={`$ ${Number(principalBalance).toLocaleString()}`}
                                onChange={(e) => setPrincipalBalance(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1000000"
                                value={principalBalance}
                                onChange={(e) => setPrincipalBalance(+e.target.value)}
                            />
                        </label>

                        <label>
                            Monthly debt payments: <br />
                            <input
                                type="text"
                                value={`$ ${Number(monthlyDebt).toLocaleString()}`}
                                onChange={(e) => setMonthlyDebt(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="50000"
                                value={monthlyDebt}
                                onChange={(e) => setMonthlyDebt(+e.target.value)}
                            />
                        </label>

                        <label>
                            Your mortgage's current interest rate (%): <br />
                            <input
                                type="text"
                                value={`${currentInterestRate.toFixed(2)}%`}
                                onChange={(e) => setCurrentInterestRate(parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={currentInterestRate}
                                step="0.01"
                                onChange={(e) => setCurrentInterestRate(+e.target.value)}
                            />
                        </label>

                        <label>
                            Interest rate you will be refinancing at (%): <br />
                            <input
                                type="text"
                                value={`${refinanceInterestRate.toFixed(2)}%`}
                                onChange={(e) => setRefinanceInterestRate(parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={refinanceInterestRate}
                                step="0.01"
                                onChange={(e) => setRefinanceInterestRate(+e.target.value)}
                            />
                        </label>

                        <label>
                            Number of years you will be refinancing for: <br />
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
                                max="480"
                                step="12"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(+e.target.value)}
                                style={{ width: "100%" }}
                            />
                        </label>

                        <label>
                            Closing costs: <br />
                            <select onChange={(e) => setClosingCosts(e.target.value)}>
                                <option value="Dollar">Dollar Amount</option>
                                <option value="Percentage">Percentage Points</option>
                            </select>
                            <input
                                type="text"
                                value={`$ ${Number(closingCosts).toLocaleString()}`}
                                onChange={(e) => setClosingCosts(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                        </label>

                        <label>
                            Would you like to finance the closing costs? <br />
                            <select value={financeClosingCosts} onChange={(e) => setFinanceClosingCosts(e.target.value)}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                    </div>

                    <div className="rightSideBox RACrightSideBox">
                        <div className="RACrightSideDiv">
                            <div><span>Monthly payment will be if you refinance: </span><b>{`$ ${Number(Math.round(monthlyPayment / 12)).toLocaleString()}`} </b></div>
                            <div><span>Your Monthly Savings will be:</span><b>{`$ ${Number(Math.round(monthlySavings / 12)).toLocaleString()}`}</b></div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <PieChart width={500} height={500}>
                                <Pie data={data} dataKey="value" innerRadius={160} outerRadius={220} fill="#8884d8" paddingAngle={1}>
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`$ ${Number(value).toLocaleString()}`, name]}
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.5)' }}
                                />
                            </PieChart>
                        </div>

                        <div className="affordRightSideBottom RACrightSideBottom00">
                            <div><span>If you refinance your current {currentInterestRate}% mortgage to a {refinanceInterestRate}% mortgage, your monthly payment will decrease by ${monthlySavings} and you will pay an additional $916,299.18 in interest charges over the life of the mortgage.</span></div>
                        </div>
                        <div className="affordrightSideBottom RACrightSideBottom">
                            <div><span>This is how much your monthly payment will be if you refinance:</span> <span>${monthlyPayment}</span></div>
                            <div><span>Monthly Payment Reduction:</span> <span>$4,094.08</span></div>
                            <div><span># of months for interest savings to offset closing costs:</span> <span>1</span></div>
                            <div><span>This is how much interest you will pay under your current plan:</span> <span>$1,743.00</span></div>
                            <div><span>This is how much interest you will pay under your refinanced plan: </span><span>$1,247,588.39</span></div>
                            <div><span>This is how much interest you will save if you refinance:</span> <span>$0.00</span></div>
                            <div><span>Net Refinancing Savings: </span><span>$0.00</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefinanceCalculator;
