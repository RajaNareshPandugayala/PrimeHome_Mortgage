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
                            <li>Refinancing</li>
                            <li>Cash Out Refinance</li>
                            <li>Refinance Analysis</li>
                            <li>Quick Quote</li>
                            <li>Apply Now</li>
                            <li>FHA / VA Streamline Refinancing</li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Tools &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li>Get Informative Free Reports</li>
                            <li>How Much Can I Afford</li>
                            <li>What Will My Monthly Payment Be</li>
                            <li>Renting Versus Buying Calculator</li>
                            <li>Refinance Analysis Calculator</li>
                            <li>Consolidation Calculator</li>
                            <li>PaperWork Needed</li>
                            <li>The Loan Process</li>
                            <li>Glossary of Mortgage Terms</li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Contact &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li>Apply Now</li>
                            <li>About Us</li>
                            <li>Meet Our Team</li>
                            <li>Contact Us</li>
                        </span>
                    </ul>
                    <a href="tel:+1-###-###-####" className="headerMenu_Tel">(###)-###-####</a>
                    <button className='headerMenuButton'>Apply Now</button>
                </div>
            </div>
        </div>
    )
}

export default Header;
