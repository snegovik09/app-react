import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    name,
    defaultOption,
    options,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  _id: options[optionName]._id
              }))
            : options;
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionArray &&
                    optionArray.map((option) => (
                        <option value={option._id} key={option._id}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
