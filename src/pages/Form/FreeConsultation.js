import React from 'react';

function FreeConsultation() {
    return (
        <div className='purchaseBottomRightBox'>
            <span className='purchaseBottomRightHeading'>Free Consultation</span>
            <span className='purchaseBottomRightContent'>Complete this 30 second form to receive a no obligation consultation. We will analyze your situation and determine the best solution.</span>
            <form className='purchaseBottomRightform'>
                <input type='text' placeholder='NAME:' autoComplete="true" />
                <input type='tel' placeholder='CELL PHONE:' autoComplete="true" />
                <input type='tel' placeholder='WORK PHONE:' autoComplete="true" />
                <select>
                    <option key="NONE" value="NONE">Best Time to Contact</option>
                    <option key="Morning time" value="Morning time">Morning time</option>
                    <option key="Afternoon time" value="Afternoon time">Afternoon time</option>
                    <option key="Evening time" value="Evening time">Evening time</option>
                </select>
                <input type='email' placeholder='EMAIL:' autoComplete="true" />
                <input type='text' placeholder='ZIP CODE:' autoComplete="true" />
                <select>
                    <option key="Refinance" value="Refinance">REFINANCE</option>
                    <option key="Home Purchase" value="Home Purchase">Home Purchase</option>
                    <option key="Home Equity" value="Home Equity">Home Equity</option>
                    <option key="Debt Consolidation" value="Debt Consolidation">Debt Consolidation</option>
                    <option key="Home Improvement" value="Home Improvement">Home Improvement</option>
                    <option key="FHA/VA - Purchase" value="FHA/VA - Purchase">FHA/VA - Purchase</option>
                    <option key="FHA/VA - Refinance" value="FHA/VA - Refinance">FHA/VA - Refinance</option>
                    <option key="Construction Loans" value="Construction Loans">Construction Loans</option>
                </select>
                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    );
}

export default FreeConsultation;
