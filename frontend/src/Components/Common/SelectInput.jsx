import React, { useState } from 'react';

function SelectInput({ label, options }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {selectedOption && <p>You selected: <strong>{selectedOption}</strong></p>}
    </div>
  );
}

export default SelectInput;
