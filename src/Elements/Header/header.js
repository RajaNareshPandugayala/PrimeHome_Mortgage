import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../PicesForPages/LogoPrimeHomeMortgageIcon.png';
import menuButton from '../../PicesForPages/menu.png';

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

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
                            <li><Link to="/purchase">Purchase</Link></li>
                            <li><Link to="/paper-work">PaperWork Needed</Link></li>
                            <li><Link to="/how-much-can-i-afford-calculator">How Much Can I Afford?</Link></li>
                            {/* <li>How Much Can I Afford?</li> */}
                            <li><Link to="/what-will-my-monthly-payment-be-calculator">What Will My Monthly Payment Be</Link></li>
                            <li><Link to="/quick-quote">Quick Quote</Link></li>
                            <li><Link to='#' >ApplyNow</Link></li>
                            <li><Link to="/fha">FHA Loans</Link></li>
                            <li><Link to="/va-loans">VA Loans</Link></li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Refinance &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li><Link to="/refinancing">Refinancing</Link></li>
                            <li><Link to="/cash-out-refinance">Cash Out Refinance</Link></li>
                            <li><Link to="/refinance-analysis-calculator">Refinance Analysis</Link></li>
                            <li><Link to="/quick-quote">Quick Quote</Link></li>
                            <li><Link to='#' >ApplyNow</Link></li>
                            <li><Link to="/fha-va-streamline">FHA / VA Streamline Refinancing</Link></li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Tools &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li><Link to="/free-reports">Get Informative Free Reports</Link></li>
                            <li><Link to="/how-much-can-i-afford-calculator">How Much Can I Afford?</Link></li>
                            <li><Link to="/what-will-my-monthly-payment-be-calculator">What Will My Monthly Payment Be</Link></li>
                            <li><Link to="renting-versus-buying-calculator">Renting Versus Buying Calculator</Link></li>
                            <li><Link to="/refinance-analysis-calculator">Refinance Analysis Calculator</Link></li>
                            <li><Link to="/debt-consolidation-calculator">Consolidation Calculator</Link></li>
                            <li><Link to="/paper-work">PaperWork Needed</Link></li>
                            <li><Link to="/the-loan-process">The Loan Process</Link></li>
                            <li><Link to="/glossary-terms">Glossary of Mortgage Terms</Link></li>
                        </span>
                    </ul>
                    <ul className='headerMenuUI'>
                        <span className='headerMenuUI_Header'>Contact &#x025BF;</span>
                        <span className='headerMenuUI_LI'>
                            <li><Link to='#' >ApplyNow</Link></li>
                            <li><Link to="/about-us">About Us</Link></li>
                            <li><Link to="/our-staff">Meet Our Team</Link></li>
                            <li><Link to="/contact-us">Contact Us</Link></li>
                        </span>
                    </ul>
                    <a href="tel:+1-980-292-1918" className="headerMenu_Tel">(980) 292-1918</a>
                    <button className='headerMenuButton'>Apply Now</button>


                    {/* Deleted-Testing code for customr details are sent Gmail through FORM  */}
                    {/* <span className='headerMenuUI_Header'><Link to="/test-mail-through-form">TestMailThroughForm</Link></span> */}
                </div>
                <div className='headerMenuMobileView'>
                    {/* <ul className='headerMenuUI headerMenuUI00'>
                        <span className='headerMenuUI_Header'>Tools &#x025BF;</span>
                        <span className='headerMenuUI_LI headerMenuUI_LI00' >
                            <li><Link to="/free-reports">Get Informative Free Reports</Link></li>
                            <li><Link to="/how-much-can-i-afford-calculator">How Much Can I Afford?</Link></li>
                            <li><Link to="/what-will-my-monthly-payment-be-calculator">What Will My Monthly Payment Be</Link></li>
                            <li><Link to="renting-versus-buying-calculator">Renting Versus Buying Calculator</Link></li>
                            <li><Link to="/refinance-analysis-calculator">Refinance Analysis Calculator</Link></li>
                            <li><Link to="/debt-consolidation-calculator">Consolidation Calculator</Link></li>
                            <li><Link to="/paper-work">PaperWork Needed</Link></li>
                            <li><Link to="/the-loan-process">The Loan Process</Link></li>
                            <li><Link to="/glossary-terms">Glossary of Mortgage Terms</Link></li>
                        </span>
                    </ul> */}
                    {!menuOpen ? (
                        <img
                            src={menuButton}
                            alt="Menu Button"
                            id="menubtn"
                            onClick={toggleMenu}
                        />
                    ) : (
                        <span
                            id="closebtn"
                            onClick={toggleMenu}
                        >
                            X
                        </span>
                    )}
                    {menuOpen && (
                        <div className='headerMenuMobileView headerMenuMobileViewlist' ref={menuRef}>
                            <ul className='headerMenuUI'>
                                <span className='headerMenuUI_Header'>Purchase &#x025BF;</span>
                                <span className='headerMenuUI_LI'>
                                    <li><Link to="/purchase" onClick={toggleMenu}>Purchase</Link></li>
                                    <li><Link to="/paper-work" onClick={toggleMenu}>PaperWork Needed</Link></li>
                                    <li><Link to="/how-much-can-i-afford-calculator" onClick={toggleMenu}>How Much Can I Afford?</Link></li>
                                    {/* <li>How Much Can I Afford?</li> */}
                                    <li><Link to="/what-will-my-monthly-payment-be-calculator" onClick={toggleMenu}>What Will My Monthly Payment Be</Link></li>
                                    <li><Link to="/quick-quote" onClick={toggleMenu}>Quick Quote</Link></li>
                                    <li><Link to='' onClick={toggleMenu}>Apply Now</Link></li>
                                    <li><Link to="/fha" onClick={toggleMenu}>FHA Loans</Link></li>
                                    <li><Link to="/va-loans" onClick={toggleMenu}>VA Loans</Link></li>
                                </span>
                            </ul>
                            <ul className='headerMenuUI'>
                                <span className='headerMenuUI_Header'>Refinance &#x025BF;</span>
                                <span className='headerMenuUI_LI'>
                                    <li><Link to="/refinancing" onClick={toggleMenu}>Refinancing</Link></li>
                                    <li><Link to="/cash-out-refinance" onClick={toggleMenu}>Cash Out Refinance</Link></li>
                                    <li><Link to="/refinance-analysis-calculator" onClick={toggleMenu}>Refinance Analysis</Link></li>
                                    <li><Link to="/quick-quote" onClick={toggleMenu}>Quick Quote</Link></li>
                                    <li><Link to='' onClick={toggleMenu}>Apply Now</Link></li>
                                    <li><Link to="/fha-va-streamline" onClick={toggleMenu}>FHA / VA Streamline Refinancing</Link></li>
                                </span>
                            </ul>
                            <ul className='headerMenuUI'>
                                <span className='headerMenuUI_Header'>Tools &#x025BF;</span>
                                <span className='headerMenuUI_LI'>
                                    <li><Link to="/free-reports" onClick={toggleMenu}>Get Informative Free Reports</Link></li>
                                    <li><Link to="/how-much-can-i-afford-calculator" onClick={toggleMenu}>How Much Can I Afford?</Link></li>
                                    <li><Link to="/what-will-my-monthly-payment-be-calculator" onClick={toggleMenu}>What Will My Monthly Payment Be</Link></li>
                                    <li><Link to="renting-versus-buying-calculator" onClick={toggleMenu}>Renting Versus Buying Calculator</Link></li>
                                    <li><Link to="/refinance-analysis-calculator" onClick={toggleMenu}>Refinance Analysis Calculator</Link></li>
                                    <li><Link to="/debt-consolidation-calculator" onClick={toggleMenu}>Consolidation Calculator</Link></li>
                                    <li><Link to="/paper-work" onClick={toggleMenu}>PaperWork Needed</Link></li>
                                    <li><Link to="/the-loan-process" onClick={toggleMenu}>The Loan Process</Link></li>
                                    <li><Link to="/glossary-terms" onClick={toggleMenu}>Glossary of Mortgage Terms</Link></li>
                                </span>
                            </ul>
                            <ul className='headerMenuUI'>
                                <span className='headerMenuUI_Header'>Contact &#x025BF;</span>
                                <span className='headerMenuUI_LI'>
                                    {/* <li><Link to='' onClick={toggleMenu}>Apply Now</Link></li> */}
                                    <li><Link onClick={toggleMenu}>Apply Now</Link></li>
                                    <li><Link to="/about-us" onClick={toggleMenu}>About Us</Link></li>
                                    <li><Link to="/our-staff" onClick={toggleMenu}>Meet Our Team</Link></li>
                                    <li><Link to="/contact-us" onClick={toggleMenu}>Contact Us</Link></li>
                                </span>
                            </ul>
                            <a href="tel:+1-980-292-1918" className="headerMenu_Tel"><i class="ri-phone-fill"></i> (980) 292-1918</a>
                            <button className='headerMenuButton'>Apply Now</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;
