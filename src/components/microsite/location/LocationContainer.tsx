"use client"
import React from 'react';
import { useState } from 'react';
import Tabs from './Tabs';
import LocationAdvantages from './LocationAdvantages';
import Map from './Map';
export default function LocationContainer() {
  const [selectedTab, setSelectedTab] = useState(1);
  

  return (
    <div className='container dark-section !pt-[150px] ' >
      <Tabs 
        setSelectedTab={setSelectedTab} 
        selectedTab={selectedTab}
      />
      {
        selectedTab==1?
        <LocationAdvantages/>
        : <Map/>
      }
   
    </div>
  )
}