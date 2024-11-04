// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// function MortgageCalculator() {
//     const [downPayment, setDownPayment] = useState(0);
//     const [loanLength, setLoanLength] = useState(24); // default to 2 years
//     const [interestRate, setInterestRate] = useState(0);
//     const [state, setState] = useState("NONE");
//     const [propertyTax, setPropertyTax] = useState(0);
//     const [insurance, setInsurance] = useState(0);
//     const [hoaFees, setHoaFees] = useState(0);
//     const [estimatedPayment, setEstimatedPayment] = useState(0);

//     const loanLengths = Array.from({ length: 29 }, (_, i) => (i + 2) * 12);
//     const interestRates = Array.from({ length: 21 }, (_, i) => i);

//     const calculateEMI = () => {
//         const principal = 300000 - downPayment;
//         const monthlyInterestRate = interestRate / 100 / 12;
//         const monthlyTax = propertyTax / 12;
//         const monthlyInsurance = insurance / 12;

//         const emi = monthlyInterestRate
//             ? (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanLength)) /
//             (Math.pow(1 + monthlyInterestRate, loanLength) - 1)
//             : principal / loanLength;

//         const totalMonthlyPayment = emi + monthlyTax + monthlyInsurance + hoaFees;
//         setEstimatedPayment(totalMonthlyPayment);
//     };

//     useEffect(() => {
//         calculateEMI();
//     }, [downPayment, loanLength, interestRate, propertyTax, insurance, hoaFees]);

//     const data = {
//         labels: ["Principal + Interest", "Property Tax", "Insurance", "HOA Fees"],
//         datasets: [
//             {
//                 label: "Monthly Payment Breakdown",
//                 data: [
//                     estimatedPayment - propertyTax - insurance - hoaFees,
//                     propertyTax,
//                     insurance,
//                     hoaFees,
//                 ],
//                 backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#32CD32"],
//                 hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#32CD32"],
//             },
//         ],
//     };

//     return (
//         <div className='mortgageCalculatorParent'>
//             <div className="mortgage-calculator mortgageCalculator">
//                 <div className="left-side">
//                     <label>Down Payment</label>
//                     <input
//                         type="number"
//                         value={downPayment}
//                         onChange={(e) => setDownPayment(Number(e.target.value))}
//                     />
//                     <label>Length of Loan (months)</label>
//                     <select value={loanLength} onChange={(e) => setLoanLength(Number(e.target.value))}>
//                         {loanLengths.map((months) => (
//                             <option key={months} value={months}>
//                                 {months} months ({months / 12} years)
//                             </option>
//                         ))}
//                     </select>
//                     <label>Interest Rate (%)</label>
//                     <select value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}>
//                         {interestRates.map((rate) => (
//                             <option key={rate} value={rate}>
//                                 {rate}%
//                             </option>
//                         ))}
//                     </select>
//                     <label>State</label>
//                     <select id="usad_states" value={state} onChange={(e) => setState(e.target.value)}>
//                         <option value="NONE">Please select</option>
//                         <option value="AK">AK</option>
//                         <option value="AL">AL</option>
//                         {/* Continue with other states... */}
//                     </select>
//                     <label>Property Tax</label>
//                     <input
//                         type="number"
//                         value={propertyTax}
//                         onChange={(e) => setPropertyTax(Number(e.target.value))}
//                     />
//                     <label>Homeowner's Insurance</label>
//                     <input
//                         type="number"
//                         value={insurance}
//                         onChange={(e) => setInsurance(Number(e.target.value))}
//                     />
//                     <label>HOA Fees</label>
//                     <input
//                         type="number"
//                         value={hoaFees}
//                         onChange={(e) => setHoaFees(Number(e.target.value))}
//                     />
//                 </div>
//                 <div className="right-side">
//                     <h2>Your estimated monthly payment: ${estimatedPayment.toFixed(2)}</h2>
//                     <div className="chart-container">
//                         <Pie data={data} />
//                         <div className="chart-center">
//                             <span>${estimatedPayment.toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MortgageCalculator;
























import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

