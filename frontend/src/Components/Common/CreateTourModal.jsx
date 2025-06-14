import React, { useState, useEffect } from 'react';
import './CreateTourModal1.css'; // Assuming you have a CSS file for styling
import { useCreateTour, useUpdateTour } from '../API/TourApi'
import PageValidator from './pageValidator';
const CreateTourModal = ({isOpen, onClose, tourData}) => {
const createTour = useCreateTour();
const updateCreateTour = useUpdateTour();
const [pageError, setPageError] = useState({});
const [formData, setFormData] = useState({
  tourName: '',
  tourDescription: '',
  pages: [
    {
      tourPageUrl: '',
      continueOnNextPage: false,
      steps: [
        {
          className: '',
          stepTitle: '',
          stepDescription: '',
        },
      ],
    },
  ],
});

const [formError, setFormError] = useState({
  tourName: '',
  tourDescription: '',
  pages: [
    {
      tourPageUrl: '',
      steps: [
        {
          className: '',
          stepTitle: '',
          stepDescription: '',
        },
      ],
    },
  ],
});


useEffect(() => {
  if (tourData) {
    setFormData(tourData); // pre-fill when editing
  }
}, [tourData]);

  // if (!isOpen) return null;

// This is for update step values in the steps of the pages
const updateStepsValues = (pageIndex, stepIndex, e) => {
  const { name, value } = e.target;
  const updatedPages = [...formData.pages];

  if (!updatedPages[pageIndex]) return; // safety
  if (!updatedPages[pageIndex].steps) updatedPages[pageIndex].steps = [];

  updatedPages[pageIndex].steps[stepIndex] = {
    ...updatedPages[pageIndex].steps[stepIndex],
    [name]: value,
  };

  setFormData({ ...formData, pages: updatedPages });
};

// This function validates the steps in the current page and other pages also
const stepsValidation = (pageIndex, text) => {
  const checkSteps = formData.pages  // If you want read values then you can write in this format

  // Defensive check
  if (!checkSteps[pageIndex] || !checkSteps[pageIndex].steps) {
    console.warn(`Page at index ${pageIndex} is undefined or has no steps`);
    return false;
  }


  const incompleteStep = checkSteps[pageIndex].steps.find(step =>
      !step.className.trim() ||
      !step.stepTitle.trim() ||
      !step.stepDescription.trim()
    );
    if (incompleteStep) {
    // Optionally set some error state to show message near steps
    setPageError(prev => ({
      ...prev,
      [pageIndex]: text,
    }));
     console.log('incompleteStep', incompleteStep);
     console.log('checkSteps', checkSteps);
    return false; 
    }
     // Clear error if validation passes
    setPageError(prev => ({ ...prev, [pageIndex]: '' }));
    return true; // All steps are valid
}


// This function handles the next page change when user checks or unchecks the checkbox
const handleNextPageChange = (pageIndex, isChecked) => {
  const updatedNextPages = [...formData.pages]; 
  // If you want update pr modify values then you can write in this format because this gives the shallow copy of the array and you can modify the values in the array without mutating the original array
  // if (!validateForm()) {
  //   return;
  // }
  // Check if the current page has all steps filled
  // stepsValidation(updatedNextPages, pageIndex);
  // Update the current page to indicate continuation
  console.log('updatedNextPages', updatedNextPages);
  if(isChecked && !updatedNextPages[pageIndex + 1]){
  const pageErrorText = 'Please fill all fields in the current page before adding a new step.';
  const isValid = stepsValidation(pageIndex, pageErrorText);
  if (!isValid) {
    return;
  }
  const nextPage = 
     {
      tourPageUrl: '',
      continueOnNextPage: false,
      steps: [
        {
          className: '',
          stepTitle: '',
          stepDescription: '',
        },
      ],
    };
    updatedNextPages.splice(pageIndex + 1, 0, nextPage);
     // Clear error if any
    updatedNextPages[pageIndex].continueOnNextPage = true;
    setPageError(prev => ({ ...prev, [pageIndex]: '' }));
}
else {
    // Remove the next page if user unchecks and it's not manually edited
    const nextPage = updatedNextPages[pageIndex + 1];
    const isEmptyNextPage = nextPage && !nextPage.tourPageUrl && !nextPage.steps.some(step => step.className.trim() || step.stepTitle.trim() || step.stepDescription.trim());
    if (
     isEmptyNextPage
    ) {
      updatedNextPages.splice(pageIndex + 1, 1);
      updatedNextPages[pageIndex].continueOnNextPage = false;
       setPageError(prev => ({ ...prev, [pageIndex]: '' }));
    }
    else {
       // Show inline error and don't uncheck
      setPageError(prev => ({
        ...prev,
        [pageIndex]: 'Please clear all fields from the next page before disabling this option.',
      }));
      return; // stop further execution — do not update formData
    }
  }

  setFormData({ ...formData, pages: updatedNextPages });
}


// This function handles adding a new step to the current page
const handleAddStep = (pageIndex) => {
    // Check if the current page has all steps filled
    const pageErrorText = 'Please fill all fields in the current step before adding a new step.';
    const isValid = stepsValidation(pageIndex, pageErrorText);
    if (!isValid) {
      return;
    }
    const newStep = {
      className: '',
      stepTitle:'',
      stepDescription: '',
    }
    const updatePages = [...formData.pages] // getting the existing pages


    
    console.log('updatePages', updatePages);
    const updatedSteps = [...updatePages[pageIndex].steps, newStep]
    updatePages[pageIndex] = {
      ...updatePages[pageIndex],
      steps: updatedSteps
    }
    setFormData({ ...formData, pages: updatePages });
  }


// This function handles removing a step from the current page
  const handleRemoveStep = (pageIndex, index) => {
    const updatedPages = [...formData.pages];
    // const updatedSteps = [updatedPages[pageIndex].steps];
    const updatedSteps = updatedPages[pageIndex].steps.filter((_, i) => { 
      console.log('i', i);
      console.log('index', index);
      return i !== index
    });
    // updatedSteps.splice(index, 1); // Remove the step at the specified index with splice
    
    // If the last step is removed, ensure at least one step remains
    // if (updatedSteps.length === 0) {
    //   updatedSteps.push({
    //     className: '',
    //     stepTitle: '',
    //     stepDescription: '',
    //   });
    // }
    
    updatedPages[pageIndex] = {
      ...updatedPages[pageIndex],
      steps: updatedSteps,
    };
    
    setFormData({ ...formData, pages: updatedPages });
  }
  console.log('formData', formData);
  
  // Validation
  function isValidUrl(url) {
      try {
        new URL(url); // This will throw an error if the URL is invalid
        return true;
      } catch (_) {
        return false;
      }
    }
  const validateForm = () => {
    const errors = {
      tourName: '',
      tourDescription: '',
      pages: []
    };
    let isValid = true;
    if(!formData.tourName.trim()) {
      errors.tourName = 'Tour name is required';
      isValid = false;
    }
    if(!formData.tourDescription.trim()) {
      errors.tourDescription = 'Tour description is required';
      isValid = false;
    }

    formData.pages.forEach((page, index)=> {
      const pageErrors = {
        tourPageUrl: '',
        steps: []
      };
      if(!page.tourPageUrl.trim()) {
        pageErrors.tourPageUrl = 'Starting page URL is required';
        isValid = false;
      }
      if (!isValidUrl(page.tourPageUrl)) {
        pageErrors.tourPageUrl = 'Invalid URL format';
        isValid = false;
      }
      page.steps.forEach((step, stepIndex) => {
        const stepErrors = {
          className: '',
          stepTitle:'',
          stepDescription: ''
        }
        if(!step.className.trim()) {
          stepErrors.className = 'CSS Selector is required';
          isValid = false;
        }
        else if (!/^(\.|#)[a-zA-Z0-9_-]+$/.test(step.className.trim())) {
          stepErrors.className = 'Please enter a valid CSS selector (e.g., .step-box or #cta)';
          isValid = false;
        }
        if(!step.stepTitle.trim()) {
          stepErrors.stepTitle = 'Step title is required';
          isValid = false;
        }
        if(!step.stepDescription.trim()) {
          stepErrors.stepDescription = 'Step description is required';
          isValid = false;
        }
        pageErrors.steps.push(stepErrors);
      })
      errors.pages.push(pageErrors);
    })
     setFormError(errors);
     return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    if (validateForm()) {
      console.log('Tour Data:', formData);
      if (tourData && tourData._id) {
        // Update existing tour
        updateCreateTour.mutate(formData, {
          onSuccess: () => {
            console.log('Tour updated successfully!');
            onClose();
          },
          onError: (error) => {
            alert(`Error: ${error.message}`);
          }
        });
      } else {
        // Create new tour
        createTour.mutate(formData, {
          onSuccess: () => {
            console.log('Tour created successfully!');
            onClose();
          },
          onError: (error) => {
            alert(`Error: ${error.message}`);
          }
        });
      }
    } else {
      console.log("Form has validation errors");
}

  }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Create New Tour</h2>
          <button 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form className="tour-form" onSubmit={handleSubmit}>
          {/* Basic Tour Information */}
          <div className="form-section">
            <h3 className="section-title">Tour Information</h3>
            
            <div className="input-group">
              <label htmlFor="tourName" className="input-label">
                Tour Name *
              </label>
              <input 
                type="text" 
                id="tourName" 
                className="form-input"
                placeholder="Enter tour name" 
                value={formData.tourName}
                onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
              />
              {formError.tourName && <p className="error-text">{formError.tourName}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="tourDescription" className="input-label">
                Tour Description
              </label>
              <textarea 
                id="tourDescription" 
                className="form-textarea"
                placeholder="Describe what this tour will guide users through"
                rows="3"
                value={formData.tourDescription}
                onChange={(e) => setFormData({ ...formData, tourDescription: e.target.value })}
              />
              {formError.tourDescription && <p className="error-text">{formError.tourDescription}</p>}
            </div>
          </div>

          {/* Page Configuration */}
          {formData.pages.map((page, pageIndex) => (
          <div className="form-section">
            <h3 className="section-title">Page Configuration</h3>
            <h4>Page {pageIndex + 1}</h4>
            <div className="input-group">
              <label htmlFor="tourPageUrl" className="input-label">
                Starting Page URL *
              </label>
              <input 
                type="url" 
                id="tourPageUrl" 
                className="form-input"
                placeholder="https://example.com/page" 
                value={page.tourPageUrl}
                onChange={(e) => {
                const updatedPages = [...formData.pages];
                console.log('updatedPages',  updatedPages[pageIndex]);
                updatedPages[pageIndex].tourPageUrl = e.target.value;
                setFormData({ ...formData, pages: updatedPages });

                }}
                />
                {formError.pages[pageIndex]?.tourPageUrl && (
                  <p className="error-text">{formError.pages[pageIndex].tourPageUrl}</p>
                )}
            </div>

            {/* Step Configuration */}
            <div className="step-config-section">
              {page.steps.map((step, index) => (<>
              <h4 className="subsection-title">Step Configuration {index + 1}</h4>
                {index !== 0 && (
                  <button
                    type="button"
                    className="remove-step-btn"
                    onClick={() => handleRemoveStep(pageIndex, index)}
                  >
                    Remove Step
                  </button>
                )}
                <div className="input-group">
                <label htmlFor="cssSelector" className="input-label">
                  CSS Selector (Class or ID) *
                </label>
                <input 
                  type="text" 
                  id="cssSelector" 
                  className="form-input"
                  placeholder=".button-class or #element-id" 
                  name='className'
                  value={step.className}
                  onChange={(e)=>updateStepsValues(pageIndex,index,e)}
                />
                 {formError.pages[pageIndex]?.steps[index]?.className && (
                  <p className="error-text">{formError.pages[pageIndex].steps[index].className}</p>
                )}
                <p className="text-sm text-yellow-600 mt-1">
                  ⚠️ This selector will be validated later when the tour is triggered on the actual page.
                </p>
                  {/* Hidden Iframe Validation */}
                  {/* <PageValidator
                    pageUrl={formData.pages[0].tourPageUrl}
                    selector={formData.pages[0].steps[0].className}
                    onValidationResult={({ urlValid, selectorValid }) => {
                      const errors = { ...formError };
                      errors.pages[0] = errors.pages[0] || { steps: [{}] };

                      if (!urlValid) errors.pages[0].tourPageUrl = 'Invalid or inaccessible URL';
                      if (!selectorValid) errors.pages[0].steps[0].className = 'Selector not found on page';

                      setFormError(errors);
                      }}
                      /> */}

              </div>

              <div className="input-group">
                <label htmlFor="stepTitle" className="input-label">
                  Step Title *
                </label>
                <input 
                  type="text" 
                  id="stepTitle" 
                  name='stepTitle'
                  className="form-input"
                  placeholder="Enter step title" 
                   value={step.stepTitle}
                  onChange={(e)=>updateStepsValues(pageIndex,index,e)}
                />
                {formError.pages[pageIndex]?.steps[index]?.stepTitle && (
                  <p className="error-text">{formError.pages[pageIndex].steps[index].stepTitle}</p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="stepDescription" className="input-label">
                  Step Description
                </label>
                <textarea 
                  id="stepDescription" 
                  name='stepDescription'
                  className="form-textarea"
                  placeholder="Describe what this step shows or does"
                  rows="2"
                   value={step.stepDescription}
                  onChange={(e)=>updateStepsValues(pageIndex,index,e)}
                />
                {formError.pages[pageIndex]?.steps[index]?.stepDescription && (
                  <p className="error-text">{formError.pages[pageIndex].steps[index].stepDescription}</p>
                )}
              </div>
              </>
              ))}
              <div className="checkbox-group">
              <input 
                type="checkbox" 
                // id="continueOnNextPage" 
                id={`continueOnNextPage-${pageIndex}`} 
                className="checkbox-input"
                checked={page.continueOnNextPage || false} onChange={(e) => handleNextPageChange(pageIndex, e.target.checked)}
              />
              <label htmlFor={`continueOnNextPage-${pageIndex}`} className="checkbox-label">
                Continue tour on next page
              </label>
            </div>
              <button type="button" className="btn-secondary" onClick={() => handleAddStep(pageIndex)}>
                Add Step
              </button>
            </div>
            {pageError[pageIndex] && (
              <small className="error-text">{pageError[pageIndex]}</small>
            )}
          </div>
          ))}

    

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTourModal;





// For study purpose 

// const updateStepsValues = (pageIndex,index,e) => {
//     const { name, value } = e.target;
//     console.log('index', index);
//     const updatedPages = [...formData.pages]

//   console.log('updatedPages', updatedPages);

//   if (!updatedPages[pageIndex]) {
//     console.error(`Page at index ${pageIndex} does not exist.`);
//     return;
//   }

//   // Ensure 'steps' is at least an array
//   if (!Array.isArray(updatedPages[pageIndex].steps)) {
//     updatedPages[pageIndex].steps = [];
//   }
//     const updatedSteps = updatedPages[pageIndex].steps.map((step, i) => {
//       console.log('step', step);
//       console.log('i', i);
//       if ( i === index) { // Assuming you want to update the first step
//         return { ...step, [name]: value };
//       }
//       return step;
//     });
//     updatedPages[pageIndex] = {
//       ...updatedPages[pageIndex],
//       steps: updatedSteps,
//     };
//     setFormData({...formData, pages: updatedSteps });
    
//     }



  // setFormData({
  //   ...formData,
  //   pages:[{
  //     ...formData.pages[0],
  //     steps: updatedSteps

  //   }]
  // })  This is the correct way to update the state but it is only updating the first page's steps. if i want to update the steps of all pages then i need to update the pages array as well.

//  onChange={(e) => {
//             const updatedPages = [...formData.pages];
//             updatedPages[pageIndex].steps[stepIndex].stepTitle = e.target.value;
//             setFormData({ ...formData, pages: updatedPages });
//           }}   we can also do like this on input field this is also good but i have to write multiple lines of code for each input field. so i am using this function to update the steps values.


  // Update steps in the correct page