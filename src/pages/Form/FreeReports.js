import React from 'react';

function FreeReports() {
    return (
        <div className='purchaseBottomRightBox'>
            <span className='purchaseBottomRightHeading'>Your Free Report</span>
            <span className='purchaseBottomRightContent'>Just fill out the form below and select the free report(s) you wish to receive, and you they will be emailed to you right away.</span>
            <form className='purchaseBottomRightform'>
                <input type='text' placeholder='FIRST NAME:' autoComplete="true" />
                <input type='text' placeholder='LAST NAME:' autoComplete="true" />
                <input type='email' placeholder='EMAIL:' autoComplete="true" />
                {/* <b>
                    <label for="choice">
                        Free Reports* <br />
                        <label for="creditScore"><input type="checkbox" value="creditScore" id="creditScore" name="creditScore" autocomplete="true" required /> 10 Secrets To Raising Your Credit Score</label><br />
                        <label for="bestPrice"><input type="checkbox" value="bestPrice" id="bestPrice" name="bestPrice" autocomplete="true" required /> How To Get The Best Price On Your Real Estate Purchase</label><br />
                        <label for="reduceDebt"><input type="checkbox" value="reduceDebt" id="reduceDebt" name="reduceDebt" /> Tips To Reduce Debt</label><br /><br />
                    </label>
                </b> */}

                <b>Free Reports*</b>
                <label htmlFor="creditScore" className='freeReportscheckbox' >
                    <input type="checkbox" value="creditScore" id="creditScore" name="reports" required /> 10 Secrets To Raising Your Credit Score
                </label>
                <label htmlFor="bestPrice" className='freeReportscheckbox' >
                    <input type="checkbox" value="bestPrice" id="bestPrice" name="reports" required /> How To Get The Best Price On Your Real Estate Purchase
                </label>
                <label htmlFor="reduceDebt" className='freeReportscheckbox' >
                    <input type="checkbox" value="reduceDebt" id="reduceDebt" name="reports" required /> Tips To Reduce Debt
                </label>
                <br />

                <button className='freeReportsBottomButton' type='submit'>SUBMIT</button>
            </form>
        </div>
    );
}

export default FreeReports;
