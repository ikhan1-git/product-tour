import React from 'react'
import CommonHeader from './Common/CommonHeader'
import Card from './Common/Card'
import CommonTable from './Common/CommonTable'
import { useEffect, useState } from 'react'
import { useTours, useDeleteTour } from './API/TourApi'
import CreateTourModal from './Common/CreateTourModal'
import TourPreview from './Common/TourPreview'
const Dashboard = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editTourData, setEditTourData] = useState(null); // store the tour to edit
    const [tourPreview, setTourPreview] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    // const [showTour, setShowTour] = useState(false);
    const title = 'User Table';
    const headers = ['Tour Name', 'Target Page', 'Status', 'Views', 'Completion Rate', 'Actions']; // static headers
    const openEditModal = (tour) => {
      setEditTourData(tour); // store the selected tour data
      setModalOpen(true);    // open modal
    };
    const closeModal = () => {
      setModalOpen(false); 
      setEditTourData(null);
    }
   const {data: toursData, isLoading, error } = useTours();

  const deleteTour = useDeleteTour();

  const handleDelete = (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      deleteTour.mutate(tourId, {
        onSuccess: () => {
          alert('Tour deleted successfully!');
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
      });
    }
  };
  const showTourPreview = (tour) => {
    setTourPreview(tour)
    setShowPreview(true);
  }
    useEffect(() => {
      if (toursData) {
        console.log('Fetched tours:', toursData);
        const tourContent = toursData.map(tour => ({
          tourName: tour.tourName,
          targetPage: tour.pages.map((page, i) => (
            <div key={i} className="tourMutiplePages">
              {page.tourPageUrl}
            </div>
          )),
          status: tour.isActive ? 'Active' : 'Inactive',
          views: tour.views || 0,
          completionRate: tour.completionRate ? `${tour.completionRate}%` : '0%',
          Actions: (<><button onClick={() => openEditModal(tour)}>Edit</button><button onClick={() => showTourPreview(tour._id)}>preview</button><button onClick={() => handleDelete(tour._id)}>delete</button></>)
        }));
        setData(tourContent);
      }
    },[toursData]);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  return (
   <>
    {/* <CommonHeader title ="Dashboard" actionType="createTourButton" action ={<button className='tour--commonHeaderButton' onClick={handleClick}>+ Create New Tour</button>}/>  we can do like this also */}
    <CommonHeader title ="Dashboard" actionType="createTourButton"/>
    <div className="tour-Dashboard_cards flex">
        <Card title="12" text="Active Tours" />
        <Card title="1,245" text="Total Views" />
        <Card title="876" text="Completions" />
        <Card title="70%" text="Completion Rate" />

    </div>
    <div className='tour-Dashboard_table'>
          <CommonTable
      title={title}
      headers={headers}
      data={data}
    />
    </div>
    {isModalOpen && <CreateTourModal onClose={closeModal} tourData={editTourData} />}
    {showPreview && <TourPreview tourId={tourPreview} onClose={() => setShowPreview(false)}/>}
   </>
  )
}

export default Dashboard