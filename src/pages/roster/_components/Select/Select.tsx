import React from 'react';

interface SelectProps {
  options: string[];
  currentOption?: string;
  label?: string;
  onChangeUrl: (selectedYear: string) => string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  currentOption,
  label = 'Select Year',
  onChangeUrl,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    if (selectedYear) {
      window.location.href = onChangeUrl(selectedYear);
    }
  };

  return (
    <div>
      {label && <label htmlFor="year-select">{label}</label>}
      <select id="year-select" onChange={handleChange} value={currentOption}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
