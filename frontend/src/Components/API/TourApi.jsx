// src/API/TourApi.jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ✅ Get all tours
export function useTours() {
  return useQuery({
    queryKey: ['tours'],
    queryFn: () => fetch('http://localhost:5000/api/tour/tours').then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }),
    onSuccess: data => console.log('Fetched tours:', data),
    onError: error => console.error('Fetching tours failed:', error),
  });
}

// ✅ Create a new tour
export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTour) => {
      const res = await fetch('http://localhost:5000/api/tour/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTour),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create tour');
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error) => {
      console.error('Error creating tour:', error.message);
    },
  });
}


// ✅ Update an existing tour
export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedTour) =>
      fetch(`http://localhost:5000/api/tour/tours/${updatedTour._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTour),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
}

// ✅ Delete a tour by ID
export function useDeleteTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      fetch(`http://localhost:5000/api/tour/tours/${id}`, {
        method: 'DELETE',
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
}
// ✅ Get a single tour by ID
export function useTourById(tourId) {
  return useQuery({
    queryKey: ['tour', tourId],
    queryFn: () =>
      fetch(`http://localhost:5000/api/tour/tours/${tourId}`).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tour');
        return res.json();
      }),
    enabled: !!tourId, // only fetch when tourId is truthy
    onSuccess: (data) => console.log('Fetched tour by ID:', data),
    onError: (error) => console.error('Error fetching tour by ID:', error),
  });
}








// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// // Fetch all tours
// export function useTours() {
//   return useQuery(['tours'], () =>
//     fetch('http://localhost:5000/api/tour/tours').then(res => res.json())
//   );
// }

// // Create a new tour
// export function useCreateTour() {
//   const queryClient = useQueryClient();
//   return useMutation(
//     newTour =>
//       fetch('http://localhost:5000/api/tour/tours', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newTour),
//       }).then(res => res.json()),
//     {
//       onSuccess: () => queryClient.invalidateQueries(['tours']),
//     }
//   );
// }

// // Update existing tour
// export function useUpdateTour() {
//   const queryClient = useQueryClient();
//   return useMutation(
//     updatedTour =>
//       fetch(`http://localhost:5000/api/tour/tours/${updatedTour._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedTour),
//       }).then(res => res.json()),
//     {
//       onSuccess: () => queryClient.invalidateQueries(['tours']),
//     }
//   );
// }

// // Delete a tour
// export function useDeleteTour() {
//   const queryClient = useQueryClient();
//   return useMutation(
//     id =>
//       fetch(`http://localhost:5000/api/tour/tours/${id}`, {
//         method: 'DELETE',
//       }).then(res => res.json()),
//     {
//       onSuccess: () => queryClient.invalidateQueries(['tours']),
//     }
//   );
// }
