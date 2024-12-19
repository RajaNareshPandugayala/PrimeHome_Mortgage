import React from 'react';
import AC from '../../PicesForPages/AffordCalculator.jpg';
import AffordCalculator from '../CalculatorAndChart/affordCalculator';


function AffordabilityCalculator() {
    return (
        <div className='purchaseParent'>
            <div className='purchasetopParent AffordPageTopParent'>
                <img src={AC} alt='ACImage' className='background-video AffordCalculatorImage' />
                <div className='purchasetopBox AffordPageTopBox'>
                    {/* The existing Purchase span */}
                    <span>Affordability Calculator</span>
                </div>
            </div>
            <AffordCalculator />
        </div>
    );
}

export default AffordabilityCalculator;
