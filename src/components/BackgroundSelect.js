import React from 'react';
import template1 from  '../assets/Template1.jpg';
import template2 from  '../assets/Template2.jpg';
import template3 from  '../assets/Template3.jpg';
import template4 from  '../assets/Template4.jpg';
import template5 from  '../assets/Template5.jpg';
import template6 from  '../assets/Template6.jpg';
import template7 from  '../assets/Template7.jpg';
import template8 from  '../assets/Template8.jpg';
import template9 from  '../assets/Template9.jpg';
import template10 from '../assets/Template10.jpg';
import template11 from '../assets/Template11.jpg';
import template12 from '../assets/Template12.jpg';
import template13 from '../assets/Template13.jpg';
import template14 from '../assets/Template14.jpg';


const backgrounds = {
  template1, 
  template2, 
  template3, 
  template4, 
  template5, 
  template6, 
  template7, 
  template8, 
  template9, 
  template10,
  template11,
  template12,
  template13,
  template14
};


const BackgroundSelect = ({ onChange, value }) => {
  const handleSelect = (key) => {
    onChange(key);
  };

  return (
    <div className="background-select">
      <div className="options">
        {Object.keys(backgrounds).map((key) => (
          <div key={key} className="option" onClick={() => handleSelect(key)}>
            <img src={backgrounds[key]} alt={`Background ${key}`} style={value === key ? { border: '5px solid #8a8a8a9d', borderRadius: 5 } : {}} required/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelect;
