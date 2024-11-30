import React from 'react'
import Inputfield from '../components/Inputfield';

const JobPostingData = ({handleChange}) => {
    const now = new Date();
   //getting date for the last 24 hours, 7 days and 30 days
    const twentyFourHourAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    const sevendayAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    const thirtydayAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    // convert date into string
    const twentyFourHourAgoString = twentyFourHourAgo.toISOString().split('T')[0];
    const sevendayAgoString = sevendayAgo.toISOString().split('T')[0];
    const thirtydayAgoString = thirtydayAgo.toISOString().split('T')[0];

  
  return (
  <>
     <div>
        <h4 className='text-lg font-medium mb-2'>Job of posting</h4>
        <div>
          <label className='sidebar-label-container'>
            <input type="radio" name="test" id="test" value="" onChange={handleChange} />
            <span className='checkmark'></span>All time   
          </label>
        </div>
          <Inputfield handleChange={handleChange} value={twentyFourHourAgoString} title="Last 24 Hour" name="test"/>
          <Inputfield handleChange={handleChange} value={sevendayAgoString} title="Last 7 days" name="test"/>
          <Inputfield handleChange={handleChange} value={thirtydayAgoString} title="Last Month " name="test"/>
       
    </div>
  </>
  )
}

export default JobPostingData;