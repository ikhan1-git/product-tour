import React from 'react'

const Card = ({title, text}) => {
  return (
       <div className="tour-card">
        <h2 className="tour-card_title">{title}</h2>
        <p className="tour-card_description">{text}</p>
       </div>
  )
}

export default Card