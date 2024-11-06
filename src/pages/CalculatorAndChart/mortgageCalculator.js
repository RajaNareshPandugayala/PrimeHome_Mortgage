import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

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

    const statesList = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IN", "IL", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NE", "NC", "ND", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WB", "WI", "WY"];

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

    // Handle change for monthlyPayment slider
    const handleMonthlyPaymentChange = (e) => {
        const newMonthlyPayment = +e.target.value;
        setMonthlyPayment(newMonthlyPayment);

        // Reverse calculation to approximate homePrice
        const monthlyInterest = interestRate / 100 / 12;
        const numPayments = loanTerm;
        const adjustedMonthlyPayment = newMonthlyPayment - propertyTax / 12 - insurance / 12 - hoaFees;

        const newPrincipal = monthlyInterest === 0
            ? adjustedMonthlyPayment * numPayments
            : adjustedMonthlyPayment * (Math.pow(1 + monthlyInterest, numPayments) - 1) / (monthlyInterest * Math.pow(1 + monthlyInterest, numPayments));

        const newHomePrice = newPrincipal + downPayment;
        setHomePrice(newHomePrice.toFixed(0));
    };

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
                            Home Price: <br />
                            <input
                                type="number"
                                min="0"
                                value={homePrice}
                                onChange={(e) => setHomePrice(+e.target.value)}
                            />
                            <input
                                type="range"
                                min="0"
                                max="2000000"
                                step="1"
                                value={homePrice}
                                onChange={(e) => setHomePrice(+e.target.value)}
                                style={{ width: "100%" }}
                            />
                        </label>
                        <label>
                            Down Payment: <br />
                            <span>
                                <input type="number" min="0" value={downPayment} onChange={(e) => setDownPayment(+e.target.value)} />
                            </span>
                        </label>

                        <label>
                            Length of Loan: <br />
                            <select value={loanTerm} onChange={(e) => setLoanTerm(+e.target.value)}>
                                {Array.from({ length: 29 }, (_, i) => (i + 2) * 12).map((term) => (
                                    <option key={term} value={term}>
                                        {term} months (or) {term / 12} years
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Interest Rate (%): <br />
                            <input type="number" min="0" max="100" step="0.01" value={interestRate} onChange={(e) => {
                                let value = e.target.value;

                                // Ensure there are no more than two digits after the decimal point
                                const [integer, decimal] = value.split('.');
                                if (decimal && decimal.length > 2) {
                                    value = `${integer}.${decimal.slice(0, 2)}`; // Limit to two decimal places
                                }

                                // Ensure the value is between 0 and 100
                                if (+value < 0) value = "0";
                                if (+value > 100) value = "100";

                                setInterestRate(value);
                            }} />
                        </label>

                        <label>
                            State: <br />
                            <select value={state} onChange={(e) => setState(e.target.value)}>
                                <option value="NONE" disabled>
                                    -Please Select-
                                </option>
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
                        <input
                            type="range"
                            min="300"
                            max="9000"
                            step="0.01"
                            value={monthlyPayment}
                            onChange={handleMonthlyPaymentChange}
                            style={{ width: "100%" }}
                        />
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
                                    position={{ x: 300, y: 50 }}
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
