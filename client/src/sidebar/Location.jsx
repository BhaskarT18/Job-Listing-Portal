import React from 'react'
import Inputfield from '../components/Inputfield'

const Location = ({handleChange}) => {
  return (
    <>
    <div>
        <h4 className='text-lg font-medium mb-2'>Location</h4>
        <div>
          <label className='sidebar-label-container'>
            <input type="radio" name="test" id="test" value="" onChange={handleChange} />
            <span className='checkmark'></span>All     
          </label>
        </div>
          <Inputfield handleChange={handleChange} value="london" title="London" name="test"/>
          <Inputfield handleChange={handleChange} value="seattle" title="Seattle" name="test"/>
          <Inputfield handleChange={handleChange} value="madrid" title="Madrid" name="test"/>
          <Inputfield handleChange={handleChange} value="boston" title="Boston" name="test"/>
       

    </div>
    </>
  )
}

export default Location