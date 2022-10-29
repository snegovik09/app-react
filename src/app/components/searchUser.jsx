import React from "react";
import PropTypes from "prop-types";
const SearchUser = ({ value, onChange }) => {
    return (
        <form>
            <input
                className="w-100"
                placeholder="Search..."
                type="text"
                id="find"
                value={value}
                onChange={onChange}
            />
        </form>
    );
};

SearchUser.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchUser;
