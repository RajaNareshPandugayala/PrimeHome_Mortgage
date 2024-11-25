import React from 'react';
import contactUs from '../../PicesForPages/ContactUs.jpg';
import ContactForm from '../Form/ContactForm';

function ContactUs() {
    return (
        <div className='purchaseParent'>
            <div className='purchasetopParent'>
                <img src={contactUs} alt='contactUsImage' className='background-video contactUsImage' />
                <div className='purchasetopBox'>
                    {/* The existing Purchase span */}
                    <span>Contact Us</span>
                </div>
            </div>
            <div className='purchaseBottomParent'>
                <div className='purchaseBottomBox'>
                    <div className='purchaseBottomLeftBox contactUsBottomLeftBox'>
                        <span className='purchaseBottomLeftHeader'>Get In Touch</span>
                        <span className='purchaseBottomLeftContent contactUsBottomLeftContent'><span>Phone: </span><span>(___) ___-____ </span></span>
                        <a href="mailto: contact@primehomemtg.com" style={{ textDecoration: 'none' }} className='purchaseBottomLeftContent contactUsBottomLeftContent'><span>Email: </span><span>contact@primehomemtg.com</span></a>
                        <span className='purchaseBottomLeftContent contactUsBottomLeftContent'><span>Address: </span><span>1914 JN PEASE PL CHARLOTTE, NC 28262</span></span>

                    </div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