// Mortgage Calculator Component
const MortgageCalculator = () => {
    const [homePrice, setHomePrice] = useState(500000);
    const [downPayment, setDownPayment] = useState(66000);
    const [loanTerm, setLoanTerm] = useState(360);
    const [interestRate, setInterestRate] = useState(6.5);
    const [state, setState] = useState("NONE");
    const [propertyTax, setPropertyTax] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [hoaFees, setHoaFees] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const statesList = ["NONE", "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IN", "IL", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NE", "NC", "ND", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WB", "WI", "WY"];
    const loanTerms = Array.from({ length: 29 }, (_, i) => (i + 2) * 12);
    const interestRates = Array.from({ length: 41 }, (_, i) => i * 0.5);

    const calculateEMI = useCallback(() => {
        const principal = homePrice - downPayment;
        const monthlyInterest = interestRate / 100 / 12;
        const numPayments = loanTerm;

        const monthlyEMI =
            monthlyInterest === 0
                ? principal / numPayments
                : (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numPayments)) /
                (Math.pow(1 + monthlyInterest, numPayments) - 1);

        const estimatedPayment = monthlyEMI + propertyTax / 12 + insurance / 12 + hoaFees;
        setMonthlyPayment(estimatedPayment.toFixed(2));
    }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, insurance, hoaFees]);

    useEffect(() => {
        calculateEMI();
    }, [calculateEMI]);

    const data = [
        { name: "Principal & Interest", value: parseFloat(monthlyPayment) - propertyTax / 12 - insurance / 12 - hoaFees },
        { name: "Property Tax", value: propertyTax / 12 },
        { name: "Homeowner's Insurance", value: insurance / 12 },
        { name: "HOA Fees", value: hoaFees },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const hoverBackgroundColor = ["#005bb5", "#008a7f", "#cc9600", "#cc5f29"];

    return (
        <div className="mortgageCalculatorParent">
            <div className="mortgageCalculator" style={{ display: "flex" }}>
                <div className="mortgageCalculatorHeaderContent">
                    <span className="mortgageCalculatorHeader">Monthly Payment Mortgage Calculator*</span>
                    <span className="mortgageCalculatorContent">Use this calculator to see monthly payments for different loan amounts.</span>
                </div>
                <div className="mortgageCalculatorBox">
                    <div className="leftSideBox" style={{ flex: 1, padding: "20px" }}>
                        <label>
                            Home Price: <br /><input type="number" min="0" max="2000000" value={homePrice} onChange={(e) => setHomePrice(+e.target.value)} />
                        </label>
                        <label>
                            Down Payment: <br /><input type="number" min="0" value={downPayment} onChange={(e) => setDownPayment(+e.target.value)} />
                        </label>
                        <label>
                            Length of Loan: <br />
                            <select value={loanTerm} onChange={(e) => setLoanTerm(+e.target.value)}>
                                {loanTerms.map((term) => (
                                    <option key={term} value={term}>
                                        {term} months
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Interest Rate: <br />
                            <select value={interestRate} onChange={(e) => setInterestRate(+e.target.value)}>
                                {interestRates.map((rate) => (
                                    <option key={rate} value={rate}>
                                        {rate}%
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            State: <br />
                            <select value={state} onChange={(e) => setState(e.target.value)}>
                                {statesList.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Property Tax: <br /><input type="number" min="0" value={propertyTax} onChange={(e) => setPropertyTax(+e.target.value)} />
                        </label>
                        <label>
                            Homeowner's Insurance: <br /><input type="number" min="0" value={insurance} onChange={(e) => setInsurance(+e.target.value)} />
                        </label>
                        <label>
                            HOA Fees: <br /><input type="number" min="0" value={hoaFees} onChange={(e) => setHoaFees(+e.target.value)} />
                        </label>
                    </div>
                    <div className="rightSideBox" style={{ flex: 1, padding: "20px", textAlign: "center" }}>
                        <p className="rightSideHeader"> <span className="rightSideHeaderPrice">${monthlyPayment}</span> <span>Your estimated monthly payment</span> </p>
                        <div style={{ display: "inline-block", position: "relative" }}>
                            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                                <Legend
                                    layout="horizontal"
                                    verticalAlign="top"
                                    align="center"
                                    payload={data.map((item, index) => ({
                                        value: item.name,
                                        type: "square",
                                        color: COLORS[index % COLORS.length],
                                    }))}
                                />
                            </div>
                            <PieChart width={600} height={500}>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    innerRadius={160}
                                    outerRadius={220}
                                    fill="#8884d8"
                                    paddingAngle={1}
                                >
                                    {data.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={hoveredIndex === index ? hoverBackgroundColor[index % hoverBackgroundColor.length] : COLORS[index % COLORS.length]}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.5)' }}
                                    position={{ x: 300, y: 50 }} // Fixed position for tooltip
                                />
                            </PieChart>

                            <div className="rightSideHeaderPrice" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold" }}>
                                ${monthlyPayment}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator;
