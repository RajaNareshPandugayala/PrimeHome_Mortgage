import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const AffordCalculator = () => {
    const [grossIncome, setGrossIncome] = useState(150000);
    const [monthlyDebt, setMonthlyDebt] = useState(2000);
    const [downPayment, setDownPayment] = useState(66000);
    const [loanTerm, setLoanTerm] = useState(360);
    const [interestRate, setInterestRate] = useState(6.5);
    const [pmi, setPmi] = useState(0.4);
    const [insurance, setInsurance] = useState(0);
    const [propertyTax, setPropertyTax] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [homePrice, setHomePrice] = useState(3726819.45);

    const calculateEMI = useCallback(() => {
        const principal = homePrice - downPayment;
        const monthlyInterest = interestRate / 100 / 12;
        const numPayments = loanTerm;

        const monthlyEMI =
            monthlyInterest === 0
                ? principal / numPayments
                : (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numPayments)) /
                (Math.pow(1 + monthlyInterest, numPayments) - 1);

        const estimatedPayment = monthlyEMI + propertyTax / 12 + insurance + pmi / 100 + monthlyDebt;
        setMonthlyPayment(estimatedPayment.toFixed(2));
    }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, insurance, pmi, monthlyDebt]);

    useEffect(() => {
        calculateEMI();
    }, [calculateEMI]);

    const data = [
        { name: "Loan Amount", value: homePrice - downPayment },
        { name: "Downpayment", value: downPayment },
        { name: "Monthly Payment", value: monthlyPayment },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
        <div className="mortgageCalculatorParent">
            <div className="mortgageCalculator">
                <div className="mortgageCalculatorHeaderContent">
                    <span className="mortgageCalculatorHeader">Affordability Calculator*</span>
                    <span className="mortgageCalculatorContent">
                        This calculator will help you to determine how much house you can afford and/or qualify for.
                    </span>
                </div>
                <div className="mortgageCalculatorBox">
                    <div className="leftSideBox">
                        <label>
                            Gross annual income: <br />
                            <input
                                type="text"
                                value={`$ ${Number(grossIncome).toLocaleString()}`}
                                onChange={(e) => setGrossIncome(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1000000"
                                value={grossIncome}
                                onChange={(e) => setGrossIncome(+e.target.value)}
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
                            Down payment: <br />
                            <input
                                type="text"
                                value={`$ ${Number(downPayment).toLocaleString()}`}
                                onChange={(e) => setDownPayment(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1000000"
                                value={downPayment}
                                onChange={(e) => setDownPayment(+e.target.value)}
                            />
                        </label>

                        <label>
                            Annual interest rate (%): <br />
                            <input
                                type="text"
                                value={`${interestRate.toFixed(2)}%`}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")))}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={interestRate}
                                step="0.01"
                                onChange={(e) => setInterestRate(+e.target.value)}
                            />
                        </label>

                        <label>
                            Monthly PMI: <br />
                            <input
                                type="text"
                                value={`${pmi.toFixed(2)}%`}
                                onChange={(e) => setPmi(parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")))}
                            />
                        </label>

                        <label>
                            Monthly insurance: <br />
                            <input
                                type="text"
                                value={`$ ${Number(insurance).toLocaleString()}`}
                                onChange={(e) => setInsurance(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                        </label>

                        <label>
                            Monthly property tax: <br />
                            <input
                                type="text"
                                value={`$ ${Number(propertyTax).toLocaleString()}`}
                                onChange={(e) => setPropertyTax(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                        </label>

                        <label>
                            Length of the mortgage: <br />
                            <select value={loanTerm} onChange={(e) => setLoanTerm(+e.target.value)}>
                                {Array.from({ length: 29 }, (_, i) => (i + 2) * 12).map((term) => (
                                    <option key={term} value={term}>
                                        {term} months (or) {term / 12} years
                                    </option>
                                ))}
                            </select>
                            <input
                                type="range"
                                min="24"
                                max="360"
                                value={loanTerm}
                                step="12"
                                onChange={(e) => setLoanTerm(+e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="rightSideBox ">
                        {/* <h1>Home Price: <span>${Number(homePrice).toLocaleString()}</span></h1> */}

                        <label className="afford_rightSideTop">
                            <span>Home Price: </span>
                            <input
                                type="text"
                                value={`$ ${Number(homePrice).toLocaleString()}`}
                                onChange={(e) => setHomePrice(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                        </label>


                        <div style={{ textAlign: "center" }}>
                            <PieChart width={600} height={500}>
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

                        <div className="affordrightSideBottom">
                            <div><span>Loan Amount: </span><span>${Number((homePrice - downPayment).toFixed(2)).toLocaleString()}</span></div>
                            <div><span>Downpayment:</span><span> ${Number(downPayment.toFixed(2)).toLocaleString()}</span></div>
                            <div><span>Monthly Payment:</span><span> ${Number(monthlyPayment).toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AffordCalculator;
