import React, { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const AffordCalculator = () => {
    const [grossIncome, setGrossIncome] = useState(70000);
    const [monthlyDebt, setMonthlyDebt] = useState(250);
    const [downPayment, setDownPayment] = useState(20000);
    const [loanTerm, setLoanTerm] = useState(360);
    const [interestRate, setInterestRate] = useState(7);
    const [pmi, setPmi] = useState(0);
    const [DebtToIncomePercentage, setDebtToIncomePercentage] = useState(36);
    const [insurance, setInsurance] = useState(0); // Monthly insurance
    const [propertyTaxRate, setPropertyTaxRate] = useState(0); // Annual property tax rate as a percentage
    const [hoaFees, setHoaFees] = useState(0);
    const [homePrice, setHomePrice] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);


    // Function to calculate maximum home price
    const calculateHomePrice = useCallback(() => {
        const monthlyIncome = grossIncome / 12;
        const maxMonthlyPayment = (DebtToIncomePercentage / 100) * monthlyIncome - monthlyDebt;

        const monthlyInterestRate = interestRate / 100 / 12;
        const n = loanTerm;

        const loanAmountCalculated = maxMonthlyPayment / (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -n)));
        return loanAmountCalculated + downPayment;
    }, [grossIncome, monthlyDebt, downPayment, interestRate, loanTerm, DebtToIncomePercentage]);

    // Function to calculate monthly payment
    const calculateMonthlyPayment = useCallback(() => {
        const homePriceCalculated = calculateHomePrice();
        const principal = homePriceCalculated - downPayment;
        setLoanAmount(principal);

        const monthlyInterestRate = interestRate / 100 / 12;
        const n = loanTerm;
        const monthlyEMI = principal * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -n)));

        // Property tax as a monthly cost
        const monthlyPropertyTax = (propertyTaxRate / 100) * homePriceCalculated / 12;

        // PMI (Private Mortgage Insurance)
        const monthlyPMI = (pmi / 100) * principal / 12;

        // Total of additional costs over the loan term
        const totalAdjustments = (monthlyPMI + monthlyPropertyTax + insurance + hoaFees) * loanTerm;

        // Adjusted home price
        const adjustedHomePrice = homePriceCalculated - totalAdjustments;

        setHomePrice(adjustedHomePrice);

        // Total monthly payment
        const totalMonthlyPayment = monthlyEMI - monthlyPMI - monthlyPropertyTax - insurance - hoaFees;

        setMonthlyPayment(totalMonthlyPayment.toFixed(2));
    }, [calculateHomePrice, downPayment, interestRate, loanTerm, hoaFees, insurance, propertyTaxRate, pmi]);


    useEffect(() => {
        calculateMonthlyPayment();
    }, [calculateMonthlyPayment]);

    const data = [
        { name: "Loan Amount", value: loanAmount },
        { name: "Downpayment", value: downPayment },
        { name: "Monthly Payment", value: monthlyPayment },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];



    // PieChart size Adjust dimensions based on screen size
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSmallScreen = viewportWidth <= 500;

    // Adjust dimensions based on screen size
    const pieChartWidth = isSmallScreen ? 300 : 400;
    const pieChartHeight = isSmallScreen ? 350 : 420;
    const innerRadius = isSmallScreen ? 110 : 130;
    const outerRadius = isSmallScreen ? 150 : 180;


    return (
        <div className="mortgageCalculatorParent">
            <div className="mortgageCalculator">
                <div className="mortgageCalculatorHeaderContent">
                    <span className="mortgageCalculatorHeader">Affordability Calculator</span>
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
                                step="100"
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
                            Annual interest rate (%):  <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    value={interestRate}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9.]/g, ''); // Remove invalid characters

                                        // Allow only one decimal point
                                        if ((value.match(/\./g) || []).length > 1) {
                                            value = value.slice(0, -1);
                                        }

                                        // Ensure no more than two decimal places
                                        const [integer, decimal] = value.split('.');
                                        if (decimal && decimal.length > 2) {
                                            value = `${integer}.${decimal.slice(0, 2)}`;
                                        }

                                        // Ensure the value is between 0 and 100
                                        let numericValue = parseFloat(value) || 0; // Parse the numeric value or default to 0
                                        if (numericValue < 0) numericValue = 0;
                                        if (numericValue > 100) numericValue = 100;

                                        setInterestRate(numericValue); // Update state
                                    }}

                                    style={{ width: '100%' }} // Adjust width as needed
                                />
                                <span style={{ marginLeft: '-30px', fontWeight: "bold" }}>%</span>
                            </div>
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
                            Debt-to-income: (%):  <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    value={DebtToIncomePercentage}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9.]/g, ''); // Remove invalid characters

                                        // Allow only one decimal point
                                        if ((value.match(/\./g) || []).length > 1) {
                                            value = value.slice(0, -1);
                                        }

                                        // Ensure no more than two decimal places
                                        const [integer, decimal] = value.split('.');
                                        if (decimal && decimal.length > 2) {
                                            value = `${integer}.${decimal.slice(0, 2)}`;
                                        }

                                        // Ensure the value is between 0 and 100
                                        let numericValue = parseFloat(value) || 0; // Parse the numeric value or default to 0
                                        if (numericValue < 0) numericValue = 0;
                                        if (numericValue > 100) numericValue = 100;

                                        setDebtToIncomePercentage(numericValue); // Update state
                                    }}

                                    style={{ width: '100%' }} // Adjust width as needed
                                />
                                <span style={{ marginLeft: '-30px', fontWeight: "bold" }}>%</span>
                            </div>
                        </label>


                        <label>
                            Length of the mortgage: <br />
                            <select value={loanTerm} onChange={(e) => setLoanTerm(+e.target.value)}>
                                {Array.from({ length: 39 }, (_, i) => (i + 2) * 12).map((term) => (
                                    <option key={term} value={term}>
                                        {term} months (or) {term / 12} years
                                    </option>
                                ))}
                            </select>
                            <input
                                type="range"
                                min="24"
                                max="480"
                                value={loanTerm}
                                step="12"
                                onChange={(e) => setLoanTerm(+e.target.value)}
                            />
                        </label>

                        <label>
                            Monthly Private Mortgage Insurance (PMI): (%):  <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    value={pmi}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9.]/g, ''); // Remove invalid characters

                                        // Allow only one decimal point
                                        if ((value.match(/\./g) || []).length > 1) {
                                            value = value.slice(0, -1);
                                        }

                                        // Ensure no more than two decimal places
                                        const [integer, decimal] = value.split('.');
                                        if (decimal && decimal.length > 2) {
                                            value = `${integer}.${decimal.slice(0, 2)}`;
                                        }

                                        // Ensure the value is between 0 and 100
                                        let numericValue = parseFloat(value) || 0; // Parse the numeric value or default to 0
                                        if (numericValue < 0) numericValue = 0;
                                        if (numericValue > 100) numericValue = 100;

                                        setPmi(numericValue); // Update state
                                    }}

                                    style={{ width: '100%' }} // Adjust width as needed
                                />
                                <span style={{ marginLeft: '-30px', fontWeight: "bold" }}>%</span>
                            </div>
                        </label>


                        <label>
                            Monthly property tax:  <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    value={propertyTaxRate}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9.]/g, ''); // Remove invalid characters

                                        // Allow only one decimal point
                                        if ((value.match(/\./g) || []).length > 1) {
                                            value = value.slice(0, -1);
                                        }

                                        // Ensure no more than two decimal places
                                        const [integer, decimal] = value.split('.');
                                        if (decimal && decimal.length > 2) {
                                            value = `${integer}.${decimal.slice(0, 2)}`;
                                        }

                                        // Ensure the value is between 0 and 100
                                        let numericValue = parseFloat(value) || 0; // Parse the numeric value or default to 0
                                        if (numericValue < 0) numericValue = 0;
                                        if (numericValue > 100) numericValue = 100;

                                        setPropertyTaxRate(numericValue); // Update state
                                    }}

                                    style={{ width: '100%' }} // Adjust width as needed
                                />
                                <span style={{ marginLeft: '-30px', fontWeight: "bold" }}>%</span>
                            </div>
                        </label>

                        <label>
                            Monthly Home insurance: <br />
                            <input
                                type="text"
                                value={`$ ${Number(insurance).toLocaleString()}`}
                                onChange={(e) => setInsurance(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                        </label>

                        <label>
                            Monthly HOA dues: <br />
                            <input
                                type="text"
                                min="0"
                                value={`$ ${Number(hoaFees).toLocaleString()}`}
                                onChange={(e) => setHoaFees(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                        </label>

                    </div>

                    <div className="rightSideBox">
                        <label className="afford_rightSideTop">
                            <span>Home Price: </span>
                            <input
                                type="text"
                                value={`$ ${Number(homePrice.toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                onChange={(e) => setHomePrice(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                            />
                        </label>

                        <div style={{ textAlign: "center" }}>
                            <PieChart width={pieChartWidth} height={pieChartHeight}>
                                <Pie data={data} dataKey="value" innerRadius={innerRadius} outerRadius={outerRadius} fill="#8884d8" paddingAngle={1}>
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`$ ${Number(Math.round(value)).toLocaleString()}`, name]}
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.5)' }}
                                />
                            </PieChart>
                        </div>

                        <div className="affordrightSideBottom">
                            <div><span>Loan Amount: </span><span>${Number((homePrice - downPayment).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div><span>Downpayment:</span><span> ${Number(downPayment.toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div><span>Monthly Payment:</span><span> ${Number(monthlyPayment).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        </div>


                        {(homePrice - downPayment) <= 0 && (
                            <div className="affordRightSideBottom RACrightSideBottom00">
                                <div><span style={{ color: "red" }}>Based on industry standards you may not qualify for a home mortgage. You may need to adjust your income or debt obligations.</span></div>
                            </div>
                        )}

                    </div>
                </div>
            </div >
        </div >
    );
};

export default AffordCalculator;
