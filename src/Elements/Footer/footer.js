import React from 'react'
import housingIcon from '../../PicesForPages/equal-housing-opportunity-logo-100-w.png'
import whatappIcon from '../../PicesForPages/WhatsappIcon.png'
import { Link } from 'react-router-dom'



function Footer() {
    // Scroll to the top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll
        });
    };
    return (
        <div className='footerParent'>
            <div className='footerBox'>
                <div className='footerTop'>
                    <div className='footerTopDiv footerTopDiv01'>
                        <span className='footerTopDivHeading'>About Us</span>

                        {/* <span className='footerTopDivContent footerTopDivContent00'>We strive to deliver the highest <br />levels of service to help you <br />reach your goals. We thank you <br />for your trust and support. <br />From the first call to closing, <br />our team is with you every step <br />of the way!</span> */}
                        <span className='footerTopDivContent footerTopDivContent00'>We strive to deliver the highest levels of service to help you reach your goals. We thank you for your trust and support. From the first call to closing, our team is with you every step of the way!</span>
                    </div>
                    <div className='footerTopDiv footerTopDiv01'>
                        <span className='footerTopDiv footerTopDiv00'>
                            <span className='footerTopDivHeading'>Connect With Us</span>
                            <span className='footerTopDivContent footerTopDivContentSM'><i class="ri-facebook-box-fill"></i> <i class="ri-linkedin-box-fill"></i> <i class="ri-mail-fill"></i></span>
                        </span>
                        <span className='footerTopDiv footerTopDiv00 '>
                            <span className='footerTopDivHeading'>Contact Us</span>
                            <span className='footerTopDivContent footerTopDivContent00'>
                                <span className='footerTopDivContentIcon'><i class="ri-map-pin-line"></i> <span>1914 JN PEASE PL <br />CHARLOTTE, NC 28262</span></span>
                                <a href="tel:+1-980-292-1918" className="aTag_Tel footerTopDivContentIcon"><i class="ri-phone-fill"></i> <span>(980) 292-1918</span></a>
                                <a href="mailto: contact@primehomemtg.com" className="aTag_Mail footerTopDivContentIcon"><i class="ri-mail-send-fill"></i> <span>contact@primehomemtg.com</span></a>
                            </span>
                        </span>
                    </div>
                    <div className='footerTopDiv'>
                        <span className='footerTopDivHeading'>Loan Options</span>
                        <span className='footerTopDivContent footerTopDivContent00'>
                            <Link to="/which-loan-is-right-for-me" className="LoanOption LoanOption01">Fixed Rate Mortgage</Link>
                            <Link to="/fha" className="LoanOption LoanOption02">FHA Home Loan</Link>
                            <Link to="/va-loans" className="LoanOption LoanOption03">VA Home Loan</Link>
                            <Link to="/which-loan-is-right-for-me" className="LoanOption LoanOption04">Jumbo Home Loan</Link>
                            <Link to="/which-loan-is-right-for-me" className="LoanOption LoanOption05">First Time Home Buyer</Link>
                            <Link to="/which-loan-is-right-for-me" className="LoanOption LoanOption06">Investment Property Loans</Link>
                            <Link to="/refinancing" className="LoanOption LoanOption07">Refinance</Link>
                        </span>
                    </div>
                    <div className='footerTopDiv'>
                        <span className='footerTopDivHeading'>Resources</span>
                        <span className='footerTopDivContent footerTopDivContent00'>
                            <Link to="/contact-us" className="Resource Resource01">Contact Us</Link>
                            <Link to="quick-quote" className="Resource Resource02">Get A Quote</Link>
                            <Link to='#' className="Resource Resource04">Apply Online</Link>
                            <Link to="/testimonials" className="Resource Resource05">Reviews</Link>
                            <Link to="https://www.nmlsconsumeraccess.org/" target='_blank' className="Resource Resource06">NMLS Consumer Access</Link>
                            <Link to="/ada-accessibility-statement" className="Resource Resource07">ADA Accessibility Statement</Link>
                            <Link to="/privacy-policy" className="Resource Resource03">Privacy Policy</Link>
                        </span>
                    </div>
                </div>
                <div className='footerMiddle'>
                    <img src={housingIcon} alt='houseIcon' className='houseIcon' /><b>Equal Housing Opportunity  </b><br />
                    <span> PrimeHome Mortgage ™ 2024 </span> | <span>Company NMLS: 2658067</span>
                </div>
                <div className='footerBottom'>
                    <span>Licensed in States SC, NC and OR.</span>
                    <span className='footerBottomDown'>
                        <b>Mortgage Website Marketing</b>
                        <span className='footerBottomDown02'>This site is protected by reCAPTCHA and the Google <b>Privacy Policy</b> and <b>Terms of Service</b> apply.</span>
                    </span>
                </div>
                <div className='goTop' onClick={scrollToTop}>
                    <span>TOP</span>
                </div>
                <div className='WhatApp'>
                    <a href="https://wa.link/or01vh" target="_blank" rel="noopener noreferrer">
                        <img src={whatappIcon} alt='whatappIcon' className='whatappIcon' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
