import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './TourPreview.css'
const TourPreview = ({ tourId, onClose }) => {
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`http://localhost:5000/api/tour/tours/${tourId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tour data');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.pages)) {
          setPages(data.pages);
        } else {
          throw new Error('Invalid tour data structure');
        }
      })
      .catch((err) => {
        console.error('Error fetching tour:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tourId]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying && !isLastStep) {
      interval = setInterval(() => {
        goNextStep();
      }, 3000);
    } else if (isPlaying && isLastStep) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, currentPageIndex, pages]);

  const totalSteps = pages.reduce((acc, page) => acc + (page.steps?.length || 0), 0);
  const currentPage = pages[currentPageIndex];
  const steps = currentPage?.steps || [];
  const current = steps[currentStep];

  const goNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentPage?.continueOnNextPage && currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setCurrentStep(0);
    }
  };

  const goBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPageIndex > 0) {
      const prevPageIndex = currentPageIndex - 1;
      setCurrentPageIndex(prevPageIndex);
      setCurrentStep((pages[prevPageIndex]?.steps || []).length - 1);
    }
  };

  const getAbsoluteStep = () => {
    let count = 0;
    for (let i = 0; i < currentPageIndex; i++) {
      count += pages[i].steps?.length || 0;
    }
    return count + currentStep + 1;
  };

  const getProgressPercent = () => {
    return totalSteps > 0 ? (getAbsoluteStep() / totalSteps) * 100 : 0;
  };

  const isFirstStep = currentStep === 0 && currentPageIndex === 0;
  const isLastStep = currentPageIndex === pages.length - 1 && currentStep === steps.length - 1;

  if (loading) {
    return (
      <div className="tour-overlay">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span className="loading-text">Loading tour...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tour-overlay">
        <div className="error-container">
          <div className="error-icon">✕</div>
          <h3 className="error-title">Error Loading Tour</h3>
          <p className="error-message">{error}</p>
          <button onClick={onClose} className="error-close-btn">
            Close
          </button>
        </div>
      </div>
    );
  }

  if (pages.length === 0) return null;

  // Tippy tooltip content
  const tooltipContent = current ? (
    <div className="modern-tooltip-content">
      <div className="tooltip-header-modern">
        <span className="step-badge">
          Step {getAbsoluteStep()} of {totalSteps}
        </span>
        <div className="tooltip-dots">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
      
      <div className="tooltip-content">
        <h4 className="tooltip-title">{current.stepTitle}</h4>
        <p className="tooltip-description">{current.stepDescription}</p>
      </div>
      
      <div className="tooltip-footer-modern">
        <button
          onClick={goBackStep}
          disabled={isFirstStep}
          className="tooltip-btn back-btn"
        >
          ← Back
        </button>
        <button
          onClick={goNextStep}
          disabled={isLastStep}
          className="tooltip-btn next-btn-tooltip"
        >
          {currentStep === steps.length - 1 && currentPage?.continueOnNextPage
            ? 'Next Page →'
            : 'Next →'}
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="tour-modal-overlay-modern">
      <div className="tour-modal-container">
        {/* Header */}
        <div className="tour-header">
          <div className="tour-header-left">
            <div className="tour-icon">👁</div>
            <div className="tour-title-section">
              <h2 className="tour-title">Tour Preview</h2>
              <p className="tour-subtitle">Interactive walkthrough</p>
            </div>
          </div>
          <button onClick={onClose} className="tour-close-btn">
            <span className="close-icon">✕</span>
          </button>
        </div>

        {/* Progress Section */}
        <div className="tour-progress-section">
          <div className="progress-info">
            <span className="progress-text">
              Step {getAbsoluteStep()} of {totalSteps}
            </span>
            <div className="page-info">
              Page {currentPageIndex + 1} of {pages.length}
            </div>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{ width: `${getProgressPercent()}%` }}
            ></div>
          </div>
        </div>

        {/* Tour Info */}
        <div className="tour-info-modern">
          <div className="url-section">
            <span className="url-icon">🌐</span>
            <div className="url-content">
              <span className="url-label">Current Page:</span>
              <span className="url-value">{currentPage?.tourPageUrl}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="tour-controls">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`play-btn ${isPlaying ? 'playing' : ''}`}
            disabled={isLastStep}
          >
            <span className="play-icon">{isPlaying ? '⏸️' : '▶️'}</span>
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
          
          <div className="navigation-controls">
            <button
              onClick={goBackStep}
              disabled={isFirstStep}
              className="nav-btn prev-btn"
            >
              <span className="nav-icon">←</span>
              Previous
            </button>
            
            <button
              onClick={goNextStep}
              disabled={isLastStep}
              className="nav-btn next-btn"
            >
              {currentStep === steps.length - 1 && currentPage?.continueOnNextPage
                ? 'Next Page'
                : 'Next'}
              <span className="nav-icon">→</span>
            </button>
          </div>
        </div>

        {/* Tour Simulation */}
        <div className="tour-simulation-modern">
          <div className="simulation-header">Browser Simulation</div>
          <div className="simulation-content">
            <div className="mock-header">Website Header</div>
            <div className="mock-sidebar">Sidebar</div>
            <div className="mock-main">
              
              {/* Target Elements for Tippy */}
              <Tippy
                visible={current && currentStep === 0}
                interactive={true}
                placement="bottom"
                content={currentStep === 0 ? tooltipContent : null}
                className="modern-tippy"
                maxWidth={350}
                theme="light-border"
                animation="fade"
                duration={[300, 200]}
              >
                <div className="mock-element element-1 tippy-target">
                  Dashboard Widget
                </div>
              </Tippy>

              <Tippy
                visible={current && currentStep === 1}
                interactive={true}
                placement="bottom"
                content={currentStep === 1 ? tooltipContent : null}
                className="modern-tippy"
                maxWidth={350}
                theme="light-border"
                animation="fade"
                duration={[300, 200]}
              >
                <div className="mock-element element-2 tippy-target">
                  Navigation Menu
                </div>
              </Tippy>

              <Tippy
                visible={current && currentStep === 2}
                interactive={true}
                placement="top"
                content={currentStep === 2 ? tooltipContent : null}
                className="modern-tippy"
                maxWidth={350}
                theme="light-border"
                animation="fade"
                duration={[300, 200]}
              >
                <div className="mock-element element-3 tippy-target">
                  User Profile
                </div>
              </Tippy>

              <Tippy
                visible={current && currentStep >= 3}
                interactive={true}
                placement="top"
                content={currentStep >= 3 ? tooltipContent : null}
                className="modern-tippy"
                maxWidth={350}
                theme="light-border"
                animation="fade"
                duration={[300, 200]}
              >
                <div className="mock-element element-4 tippy-target">
                  Content Area
                </div>
              </Tippy>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPreview;