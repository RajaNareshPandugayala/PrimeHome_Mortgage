import React, { useState, useEffect, useMemo } from 'react';
import PostImage01 from '../../PicesForPages/34336_fed_blog_post.jpg';
import PostImage02 from '../../PicesForPages/33606_thinking_about_refi.jpg';
import PostImage03 from '../../PicesForPages/32975_retiring_mortgage.jpg';
import PostImage04 from '../../PicesForPages/34924_tapping_equity.jpg';
import PostImage05 from '../../PicesForPages/34615_interest_rate_cuts.jpg';
import PostImage06 from '../../PicesForPages/34567_refi15.jpg';
import house from '../../PicesForPages/house.png';
import calendar from '../../PicesForPages/calendar-5.png';
import smartphoneHand from '../../PicesForPages/smartphone-7.png';
import smartphoneVoice from '../../PicesForPages/smartphone-6.png';
import blankPhoto from '../../PicesForPages/blank.jpg';
import officeWorkLaptop from '../../PicesForPages/loan-office-work-table.jpg';
import loseIcon from '../../PicesForPages/lose.png';
import coinHand from '../../PicesForPages/coinHand.png';
import piggyBank from '../../PicesForPages/piggy-bank.png';
import houseMoney from '../../PicesForPages/houseMoney.png';
import rollerStick from '../../PicesForPages/066-roller.png';
import CreditCard from '../../PicesForPages/cc.png';
import time2 from '../../PicesForPages/time2.png';
import payMoney from '../../PicesForPages/pay.png';
import thumbsUp from '../../PicesForPages/thumbsUp.png';
import news from '../../PicesForPages/news.jpg';
import MortgageCalculator from '../CalculatorAndChart/mortgageCalculator';
// import calcSmall from '../../PicesForPages/calc-small.jpg';
import ChatBotPurchase from '../Form/ChatBotPurchase';
import ChatBotRefinance from '../Form//ChatBotRefinance';

import { Link } from 'react-router-dom';
import HomePageMonthlyPayment from '../CalculatorAndChart/homePageMonthlyPayment';



