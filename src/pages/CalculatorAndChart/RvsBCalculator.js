import React, { useEffect, useState, useCallback } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip as ChartTooltip, Legend, Bar, Cell, LabelList } from "recharts";


const RVsBCalculator = () => {
    const [currentRent, setCurrentRent] = useState(2000);
    const [homePrice, setHomePrice] = useState(450000);
    const [downPayment, setDownPayment] = useState(50000);
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(20.0);
    const [loanTerm, setLoanTerm] = useState(360); // Loan term in months
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTermHomePlan, setLoanTermHomePlan] = useState(84); // Duration user plans to stay in months
    const [propertyTax, setPropertyTax] = useState(1);
    const [homeValueIncrease, setHomeValueIncrease] = useState(2);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [paymentType, setPaymentType] = useState("Percentage");



    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    };

    // Update percentage when DownPaymentMoneyInput is updated
    const handleDownPaymentChange = (value) => {
        const downPaymentMoney = parseFloat(value) || 0; // Ensure numeric input
        setDownPayment(downPaymentMoney);

        const percentage = ((downPaymentMoney / homePrice) * 100);
        setDownPaymentPercentage(percentage);
    };

    // const handleDownPaymentPercentageChange = (value) => {

    //     const percentage = parseFloat(value) || 0; // Ensure numeric input
    //     setDownPaymentPercentage(percentage);

    //     const downPaymentMoney = ((percentage / 100) * homePrice);
    //     setDownPayment(downPaymentMoney);


    //     let formattedValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-dot characters

    //     // Allow only one dot in the value
    //     if ((formattedValue.match(/\./g) || []).length > 1) {
    //         formattedValue = formattedValue.slice(0, formattedValue.lastIndexOf('.')) + '.' + formattedValue.split('.').slice(1).join('');
    //     }

    //     // Ensure no more than two digits after the decimal point
    //     const [integer, decimal] = formattedValue.split('.');
    //     if (decimal && decimal.length > 3) {
    //         formattedValue = `${integer}.${decimal.slice(0, 3)}`; // Limit decimal to two places
    //     }

    //     // Ensure the value is between 0 and 100
    //     if (parseFloat(formattedValue) < 0) formattedValue = '0';
    //     if (parseFloat(formattedValue) > 100) formattedValue = '100';

    //     setDownPaymentPercentage(formattedValue);
    // };



    const handleDownPaymentPercentageChange = (value) => {
        let formattedValue = value.toString().replace(/[^0-9.]/g, ''); // Ensure it's a string and sanitize input

        // Allow only one dot in the value
        if ((formattedValue.match(/\./g) || []).length > 1) {
            formattedValue = formattedValue.slice(0, formattedValue.lastIndexOf('.')) + '.' + formattedValue.split('.').slice(1).join('');
        }

        // Ensure no more than two digits after the decimal point
        const [integer, decimal] = formattedValue.split('.');
        if (decimal && decimal.length > 3) {
            formattedValue = `${integer}.${decimal.slice(0, 3)}`; // Limit decimal to three places
        }

        // Ensure the value is between 0 and 100
        if (parseFloat(formattedValue) < 0) formattedValue = '0';
        if (parseFloat(formattedValue) > 100) formattedValue = '100';

        setDownPaymentPercentage(formattedValue);

        const downPaymentMoney = ((parseFloat(formattedValue) / 100) * homePrice) || 0;
        setDownPayment(downPaymentMoney);
    };



    // Helper to calculate monthly mortgage payment (EMI)
    const calculateEMI = useCallback(() => {
        const principal = homePrice * (1 - downPaymentPercentage / 100);
        const monthlyInterestRate = interestRate / 100 / 12;

        const monthlyEMI =
            monthlyInterestRate === 0
                ? principal / loanTerm
                : (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
                (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);

        const propertyTaxMonthly = (propertyTax / 100) * homePrice / 12;

        const monthlyAppreciation =
            (homePrice * Math.pow(1 + homeValueIncrease / 100, loanTermHomePlan / 12) - homePrice) /
            loanTermHomePlan;

        setMonthlyPayment((monthlyEMI + propertyTaxMonthly - monthlyAppreciation).toFixed(2));
    }, [homePrice, downPaymentPercentage, loanTerm, interestRate, propertyTax, homeValueIncrease, loanTermHomePlan]);


    // Calculate values dependent on inputs
    useEffect(() => {
        calculateEMI();
    }, [calculateEMI]);

    const priceOfHomeAfterAppreciation =
        homePrice * Math.pow(1 + homeValueIncrease / 100, loanTermHomePlan / 12);

    // Calculate remaining loan balance
    const remainingBalance = useCallback(() => {
        const principal = homePrice * (1 - downPaymentPercentage / 100);
        const monthlyInterestRate = interestRate / 100 / 12;
        const paymentsMade = loanTermHomePlan;

        if (monthlyInterestRate === 0) {
            return principal - (principal / loanTerm) * paymentsMade;
        } else {
            const balance =
                principal *
                (Math.pow(1 + monthlyInterestRate, loanTerm) -
                    Math.pow(1 + monthlyInterestRate, paymentsMade)) /
                (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
            return balance;
        }
    }, [homePrice, downPaymentPercentage, interestRate, loanTerm, loanTermHomePlan]);

    const equityEarned = priceOfHomeAfterAppreciation - remainingBalance();
    const totalRentPaid = currentRent * loanTermHomePlan;
    const totalBuyingCost = monthlyPayment * loanTermHomePlan;
    const savings = totalRentPaid - totalBuyingCost;
    const savingsDisplayValue = Math.abs(savings);  // Always display positive value

    // Tax savings (simplified for demonstration)
    const taxSavingsAt28Percent = monthlyPayment * loanTermHomePlan * 0.28;

    const chartData = [
        { name: "Renting Payments", value: totalRentPaid, color: "#dc143c" },
        { name: "Buying Payments", value: totalBuyingCost, color: "#008f3e" },
        {
            name: "Savings On Buying",
            value: savingsDisplayValue,
            color: savings < 0 ? "#ffa500" : "#00c06d" // Orange for negative, green for positive
        },
    ];



    // PieChart size Adjust dimensions based on screen size
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSmallScreen = viewportWidth <= 500;

    // Adjust dimensions based on screen size
    const pieChartWidth = isSmallScreen ? 380 : 430;
    const pieChartHeight = isSmallScreen ? 300 : 300;
    // const innerRadius = isSmallScreen ? 110 : 130;
    // const outerRadius = isSmallScreen ? 150 : 180;


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
                            Down Payment (%) / $: <br />
                            <span>
                                <div className="DownPaymentDiv">
                                    <input
                                        type="text"
                                        min="0"
                                        max={homePrice}
                                        value={`$ ${Number(downPayment).toLocaleString()}`}
                                        onChange={(e) => handleDownPaymentChange(+e.target.value.replace(/[^0-9.-]+/g, ""))}
                                        className={`DownPaymentMoneyInput ${paymentType === "Percentage" ? "hidden" : ""}`}
                                        placeholder="Enter Down Payment"
                                    />
                                    <span className={`DownPaymentPercentageInputSpan ${paymentType === "Money" ? "hidden" : ""
                                        }`}>
                                        <input
                                            type="text"
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            className="DownPaymentPercentageInput"
                                            value={downPaymentPercentage}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/[^0-9.]/g, '');

                                                // Allow only one decimal point
                                                if ((value.match(/\./g) || []).length > 1) {
                                                    value = value.slice(0, -1);
                                                }

                                                // Ensure no more than three digits after the decimal point
                                                const [integer, decimal] = value.split('.');
                                                if (decimal && decimal.length > 3) {
                                                    value = `${integer}.${decimal.slice(0, 3)}`; // Limit to three decimal places
                                                }

                                                // Ensure the value is between 0 and 100
                                                if (+value < 0) value = "0";
                                                if (+value > 100) value = "100";

                                                handleDownPaymentPercentageChange(value);
                                            }}
                                        />
                                        <span style={{ position: "relative", left: "-5%", marginLeft: "-17px", fontWeight: "bold" }}>
                                            %
                                        </span>
                                    </span>
                                    <select name="DownPaymentType" className="DownPaymentType"
                                        onChange={handlePaymentTypeChange}
                                        value={paymentType}>
                                        <option value="Money">$</option>
                                        <option value="Percentage">%</option>
                                    </select>
                                </div>
                            </span>
                            <input
                                type="range"
                                value={downPaymentPercentage}
                                step="0.01"
                                onChange={(e) => handleDownPaymentPercentageChange(+e.target.value)}
                            />
                        </label>


                        {/* Loan Term */}
                        <label>
                            Length of Loan Term: <br />
                            <select value={loanTerm} onChange={(e) => setLoanTerm(+e.target.value)}>
                                {Array.from({ length: 40 }, (_, i) => (i + 1) * 12).map((term) => (
                                    <option key={term} value={term}>
                                        {term} months (or) {term / 12} year(s)
                                    </option>
                                ))}
                            </select>
                            <input
                                type="range"
                                min="12"
                                max="480"
                                value={loanTerm}
                                step="12"
                                onChange={(e) => setLoanTerm(+e.target.value)}
                            />
                        </label>

                        {/* Interest Rate */}
                        <label>
                            Interest rate (%): <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    value={interestRate}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9.]/g, '');

                                        // Allow only one decimal point
                                        if ((value.match(/\./g) || []).length > 1) {
                                            value = value.slice(0, -1);
                                        }

                                        // Ensure there are no more than two digits after the decimal point
                                        const [integer, decimal] = value.split('.');
                                        if (decimal && decimal.length > 2) {
                                            value = `${integer}.${decimal.slice(0, 3)}`; // Limit to two decimal places
                                        }

                                        // Ensure the value is between 0 and 100
                                        if (+value < 0) value = "0";
                                        if (+value > 100) value = "100";

                                        setInterestRate(value);
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

                        {/* Home Plan Stay */}
                        <label>
                            You Plan to Stay in This Home: <br />
                            <select value={loanTermHomePlan} onChange={(e) => setLoanTermHomePlan(+e.target.value)}>
                                {Array.from({ length: 40 }, (_, i) => (i + 1) * 12).map((term) => (
                                    <option key={term} value={term}>
                                        {term} months (or) {term / 12} year(s)
                                    </option>
                                ))}
                            </select>
                            <input
                                type="range"
                                min="12"
                                max="480"
                                value={loanTermHomePlan}
                                step="12"
                                onChange={(e) => setLoanTermHomePlan(+e.target.value)}
                            />
                        </label>

                        {/* Property Tax */}
                        <label>
                            Yearly Property Tax Rate (%): <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    value={propertyTax}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9.]/g, '');

                                        // Allow only one decimal point
                                        if ((value.match(/\./g) || []).length > 1) {
                                            value = value.slice(0, -1);
                                        }

                                        // Ensure there are no more than two digits after the decimal point
                                        const [integer, decimal] = value.split('.');
                                        if (decimal && decimal.length > 2) {
                                            value = `${integer}.${decimal.slice(0, 3)}`; // Limit to two decimal places
                                        }

                                        // Ensure the value is between 0 and 100
                                        if (+value < 0) value = "0";
                                        if (+value > 100) value = "100";

                                        setPropertyTax(value);
                                    }}
                                    style={{ width: '100%' }} // Adjust width as needed
                                />
                                <span style={{ marginLeft: '-30px', fontWeight: "bold" }}>%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={propertyTax}
                                step="0.01"
                                onChange={(e) => setPropertyTax(+e.target.value)}
                            />
                        </label>


                        {/* Home Value Increase */}
                        <label>
                            Yearly Home Value Increase Rate (%):  <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    min="0"
                                    max="100"
                                    step="0.001"
                                    value={homeValueIncrease}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9.]/g, '');

                                        // Allow only one decimal point
                                        if ((value.match(/\./g) || []).length > 1) {
                                            value = value.slice(0, -1);
                                        }

                                        // Ensure there are no more than two digits after the decimal point
                                        const [integer, decimal] = value.split('.');
                                        if (decimal && decimal.length > 2) {
                                            value = `${integer}.${decimal.slice(0, 3)}`; // Limit to two decimal places
                                        }

                                        // Ensure the value is between 0 and 100
                                        if (+value < 0) value = "0";
                                        if (+value > 100) value = "100";

                                        setHomeValueIncrease(value);
                                    }}
                                    style={{ width: '100%' }} // Adjust width as needed
                                />
                                <span style={{ marginLeft: '-30px', fontWeight: "bold" }}>%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={homeValueIncrease}
                                step="0.01"
                                onChange={(e) => setHomeValueIncrease(+e.target.value)}
                            />
                        </label>

                    </div>

                    <div className="rightSideBox RVsBCalculatorRightSideBox">
                        <div><span>Total Savings:</span>
                            <span>
                                <h1>Buying:
                                    <span style={{ color: savings < 0 ? 'red' : 'inherit' }}>     {savings < 0 ? ` $${savingsDisplayValue.toLocaleString()}` : `$${savingsDisplayValue.toLocaleString()}`}
                                    </span>
                                </h1>
                            </span>
                        </div>


                        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>
                            <BarChart width={pieChartWidth} height={pieChartHeight} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="value">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                    <LabelList dataKey="value" position="middle" fill="white" formatter={(value) => `$${value.toLocaleString()}`} />
                                </Bar>
                            </BarChart>
                        </div>

                        <div className="affordrightSideBottom RVBCrightSideBottom">
                            <div><span><b>Result Returned</b></span><span><b>Rent</b></span><span><b>Buy</b></span></div>
                            <div><span>Price of Home After Appreciation:</span> <span></span> <span>${priceOfHomeAfterAppreciation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div><span>Remaining Balance After {loanTermHomePlan / 12} year(s):</span> <span></span> <span>${remainingBalance().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div><span>Equity Earned:</span> <span></span> <span>${equityEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div><span>Tax Savings (at 28%):</span> <span></span> <span>${(taxSavingsAt28Percent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div><span>Avg. Monthly Payment Over Time </span> <span>${(totalRentPaid / loanTermHomePlan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span>${(totalBuyingCost / loanTermHomePlan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div><span>Total Payment:</span> <span>${totalRentPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span>${totalBuyingCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
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
