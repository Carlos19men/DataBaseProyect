import React from 'react';

interface FilterSelectProps {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    viewWidth?: number;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ 
    label, 
    options, 
    value, 
    onChange,
    viewWidth = 100 
}) => {
    return (
        <div style={{ 
            width: `${viewWidth}%`,
            marginBottom: '1rem'
        }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                }}>
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                }}
            >
                <option value="">Todos</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterSelect; 