import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { quality, isLoading } = useQualities();
    if (!isLoading) {
        const qual = qualities.map((q) => {
            for (let i = 0; i < quality.length; i++) {
                if (q === quality[i]._id) {
                    return quality[i];
                }
            }
        });
        return (
            <>
                {qual.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
            </>
        );
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
