import React from 'react';

function ContactForm() {
    return (
        <div className='purchaseBottomRightBox contactUsBottomRightBox'>
            <span className='purchaseBottomRightHeading'>Contact Form</span>
            <span className='purchaseBottomRightContent'>Fill in this short form to contact us.</span>
            <form className='purchaseBottomRightform'>
                <input type='text' placeholder='NAME:' autoComplete="true" />
                <input type='email' placeholder='EMAIL:' autoComplete="true" />
                <input type='tel' placeholder='PHONE:' autoComplete="true" />
                <input type='text' placeholder='CITY:' autoComplete="true" />
                <textarea cols="auto" rows="10" placeholder='QUESTION OR COMMENT:' autoComplete="true"></textarea>

                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    );
}

export default ContactForm;
