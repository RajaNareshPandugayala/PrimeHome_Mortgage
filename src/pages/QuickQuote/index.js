import React, { useState } from 'react';


function QuickQuote() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        loanOfficer: '',
        coBorrower: '',
        eveningPhone: '',
        workPhone: '',
        contactPreference: '',
        creditRating: '',
        propertyAddress: '',
        city: '',
        state: '',
        zipCode: '',
        loanPurpose: '',
        propertyWillBe: '',
        purchasePrice: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className='quickQuoteParent'>

            <div className='quickQuoteTitleBoxParent'>
                <div className='quickQuoteTitleBox'>
                    <h1 className='quickQuoteTitle'><span>PrimeHome Mortgage, LLC</span> <span>Quick Quote</span></h1>
                </div>
            </div>

            <div className='quickQuoteformParent'>
                <div className='quickQuoteformBox'>
                    <h3 className='quickQuoteformheading'>Short Application</h3>
                    <form onSubmit={handleSubmit} className='quickQuoteform'>
                        <label>
                            First Name*:
                            <br /><input className='quickQuoteformInput'
                                type="text"
                                name="firstName"
                                placeholder="Provide your first name"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoComplete="true"
                                required
                            />
                        </label>

                        <label>
                            Last Name*:
                            <br /><input className='quickQuoteformInput'
                                type="text"
                                name="lastName"
                                placeholder="Provide your last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                autoComplete="true"
                                required
                            />
                        </label>

                        <label>
                            Email Address*:
                            <br /><input className='quickQuoteformInput'
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="true"
                                required
                            />
                        </label>

                        <label>
                            Loan Officer:
                            <br /><select className='quickQuoteformSelect'
                                name="loanOfficer"
                                value={formData.loanOfficer}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-Please Select-</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={`Loan Officer ${i + 1}`}>
                                        Loan Officer {i + 1}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Is there a Co-Borrower?*:
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="coBorrower"
                                        value="Yes"
                                        checked={formData.coBorrower === 'Yes'}
                                        onChange={handleChange}
                                        required
                                    /> Yes
                                </label>
                                <br /><label>
                                    <input
                                        type="radio"
                                        name="coBorrower"
                                        value="No"
                                        checked={formData.coBorrower === 'No'}
                                        onChange={handleChange}
                                    /> No
                                </label>
                            </div>
                        </label>

                        <label>
                            Evening Phone*:
                            <br /><input className='quickQuoteformInput'
                                type="tel"
                                name="eveningPhone"
                                placeholder="Provide your Phone#"
                                value={formData.eveningPhone}
                                onChange={handleChange}
                                autoComplete="true"
                                required
                            />
                        </label>

                        <label>
                            Work Phone:
                            <br /><input className='quickQuoteformInput'
                                type="tel"
                                name="workPhone"
                                placeholder="Provide your work phone"
                                value={formData.workPhone}
                                onChange={handleChange}
                                autoComplete="true"
                            />
                        </label>

                        <label>
                            How Would You Prefer to be contacted:
                            <br /><select className='quickQuoteformSelect'
                                name="contactPreference"
                                value={formData.contactPreference}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-Please Select-</option>
                                <option value="Evening Phone">Evening Phone</option>
                                <option value="Work Phone">Work Phone</option>
                                <option value="Email">Email</option>
                            </select>
                        </label>

                        <label>
                            My / Our Credit is:
                            <br /><select className='quickQuoteformSelect'
                                name="creditRating"
                                value={formData.creditRating}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-Please Select-</option>
                                <option value="Very Good">Very Good</option>
                                <option value="Good">Good</option>
                                <option value="Some Problems">Some Problems</option>
                                <option value="Major Problems">Major Problems</option>
                                <option value="I'm not sure">I'm not sure</option>
                            </select>
                        </label>

                        <h3>Loan and Property Info</h3>
                        <div className='quickQuoteformLoanBox'>
                            <label>
                                Property Address:
                                <br /><input className='quickQuoteformInput'
                                    type="text"
                                    name="propertyAddress"
                                    placeholder="Enter a location"
                                    value={formData.propertyAddress}
                                    onChange={handleChange}
                                    autoComplete="true"
                                />
                            </label>

                            <label>
                                City:
                                <br /><input className='quickQuoteformInput'
                                    type="text"
                                    name="city"
                                    placeholder="Enter city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    autoComplete="true"
                                />
                            </label>

                            <label>
                                State:
                                <br /><select className='quickQuoteformSelect'
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>-Please Select-</option>
                                    {/* List of US states */}
                                    {[
                                        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                                        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
                                        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                                        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                                        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
                                        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                                        'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
                                        'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
                                        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                                        'West Virginia', 'Wisconsin', 'Wyoming'
                                    ].map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                ZIP Code:
                                <br /><input className='quickQuoteformInput'
                                    type="text"
                                    name="zipCode"
                                    placeholder="Enter your location ZIP Code"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    autoComplete="true"
                                />
                            </label>

                            <label>
                                Purpose of Loan*:
                                <br /><select className='quickQuoteformSelect'
                                    name="loanPurpose"
                                    value={formData.loanPurpose}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>-Please Select-</option>
                                    <option value="Purchase">Purchase</option>
                                    <option value="Refinance">Refinance</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Construction - Permanent">Construction - Permanent</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>

                            <label>
                                Property Will Be*:
                                <br /><select className='quickQuoteformSelect'
                                    name="propertyWillBe"
                                    value={formData.propertyWillBe}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled >-Please Select-</option>
                                    <option value="Primary Residence">Primary Residence</option>
                                    <option value="Secondary Residence">Secondary Residence</option>
                                    <option value="Investment Property">Investment Property</option>
                                </select>
                            </label>

                            <label>
                                Purchase Price (or Estimated Value):
                                <br /><input className='quickQuoteformInput'
                                    type="text"
                                    name="purchasePrice"
                                    placeholder="$"
                                    value={formData.purchasePrice}
                                    onChange={handleChange}
                                    autoComplete="true"
                                />
                            </label>
                        </div>
                        <div className='quickQuoteButtonBox'>
                            <button type="submit" className='quickQuoteButton'>Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default QuickQuote;
