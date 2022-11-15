import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import api from "../../../api";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";
import { validator } from "../../../utils/validator"

const EditUserPage = (userId) => {
    const params = useParams();
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState();
    const [professions, setProfessions] = useState();
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});
    const transform = (data) => {
        return data.map((el) => ({ label: el.name, value: el._id }));
    };
    useEffect(() => {
        api.users
            .getById(params.userId)
            .then(({ profession, qualities, ...data }) => {
                setData({
                    ...data,
                    profession: profession._id,
                    qualities: transform(qualities)
                });
            });

        setLoader(true);
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен сожержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен сожержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        const isValid = validate();
        if (!isValid) return;
        e.preventDefault();
        const { profession, qualities } = data;
        api.users
            .update(params.userId, {
                    ...data, 
                    profession: getProfessionById(profession), 
                    qualities: getQualities(qualities)
            })
                .then(() => history.goBack());
    };
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    return (
        loader && (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {loader && (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    id="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    name="name"
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    id="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    name="email"
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберите свою профессию"
                                    value={data.profession}
                                    onChange={handleChange}
                                    name="profession"
                                    defaultOption="Choose"
                                    options={professions}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                    defaultValue={data.qualities}
                                />
                                <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

EditUserPage.defaultProps = {
    type: "text"
};

EditUserPage.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
};

export default EditUserPage;
