import React from 'react';
import Testimonials from '../../PicesForPages/Testimonials.jpg';

function TestimonialsReview() {
    return (
        <div className='purchaseParent'>
            <div className='purchasetopParent'>
                <img src={Testimonials} alt='NewsPaperImage' className='background-video' />
                <div className='purchasetopBox'>
                    {/* The existing Purchase span */}
                    <span>Testimonials</span>
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
        </div>
    );
}

export default TestimonialsReview;