function Home() {
    const texts = useMemo(() => [
        // "Lower Your Payment",
        // "Lower Your Rate",
        // "Get Your First Home",
        // "Get Your Dream Home",
        // "Get Cash Out",
        "Let’s Partner Up to Secure Your Ideal Home Loan.",
        "Together, We’ll Find the Best Mortgage Solution for You.",
        "Let’s Join Forces to Make Your Homeownership Dream a Reality.",
        "Together, We’ll Achieve the Best Rate and Terms for Your Home Loan.",
        "Let’s Collaborate to Unlock the Perfect Mortgage for You.",
        "Working Hand in Hand to Reach Your Home Financing Goals.",
        "Let’s Team Up to Secure the Best Deal for Your Future Home.",
        "Together, We’ll Navigate the Path to Your Dream Home Loan."
    ], []);

    const [currentText, setCurrentText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeChatBot, setActiveChatBot] = useState(null); // null, "purchase", or "refinance"
    const typingSpeed = 100;
    const deletingSpeed = 50;

    useEffect(() => {
        const handleTyping = () => {
            const fullText = texts[currentTextIndex];

            if (!isDeleting) {
                setCurrentText((prev) => fullText.substring(0, prev.length + 1));
                if (currentText === fullText) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                setCurrentText((prev) => fullText.substring(0, prev.length - 1));
                if (currentText === "") {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        };

        const typingInterval = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearInterval(typingInterval);
    }, [currentText, isDeleting, texts, currentTextIndex]);



    return (
        <div className='homeParent'>
            <div className='homePageFirstImage'></div>
            <div className='homeHelpYouBoxParent'>
                <div className='homeHelpYouBox'>
                    {activeChatBot === null && (
                        <>
                            <span className='homeHelpYouHeading'>
                                <span className='homeHelpYouHeadingLeft'>Let's Help You... </span><br />
                                <span className='homeHelpYouHeadingRight'>
                                    <span className="typingText">{currentText}</span>
                                </span>
                            </span>
                            <span className='homeHelpYouContent'>
                                Your Dream Home, Your Best Deal – Prime Home Mortgage Makes It Happen! <br />Click our prequalifier to get started!
                            </span>
                            <span className='homeHelpYouButton'>
                                <button
                                    className='homeHelpYouButtonLeft'
                                    onClick={() => setActiveChatBot("purchase")}
                                >
                                    Purchase
                                </button>
                                <button
                                    className='homeHelpYouButtonRight'
                                    onClick={() => setActiveChatBot("refinance")}
                                >
                                    Refinance
                                </button>
                                <Link to='/what-will-my-monthly-payment-be-calculator' className='homeHelpYouButtonMP_Link'>
                                    Monthly Payment</Link>
                            </span>
                        </>
                    )}

                    {/* Conditional Rendering for ChatBotPurchase */}
                    {activeChatBot === "purchase" && (
                        <span className='homeHelpYouChatBot'>
                            <ChatBotPurchase />
                        </span>
                    )}

                    {/* Conditional Rendering for ChatBotRefinance */}
                    {activeChatBot === "refinance" && (
                        <span className='homeHelpYouChatBot'>
                            <ChatBotRefinance />
                        </span>
                    )}
                </div>
            </div>
            <div className='welcomeBoxParent'>
                <div className='welcomeBox'>
                    <span className='welcomeHeading'>Welcome To Prime Home Mortgage, LLC</span>
                    {/* <span className='welcomeContent'>At Prime Home Mortgage, LLC, we treat each customer as an individual, not a number. We don't place you into a loan profile formula created by the banking industry. We use "common sense" and will help you obtain the best loan possible. We represent a wide range of "A" rated lenders with first quality rates to private "hardship" lenders.</span>
                    <span className='welcomeContent'>We work with more than 100 investors. This allows us to get you the best rates on all types of loan programs including: 30yr mortgage, 20yr mortgage, 15yr mortgage, 10yr mortgage, 1yr ARMS, 3yr ARMS, 5yr ARMS, Conventional, Jumbo, Home Equity Lines, VA and Commercial. Whether your situation calls for Full Documents, No Documents, Non-Owner Occupied (Investor) or Multi-Family, we'll fit your needs!</span> */}
                    <span>
                        At Prime Home Mortgage, we believe in putting you first. Our mission is simple: to provide you with the best mortgage options tailored to your unique needs. Whether you're buying your first home, refinancing, or seeking other home loan solutions, our team is committed to offering you the best rates and clear, honest guidance.
                        <br /><br />
                        We’re here to make your home financing experience easy, transparent, and worry-free. Let’s get started on the path to your dream home today!
                        <br /><br />
                        At Prime Home Mortgage Incorporated, we understand that finding the right home loan is a big decision. That’s why we offer a range of options to help you finance or refinance your home with ease. We take the time to compare the top lenders in the industry, ensuring we find the one that best fits your needs and goals. We're here to guide you every step of the way, making the process as smooth and stress-free as possible.
                        <br /><br />
                        At Prime Home Mortgage Incorporated, we truly understand that buying or refinancing a home is a life-changing experience. That’s why we offer a wide variety of home loan options, designed to fit your unique needs and financial situation. We take the time to carefully compare top lenders, ensuring we find the best match for your goals, whether you're purchasing your first home or refinancing your current one. Our team is dedicated to supporting you every step of the way, providing expert guidance and personalized care to make the process as simple, stress-free, and rewarding as possible. Your dreams are our priority, and we’re here to help you make them a reality.
                        <br /><br />
                        At Prime Home Mortgage, we prioritize your needs by offering a wide range of affordable, flexible home loan options. Whether you're buying your first home or refinancing, our dedicated team is here to provide clear, honest guidance and the best rates. We carefully compare top lenders to find the perfect fit for your unique situation, ensuring a smooth, stress-free experience. Your dreams are important to us, and we’re committed to helping you achieve them with ease and confidence. Let us make your home financing journey simple and worry-free.
                    </span>
                </div>
            </div>
            <div className='OurSatisfiedBoxParent'>
                <div className='OurSatisfiedBox'>
                    <span className='OurSatisfiedHeading'>Our Satisfied Clients</span>
                    <span className='OurSatisfiedContentBox'>
                        <span className='OurSatisfiedStars'><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i></span>
                        <span className='OurSatisfiedContent'>Awesome! Our Funding experience with Prime Home Mortgage, LLC was beyond my expectations! As a first time home-owner everything was new to me. But they had amazing communications (even though I did most of it online). And I got a better rate than my bank quoted me!</span>
                        <span className='OurSatisfiedNameLocation'>
                            <span className='OurSatisfiedName'>- Jill and Andrew Miles</span>
                            <span className='OurSatisfiedLocation'>Charlotte, North Carolina</span>
                        </span>
                        {/* <span>dot</span> */}
                    </span>
                </div>
                <span className='OurSatisfiedArrows'>
                    <i class="ri-arrow-left-wide-fill OurSatisfiedLeftArrow"></i>
                    <i class="ri-arrow-right-wide-fill OurSatisfiedRightArrow"></i>
                </span>
            </div>
            <div className='latestBoxParent'>
                <div className='latestBox'>
                    <span className='latestHeading'>Latest Blog Posts</span>
                    <div className='latestContentBoxParent'>
                        <div className='latestContentBox' style={{ display: "none" }}>
                            <span className='latestContentBoxSpanImage'>
                                <img src={PostImage01} alt='PostImage01' className='latestContentBoxImage' />
                            </span>
                            <span className='latestContentBoxContentBox'>
                                <span className='latestContentBoxDate'>Oct 17, 2024</span>
                                <span className='latestContentBoxHeading'>How The Fed Affects Mortgage Rates</span>
                                <span className='latestContentBoxContent'>When it comes to mortgage rates, the Federal Reserve plays an influential but indirect role. The Fed doesn’t set mortgage rates directly, but its decisions around interest rates significantly impact the financial landscape,...</span>
                                <span className='latestContentBoxReadMore'>Read More <i class="ri-arrow-right-circle-line"></i></span>
                            </span>
                        </div>
                        <div className='latestContentBox' style={{ display: "none" }}>
                            <span className='latestContentBoxSpanImage'>
                                <img src={PostImage02} alt='PostImage02' className='latestContentBoxImage' />
                            </span>
                            <span className='latestContentBoxContentBox'>
                                <span className='latestContentBoxDate'>Sep 12, 2024</span>
                                <span className='latestContentBoxHeading'>Thinking About Refinancing?</span>
                                <span className='latestContentBoxContent'>Mortgage rates have dropped once again, offering a unique opportunity for both homebuyers and current homeowners, with rates at their lowest rate in over 18 months. For homeowners, this may be the perfect time...</span>
                                <span className='latestContentBoxReadMore'>Read More <i class="ri-arrow-right-circle-line"></i></span>
                            </span>
                        </div>
                        <div className='latestContentBox' style={{ display: "none" }}>
                            <span className='latestContentBoxSpanImage'>
                                <img src={PostImage03} alt='PostImage03' className='latestContentBoxImage' />
                            </span>
                            <span className='latestContentBoxContentBox'>
                                <span className='latestContentBoxDate'>Aug 15, 2024</span>
                                <span className='latestContentBoxHeading'>Retiring with a Mortgage: What You Need to Know</span>
                                <span className='latestContentBoxContent'>While it’s true that mortgage debt can feel like a burden in retirement, it’s important to remember that your home remains a valuable asset. According to a recent study from the Michigan Retirement and Disability Research...</span>
                                <span className='latestContentBoxReadMore'>Read More <i class="ri-arrow-right-circle-line"></i></span>
                            </span>
                        </div>
                        <div className='latestContentBox latestContentBox01'>
                            <span className='latestContentBoxSpanImage'>
                                <img src={PostImage04} alt='PostImage01' className='latestContentBoxImage' />
                            </span>
                            <span className='latestContentBoxContentBox'>
                                <span className='latestContentBoxDate'>Nov 25, 2024</span>
                                <span className='latestContentBoxHeading'>Tapping Your Equity After Rate Cuts</span>
                                <span className='latestContentBoxContent'>In today’s dynamic real estate market, homeowners are discovering new opportunities to leverage their home’s equity. With recent shifts in the economic landscape, many property owners are finding themselve...</span>
                                <Link to='/tapping_your_equity_after_rate_cuts' className='latestContentBoxContentBox_Link'>
                                    <span className='latestContentBoxReadMore'>Read More <i class="ri-arrow-right-circle-line"></i></span>
                                </Link>
                            </span>
                        </div>
                        <div className='latestContentBox'>
                            <span className='latestContentBoxSpanImage'>
                                <img src={PostImage05} alt='PostImage02' className='latestContentBoxImage' />
                            </span>
                            <span className='latestContentBoxContentBox'>
                                <span className='latestContentBoxDate'>Nov 08, 2024</span>
                                <span className='latestContentBoxHeading'>Federal Reserve Rate Cuts</span>
                                <span className='latestContentBoxContent'>The Federal Reserve’s recent decision to cut interest rates has brought a sense of cautious optimism to the housing market and broader economy. On Thursday, the Fed reduced its key benchmark borrowing rate by a quarter...</span>
                                <Link to='/federal_reserve_rate_cuts' className='latestContentBoxContentBox_Link'>
                                    <span className='latestContentBoxReadMore'>Read More <i class="ri-arrow-right-circle-line"></i></span>
                                </Link>
                            </span>
                        </div>
                        <div className='latestContentBox'>
                            <span className='latestContentBoxSpanImage'>
                                <img src={PostImage06} alt='PostImage03' className='latestContentBoxImage' />
                            </span>
                            <span className='latestContentBoxContentBox'>
                                <span className='latestContentBoxDate'>Nov 01, 2024</span>
                                <span className='latestContentBoxHeading'>Refi Into A 15 Year Mortgage?</span>
                                <span className='latestContentBoxContent'>Refinancing to a 15-year mortgage is an option many homeowners consider when interest rates drop. This type of refinance allows you to pay off your mortgage faster, potentially saving on long-term interest costs....</span>
                                <Link to='/refi_into_a_15_year_mortgage' className='latestContentBoxContentBox_Link'>
                                    <span className='latestContentBoxReadMore'>Read More <i class="ri-arrow-right-circle-line"></i></span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='purchasingBoxParent'>
                <div className='purchasingBox'>
                    <span className='purchasingHeading'>Purchasing</span>
                    <span className='purchasingContent'>We work conforming and non-conforming real estate loans.</span>
                    <span className='purchasingButton'>CLICK HERE FOR MORE</span>
                </div>
            </div>

            < MortgageCalculator />

            <div className='advantageBoxParent'>
                <div className='advantageBox'>
                    <div className='advantageHeading'>The Prime Home Mortgage, LLC Advantage</div>
                    <div className='advantageContentBoxParent'>
                        <span className='advantageContentBox'>
                            <span className='advantageContentBoxSpanImage'>
                                <img src={house} alt='house' />
                            </span>
                            <span className='advantageContentBoxHeading'>Local Knowledge</span>
                            <span className='advantageContentBoxContent'>We know the area and the market and we're part of your community, not a bot on the net :)</span>
                        </span>
                        <span className='advantageContentBox'>
                            <span className='advantageContentBoxSpanImage'>
                                <img src={calendar} alt='calender' />
                            </span>
                            <span className='advantageContentBoxHeading'>Fast Processing</span>
                            <span className='advantageContentBoxContent'>We work to close your loan as quickly as possible. We can even hit curveballs!</span>
                        </span>
                        <span className='advantageContentBox'>
                            <span className='advantageContentBoxSpanImage'>
                                <img src={smartphoneHand} alt='smartphoneHand' />
                            </span>
                            <span className='advantageContentBoxHeading'>Best Service</span>
                            <span className='advantageContentBoxContent'>We have the latest online tech like secure mobile uploading and we're available to use the device the old-fashioned way too!</span>
                        </span>
                        <span className='advantageContentBox'>
                            <span className='advantageContentBoxSpanImage'>
                                <img src={smartphoneVoice} alt='smartphoneVoice' />
                            </span>
                            <span className='advantageContentBoxHeading'>Utilizing Technology</span>
                            <span className='advantageContentBoxContent'>We have the latest online tech like secure mobile uploading and we're available to use the device the old-fashioned way too!</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='teamBoxParent'>
                <div className='teamBox'>
                    <span className='teamHeading'>Meet Our Team</span>
                    <span className='teamContent'>Our team at Prime Home Mortgage, LLC is fast, friendly, experienced and here to help you every step of the process!</span>
                    <div className='teamListBoxParent'>
                        <div className='teamListBox'>
                            <span className='teamListSpanImage'>
                                <img src={blankPhoto} alt='blankPhoto01' />
                            </span>
                            <span className='teamListNameOfficer'>
                                <span className='teamListName'>---- --------- -------</span>
                                <span className='teamListOfficer'>Loan Officer</span>
                            </span>
                        </div>
                        <div className='teamListBox'>
                            <span className='teamListSpanImage'>
                                <img src={blankPhoto} alt='blankPhoto02' />
                            </span>
                            <span className='teamListNameOfficer'>
                                <span className='teamListName'>----- -------</span>
                                <span className='teamListOfficer'>Loan Officer</span>
                            </span>
                        </div>
                        <div className='teamListBox'>
                            <span className='teamListSpanImage'>
                                <img src={blankPhoto} alt='blankPhoto03' />
                            </span>
                            <span className='teamListNameOfficer'>
                                <span className='teamListName'>---- ------- -----</span>
                                <span className='teamListOfficer'>Loan Officer</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='addressBoxParent'>
                <div className='addressBox'>
                    <div className='addressHeading'>The Prime Home Mortgage, LLC Address</div>
                    <div className='addressMapDetails'>
                        <iframe title="PrimeHome Mortgage, LLC Office Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.399256645242!2d-80.77742482422828!3d35.32090577270577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541dc848bbd15b%3A0x2b6ff7553848568!2s1914%20J%20N%20Pease%20Pl%2C%20Charlotte%2C%20NC%2028262%2C%20USA!5e0!3m2!1sen!2sin!4v1732532106241!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <span className='addressDetails'>
                            <span className='addressDetailsTop'>
                                <span className='addressDetailsTopHeading'>Contact Us:</span>
                                <span>Email: contact@primehomemtg.com</span>
                                <span>Phone: (###)-###-####</span>
                                <span>Address: <br />1914 JN PEASE PL
                                    <br />CHARLOTTE, NC <br />28262</span>
                            </span>
                            <span className='addressDetailsBottom'>
                                <span className='addressDetailsBottomHeading'>Office Hours:</span>
                                <span>Monday-Friday: 9am to 6pm</span>
                                <span>Saturday: 10am to 2pm</span>
                                <span>Sunday: Closed</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className='refinanceBoxParent'>
                <div className='refinanceBox'>
                    <div className='refinanceContentBox'>
                        <span className='refinanceContentBoxHeading'>Refinance</span>
                        <span className='refinanceContentBoxContent'>We can help you lock in a long term fixed rate and get out of your ARM.</span>
                        <span className='refinanceContentBoxButton'>CLICK HERE FOR MORE</span>
                    </div>
                    <span className='refinanceSpanImage'>
                        <img src={officeWorkLaptop} alt='officeWorkLaptop' />
                    </span>
                </div>
            </div>
            <div className='reHistoricalBoxParent'>
                <div className='reHistoricalBox'>
                    <span className='reHistoricalHeading'>Refinance with Historically Low Rates!</span>
                    <div className='reHistoricalContentBoxParent'>
                        <div className='reHistoricalContentBox'>
                            <span className='reHistoricalContentBoxSpanImage'>
                                <img src={loseIcon} alt='loseIcon' />
                            </span>
                            <span className='reHistoricalContentBoxHeading'>Lower Monthly Payment</span>
                            <span className='reHistoricalContentBoxContent'>Take advantage of today's historically low rates, a lower payment can provide security in uncertain times.</span>
                            <b>Good For</b>
                            <span className='reHistoricalContentBoxBottomParent'>
                                <span className='reHistoricalContentBoxBottom'>
                                    <span className='reHistoricalContentBoxBottomSpanImage'>
                                        <img src={coinHand} alt='coinHand' />
                                    </span>
                                    <span className='reHistoricalContentBoxBottomText'>Extra Monthly Money</span>
                                </span>
                                <span className='reHistoricalContentBoxBottom'>
                                    <span className='reHistoricalContentBoxBottomSpanImage'>
                                        <img src={piggyBank} alt='piggyBank' />
                                    </span>
                                    <span className='reHistoricalContentBoxBottomText'>Retirement Savings!</span>
                                </span>
                            </span>
                            <span className='reHistoricalContentBoxButton'>Reduce My Payment</span>
                        </div>
                        <div className='reHistoricalContentBox'>
                            <span className='reHistoricalContentBoxSpanImage'>
                                <img src={houseMoney} alt='houseMoney' />
                            </span>
                            <span className='reHistoricalContentBoxHeading'>Get Cash Out</span>
                            <span className='reHistoricalContentBoxContent'>If your house has increased in value, you can use that equity to get cash-out, for whatever you need!</span>
                            <b>Good For</b>
                            <span className='reHistoricalContentBoxBottomParent'>
                                <span className='reHistoricalContentBoxBottom'>
                                    <span className='reHistoricalContentBoxBottomSpanImage'>
                                        <img src={rollerStick} alt='rollerStick' />
                                    </span>
                                    <span className='reHistoricalContentBoxBottomText'>Home Improvement</span>
                                </span>
                                <span className='reHistoricalContentBoxBottom'>
                                    <span className='reHistoricalContentBoxBottomSpanImage'>
                                        <img src={CreditCard} alt='CreditCard' />
                                    </span>
                                    <span className='reHistoricalContentBoxBottomText'>Paying high-interest debt</span>
                                </span>
                            </span>
                            <span className='reHistoricalContentBoxButton'>Use My Equity</span>
                        </div>
                        <div className='reHistoricalContentBox'>
                            <span className='reHistoricalContentBoxSpanImage'>
                                <img src={time2} alt='time2' />
                            </span>
                            <span className='reHistoricalContentBoxHeading'>Shorten Your Loan Term</span>
                            <span className='reHistoricalContentBoxContent'>Rates on 15 year mortgages can make the payment similar but the pay-off years sooner!</span>
                            <b>Good For</b>
                            <span className='reHistoricalContentBoxBottomParent'>
                                <span className='reHistoricalContentBoxBottom'>
                                    <span className='reHistoricalContentBoxBottomSpanImage'>
                                        <img src={payMoney} alt='payMoney' />
                                    </span>
                                    <span className='reHistoricalContentBoxBottomText'>Lower money towards interest</span>
                                </span>
                                <span className='reHistoricalContentBoxBottom'>
                                    <span className='reHistoricalContentBoxBottomSpanImage'>
                                        <img src={thumbsUp} alt='thumbsUp' />
                                    </span>
                                    <span className='reHistoricalContentBoxBottomText'>Paying off the home sooner!</span>
                                </span>
                            </span>
                            <span className='reHistoricalContentBoxButton'>Shorten My Team</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='purchasingBoxParent purchasingBoxParent00'>
                <div className='purchasingBox'>
                    <span className='purchasingHeading'>Apply Now</span>
                    <span className='purchasingContent'>Get started with our easy online application.</span>
                    <span className='purchasingButton'>CLICK HERE FOR MORE</span>
                </div>
            </div>
            <div className='latestNewsBoxParent'>
                <div className='latestNewsBox'>
                    <span className='latestNewsSpanImage'>
                        <img src={news} alt='news' />
                    </span>
                    <div className='latestNewContentBox'>
                        <span className='latestNewHeading'>Latest News</span>
                        <span className='latestNewContent01'>
                            Eurozone Bond Investors Increasingly Focused on Public Finances Correction</span>
                        <span className='latestNewContent02'>Investors in eurozone government bonds have shifted their focus to public finances, Societe Generale said, adding the negative outlooks assigned by Moody’s on Belgium and by Fitch on France were a wake-up call.</span>
                    </div>
                </div>
            </div>
            <div className='purchasingBoxParent purchasingBoxParent01'>
                <div className='purchasingBox purchasingBox01'>
                    <ul>
                        <span className='purchasingHeading purchasingHeading01'>Learning Center</span>
                        <li>The loan process</li>
                        <li>How much can I afford?</li>
                        <li>Refinance analysis</li>
                        <li>What Will My Monthly Payment Be?</li>
                        <li>Mortgage Terms Explained</li>
                    </ul>
                    <div></div>
                </div>
            </div>
            <HomePageMonthlyPayment />
        </div >
    );
};

export default Home;