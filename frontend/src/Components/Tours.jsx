import React from 'react'
import CommonHeader from './Common/CommonHeader'
import CommonTable from './Common/CommonTable';
import { useEffect, useState } from 'react'
const Tours = () => {
    const [data, setData] = useState([]);
    const title = 'All Tours';
    const headers = ['Tour Name', 'Target Page', 'Steps', 'Status', 'Created', 'Actions']; // static headers


      useEffect(() => {
        // Fake API data
        const fetched = [
          {
            url: '/tour/paris',
            title: 'Paris Tour',
            tours: (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                2 tours
              </span>
            ),
            lastVisited: '2025-06-01',
          },
          {
            url: '/tour/london',
            title: 'London Tour',
            tours: (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                No tours
              </span>
            ),
            lastVisited: '2025-05-28',
          },
        ];
        setData(fetched);
      }, []);
  return (
    <>
     <CommonHeader title ="Tours" actionType="createTourButton" />
      <div className='tours-tour_table'>
          <CommonTable
      title={title}
      headers={headers}
      data={data}
      actions={
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
          + Add Tour
        </button>
      }
    />
    </div>
    </>
  )
}

export default Tours