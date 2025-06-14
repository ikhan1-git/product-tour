import React, { useState } from 'react'
import TourCreateModal from './CreateTourModal'
const CommonHeader = ({title,  actionType, action}) => {

  const [showtourModal, setShowTourModal] = useState(false);
  const renderAction = () => {
    console.log('actionType', actionType);
    if(actionType === 'createTourButton') {
      return (<button className='tour--commonHeaderButton' onClick={handleClick}>+ Create New Tour</button>)
    }
    else if(actionType === 'Scan for New Pages') {
      return (<button className='tour--commonHeaderButton'>Scan for New Pages</button>)
    }
    return null;
  }
  const handleClick = () => {
    setShowTourModal(true);
    console.log('Create Tour button clicked');
  }

  return (
   <>
   <div className='tour--commonHeader flex bg-gray-400 p-2 w-100% justify-between items-center rounded-md'>
    <h1 className='text-2xl text-black'>
      {title}
    </h1>
      {/* {action ? action : ''} */}
      {renderAction()}
      {action}
   </div>
   {showtourModal && <TourCreateModal onClose={() => setShowTourModal(false)}/>}
    </>
  )
}

export default CommonHeader