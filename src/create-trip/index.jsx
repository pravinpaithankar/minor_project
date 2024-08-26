import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options'
import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
  const [place, setPlace] = useState();

  const [fromData, setFromData] = useState([]);

  const handleInputChange = (namee, value) => {
      setFromData({
        ...fromData, [namee]:value
      })
  } 
  
  // useEffect(()=>{
  //   console.log(formData);
  // }, [formData])
  return (
    <div>
    <div className='sm:px-10 md:px-32 lg:xp-56 xl:px-10 px-5 mt-10'>

      <h2 className='font-bold text-3xl'>Tell us your travel preferences🧳🏞️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

     <div className='mt-20 flex flex-col gap-10'>
      <div>
        <h2 className='text-xl my-3 font-medium'>
          What is destination of Choice ?
        </h2>
        <Input placeholder={'Example: Shanivar Wada'} type='text'></Input>

        {/* <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        selectProps = {{
        place,
        onChange:(v) => { setPlace(v); handleInputChange('location',v)}}}
        /> */}
      </div>
      <div>
      <h2 className='text-xl my-3 font-medium'>
      How many days are you planning your trip?
        </h2>
        <Input placeholder={'Example: 2'} type='number'></Input>


      </div>
      </div> 

      <div>
      <h2 className='text-xl my-3 font-medium'>
      What is Your Budget ?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-lg'>

              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              
              </div>

          ))}
        </div>

      </div>


      <div>
      <h2 className='text-xl my-3 font-medium'>
      Who do you traveling with ?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item,index)=>(
            <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-lg'>

              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              
              </div>

          ))}
        </div>

      </div>
    </div>
    <div className='my-10 justify-center flex'>
    <Button>Create My Trip</Button>
    </div>
   
    </div>

  )
}

export default CreateTrip
