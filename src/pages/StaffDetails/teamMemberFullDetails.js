import React, { useState } from 'react';
import COR from '../../PicesForPages/officermortgagePage.jpg';

import MortgageCalculator from '../CalculatorAndChart/mortgageCalculator';
import ClientReview from '../Client_Review/clientReview';
import BlogPostInAPage from '../blogPages/BlogPagePosts/blogPostInAPage';
import FreeQuoteForm from '../Form/FreeQuote';
import blankPhoto from '../../PicesForPages/blank.jpg';

import { useParams } from 'react-router-dom';


function TeamMemberFullDetails() {
    const { id } = useParams();

    // Initialize the state before any condition
    const [isFreeQuoteVisible, setIsFreeQuoteVisible] = useState(false);

    const teamMembers = {
        'sri-annapareddy': {
            name: 'Sri Annapareddy',
            role: 'Sr. Loan Originator',
            photo: blankPhoto,
            nmls: '20525##',
            address: '1914 JN PEASE PL \nCHARLOTTE, NC 28262',
            contactPhone: '(444) 342-5726',
            contactWork: '(555) 729-7484',
            contactMail: 'anasuya.sunkara@primehomemtg.com',
            yourService: `Whether you're buying, selling, refinancing, or building your dream home, you have a lot riding on your loan specialist. Since market conditions and mortgage programs change frequently, you need to make sure you're dealing with a top professional who is able to give you quick and accurate financial advice. As an experienced loan officer I have the knowledge and expertise you need to explore the many financing options available.\n\nEnsuring that you make the right choice for you and your family is my ultimate goal. And I am committed to providing my customers with mortgage services that exceed their expectations. I hope you'll browse my website, check out the different loan programs I have available, use my decision-making tools and calculators, and use our secure online application to get started.\n\nAfter you've applied, I'll call you to discuss the details of your loan, or you may choose to set up an appointment with me using my online form. As always, you may contact me anytime by phone, fax or email for personalized service and expert advice.\n\nI look forward to working with you.`,
        },
        'jane-doe': {
            name: 'Jane Doe',
            role: 'Loan Officer',
            photo: blankPhoto,
            nmls: '205####',
            address: '1914 JN PEASE PL \nCHARLOTTE, NC 28262',
            contactPhone: '(111) 342-5726',
            contactWork: '(111) 729-7484',
            contactMail: 'jane.doe@primehomemtg.com',
            yourService: `Whether you're buying, selling, refinancing, or building your dream home, you have a lot riding on your loan specialist. Since market conditions and mortgage programs change frequently, you need to make sure you're dealing with a top professional who is able to give you quick and accurate financial advice. As an experienced loan officer I have the knowledge and expertise you need to explore the many financing options available.\n\nEnsuring that you make the right choice for you and your family is my ultimate goal. And I am committed to providing my customers with mortgage services that exceed their expectations. I hope you'll browse my website, check out the different loan programs I have available, use my decision-making tools and calculators, and use our secure online application to get started.\n\nAfter you've applied, I'll call you to discuss the details of your loan, or you may choose to set up an appointment with me using my online form. As always, you may contact me anytime by phone, fax or email for personalized service and expert advice.\n\nI look forward to working with you.`,
        },
        'john-smith': {
            name: 'John Smith',
            role: 'Assistant Loan Officer',
            photo: blankPhoto,
            nmls: '2052###',
            address: '1914 JN PEASE PL \nCHARLOTTE, NC 28262',
            contactPhone: '(222) 342-5726',
            contactWork: '(222) 729-7484',
            contactMail: 'john.smith@primehomemtg.com',
            yourService: `Whether you're buying, selling, refinancing, or building your dream home, you have a lot riding on your loan specialist. Since market conditions and mortgage programs change frequently, you need to make sure you're dealing with a top professional who is able to give you quick and accurate financial advice. As an experienced loan officer I have the knowledge and expertise you need to explore the many financing options available.\n\nEnsuring that you make the right choice for you and your family is my ultimate goal. And I am committed to providing my customers with mortgage services that exceed their expectations. I hope you'll browse my website, check out the different loan programs I have available, use my decision-making tools and calculators, and use our secure online application to get started. After you've applied, I'll call you to discuss the details of your loan, or you may choose to set up an appointment with me using my online form. As always, you may contact me anytime by phone, fax or email for personalized service and expert advice. I look forward to working with you.`,
        },
    };

    const member = teamMembers[id];

    if (!member) {
        return <div>Team Member not found</div>;
    }

    // Function to hide the FreeQuoteFormParent
    const hideFreeQuoteForm = () => {
        setIsFreeQuoteVisible(false);
    };

    // Function to handle clicks outside the FreeQuoteBox
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('FreeQuoteFormParent')) {
            hideFreeQuoteForm();
        }
    };

    return (
        <div className='purchaseParent ourTeamMemberParent'>
            <div className='ourTeamMemberTopParent'>
                <img src={COR} alt='CORImage' className='ourTeamMemberTopBGImage' />
                <div className='ourTeamMemberTopBox'>
                    <span className='ourTeamMemberTopLeftSide'>
                        <span className='ourTeamMemberTopLeftSideSpanImage'>
                            <img src={member.photo} alt={member.name} className='ourTeamMemberTopStaffImage' />
                        </span>
                        <span>
                            <span className='ourTeamMemberTopLeftSideName'>{member.name}</span><br />
                            <span className='ourTeamMemberTopLeftSideRole'>{member.role}</span><br />
                            <span className='ourTeamMemberTopLeftSideNMLS'>NMLS#: {member.nmls}</span><br />
                        </span>
                    </span>
                    <span className='ourTeamMemberTopRightSide'>
                        <span>
                            <b>Address:</b><br />
                            {member.address.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </span><br />
                        <span>
                            <b>Contact:</b><br />
                            <i class="ri-phone-fill"></i> {member.contactPhone}<br />
                            <i class="ri-smartphone-line"></i> {member.contactWork}<br />
                            <i class="ri-mail-send-fill"></i> {member.contactMail}<br />
                        </span>
                    </span>
                </div>
            </div>
            <div className='purchaseBottomParent ourTeamMemberBottomParent'>
                <div className='purchaseBottomBox'>
                    <div className='purchaseBottomLeftBox'>
                        <div className='purchaseBottomLeftButton'>
                            <span className='purchaseBottomLeftButtonLink'>Apply Now</span>
                            <span className='purchaseBottomLeftButtonLink00' onClick={(e) => { e.preventDefault(); setIsFreeQuoteVisible(true); }} >Free Quote</span>
                        </div>

                        <span className='purchaseBottomLeftHeader'>At Your Service</span>

                        <span className='purchaseBottomLeftContent'>
                            {member.yourService.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </span>

                    </div>
                </div>
            </div>
            <ClientReview />
            <MortgageCalculator />
            <BlogPostInAPage />
            <div className='addressBoxParent'>
                <div className='addressBox'>
                    <div className='addressHeading'>The Prime Home Mortgage, LLC Address</div>
                    <div className='addressMapDetails'>
                        <iframe title="Prime Home Mortgage, LLC Office Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.399256645242!2d-80.77742482422828!3d35.32090577270577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541dc848bbd15b%3A0x2b6ff7553848568!2s1914%20J%20N%20Pease%20Pl%2C%20Charlotte%2C%20NC%2028262%2C%20USA!5e0!3m2!1sen!2sin!4v1732532106241!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            {
                isFreeQuoteVisible && (
                    <div
                        className='FreeQuoteFormParent'
                        onClick={handleOutsideClick}
                    >
                        <div className='FreeQuoteFormBox'>
                            <FreeQuoteForm officerName={`${member.name} ${member.nmls}`} />
                            <span
                                className='FreeQuoteFormCloseButton'
                                onClick={hideFreeQuoteForm}
                            >
                                <span>X</span>
                            </span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TeamMemberFullDetails;
