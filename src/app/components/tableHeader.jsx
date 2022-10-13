import React from "react";
import PropTypes from "prop-types";
const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item.path) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item.path, order: "asc" });
        }
    };
    const addArr = (item) => {
        if (selectedSort.path === item.path) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-up-fill"></i>;
            }
            if (selectedSort.order === "desc") {
                return <i className="bi bi-caret-down-fill"></i>;
            }
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column])
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].path && "button" }}
                    >
                        {columns[column].name}
                        {addArr(columns[column])}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
