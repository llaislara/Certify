import React, { useEffect, useCallback, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from 'date-fns/locale';
import '../styles/ActivityDetails.css';
import AddButton from '../assets/icons/AddButton.svg';
import RemoveButton from '../assets/icons/RemoveButton.svg';
import Before from '../assets/icons/BeforeArrow.svg'
import After from '../assets/icons/NextArrow.svg'

registerLocale('en-US', enUS);

const ActivityDetails = ({ formData, handleChange, nextStep, prevStep, toggleEndDate, generateQRCode, missingFields }) => {
  const [eventDuration, setEventDuration] = useState(formData.eventDuration);

  const isMissing = (field) => missingFields.includes(field);

  const handleDurationChange = useCallback((e) => {
    const { value } = e.target;
    const allowedChars = /^[0-9,.]+$/;
    if (allowedChars.test(value) || value === '') {
      setEventDuration(value);
      handleChange({ target: { name: 'eventDuration', value } });
    }
  }, [handleChange]);

  useEffect(() => {
    handleChange({ target: { name: 'eventDuration', value: eventDuration } });
  }, [eventDuration, handleChange]);

  const handleQRCodeChange = useCallback(async (e) => {
    const { value } = e.target;
    handleChange(e);
    await generateQRCode(value);
  }, [handleChange, generateQRCode]);

  useEffect(() => {
    const options = document.querySelectorAll('option');
    options.forEach(option => {
      option.classList.add('custom-option');
    });
  }, []);

  return (
    <div className='bgBox'>
      <div className='NextBackStep'>
      <button onClick={prevStep}><img src={Before} alt="Upload Icon" style={{width: 18}}/></button>
      <button onClick={nextStep}><img src={After} alt="Upload Icon" style={{width: 18}}/></button>
      </div>
      <div className='detailsEventBox'>
        <div className='eventName'>
          <label>
            <h1 className='titleLabel'>Activities Name *</h1>
            <input type="text" name="eventName" onChange={handleChange} value={formData.eventName} required />
          </label>
        </div>

        <div>
          <label className='placeEvent' >
            <h1 className='titleLabel'>Activity Location *</h1>
            <input type="text" name="eventLocation" onChange={handleChange} value={formData.eventLocation} required />
          </label>
        </div>

        <div className='linkQRCode'>
          <label >
            <h1 className='titleLabel'>Activity Page Link </h1>
            <input type="text" name="qrCodeLink" onChange={handleQRCodeChange} value={formData.qrCodeLink} style={{background: '#efefef', boxShadow: 'inset 0px 0px 3px 3px rgb(0 0 0 / 3.5%)' }} />
          </label>
        </div>

        <div className='boxOptionsEvent'>
          <div className='typeEvent'>
            <label className={isMissing('eventType') ? 'missing' : ''}>
              <h1 className='titleLabel'>Activity Type *</h1>
              <select name="eventType" onChange={handleChange} value={formData.eventType} required>
                <option value="academic League">Academic League</option>
                <option value="ceremony">Ceremony</option>
                <option value="conference">Conference</option>
                <option value="congress">Congress</option>
                <option value="convention">Convention</option>
                <option value="course">Course</option>
                <option value="exhibition">Exhibition</option>
                <option value="fair">Fair</option>
                <option value="forum">Forum</option>
                <option value="group">Group</option>
                <option value="lecture">Lecture</option>
                <option value="round Table">Round Table</option>
                <option value="seminar">Seminar</option>
                <option value="training">Training</option>
                <option value="workshop">Workshop</option>
              </select>
            </label>
          </div>

          <div className='participationMode'>
            <label>
              <h1 className='titleLabel'>Participation Condition *</h1>
              <select name="participationMode" onChange={handleChange} value={formData.participationMode} required>
                <option value="audience">Audience</option>
                <option value="exhibitor">Exhibitor</option>
                <option value="lecturer">Lecturer</option>
                <option value="moderator">Moderator</option>
                <option value="presenter">Presenter</option>
                <option value="speaker">Speaker</option>
                <option value="workshop Facilitator">Workshop Facilitator</option>
              </select>
            </label>
          </div>
        </div>

        <div className='boxDetailsEvent'>
          <div className='durationEvent'>
            <h1 className='titleLabel'>Activity Duration *</h1>
            <label>
              <input
                type="text"
                name="eventDuration"
                value={eventDuration}
                onChange={handleDurationChange}
                required
              />
              <select name="durationUnit" onChange={handleChange} value={formData.durationUnit} required>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
                <option value="semester">Semester</option>
              </select>
            </label>
          </div>

          <div className='durationEvent'>
            <h1 className="titleLabel">Date(s) *</h1>
            <label>
              <DatePicker
                className='inputDate'
                selected={formData.eventStartDate ? new Date(formData.eventStartDate) : null}
                onChange={(date) => handleChange({ target: { name: 'eventStartDate', value: date } })}
                locale="en-US"
                dateFormat="MM/dd/yyyy"
                placeholderText={'Start date'}
                required
              />
              <button className='dateButton' type="button" onClick={toggleEndDate}>
                {formData.showEndDate ? (
                  <img src={RemoveButton} alt="Add Icon" style={{ width: 30 }} />
                ) : (
                  <img src={AddButton} alt="Add Icon" style={{ width: 30 }} />
                )}
              </button>

              {formData.showEndDate && (
                <label placeholder={'final date'}>
                  <DatePicker
                    className='inputDate'
                    selected={formData.eventEndDate ? new Date(formData.eventEndDate) : null}
                    onChange={(date) => handleChange({ target: { name: 'eventEndDate', value: date } })}
                    locale="en-US"
                    dateFormat="MM/dd/yyyy"
                    placeholderText={'End date'}
                  />
                </label>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
