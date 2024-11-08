import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../PicesForPages/LogoForPrimeHomeMortgage.png';

function Header() {
    return (
        <div className='headerParent'>
            <div className='headerBox'>
                <Link to="/" className='headerLogoDiv'>
                    <img src={Logo} alt='Logo' className='headerLogo' />
                </Link>
                <div className='headerMenu'>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Purchase &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li><Link to="/Purchase">Purchase</Link></li>
                            <li><Link to="/Paperwork">PaperWork Needed</Link></li>
                            {/* <li><Link to="/how-much-can-i-afford-calculator">How Much Can I Afford?</Link></li> */}
                            <li>How Much Can I Afford?</li>
                            <li><Link to="/what-will-my-monthly-payment-be-calculator">What Will My Monthly Payment Be</Link></li>
                            <li><Link to="/QuickQuote">Quick Quote</Link></li>
                            <li>Apply Now</li>
                            <li><Link to="/FHA">FHA Loans</Link></li>
                            <li><Link to="/VA-Loans">VA Loans</Link></li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Refinance &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li><Link to="/Refinancing">Refinancing</Link></li>
                            <li><Link to="/Cash-Out-Refinance">Cash Out Refinance</Link></li>
                            <li>Refinance Analysis</li>
                            <li><Link to="/QuickQuote">Quick Quote</Link></li>
                            <li>Apply Now</li>
                            <li><Link to="/fha-va-streamline">FHA / VA Streamline Refinancing</Link></li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Tools &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li><Link to="/Free-Reports">Get Informative Free Reports</Link></li>
                            <li>How Much Can I Afford</li>
                            <li><Link to="/what-will-my-monthly-payment-be-calculator">What Will My Monthly Payment Be</Link></li>
                            <li>Renting Versus Buying Calculator</li>
                            <li>Refinance Analysis Calculator</li>
                            <li>Consolidation Calculator</li>
                            <li><Link to="/Paperwork">PaperWork Needed</Link></li>
                            <li><Link to="/the-loan-process">The Loan Process</Link></li>
                            <li><Link to="/Glossary-Terms">Glossary of Mortgage Terms</Link></li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Contact &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li>Apply Now</li>
                            <li><Link to="/About-Us">About Us</Link></li>
                            <li><Link to="/our-staff">Meet Our Team</Link></li>
                            <li><Link to="/Contact-Us">Contact Us</Link></li>
                        </span>
                    </ul>
                    <a href="tel:+1-###-###-####" className="headerMenu_Tel">(###)-###-####</a>
                    <button className='headerMenuButton'>Apply Now</button>


                    {/* Deleted-Testing code for customr details are sent Gmail through FORM  */}
                    {/* <span className='headerMenuUI_Header'><Link to="/Test-Mail-Through-Form">TestMailThroughForm</Link></span> */}


                </div>
            </div>
        </div>
    )
}

export default Header;
