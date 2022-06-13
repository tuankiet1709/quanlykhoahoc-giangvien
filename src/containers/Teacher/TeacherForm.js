import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { TEACHER } from "./../../constants/pages";
import TextField from "../../components/FormInputs/TextField";
import DateField from "../../components/FormInputs/DateField";
import CheckboxField from "../../components/FormInputs/CheckboxField";

import SelectField from "../../components/FormInputs/SelectField"

import { RegisterUser, updateTeacherRequest } from "./services/request";
import { TeacherStateOptions, UserGenderOptions, TeacherQualificationOptions } from "../../constants/selectOptions"
import {IsTeaching} from "../../constants/Teacher/TeacherStateConstant"
import { GenderMale } from "../../constants/Teacher/GenderContants";
import { Primary } from "../../constants/Teacher/QualificationConstants";

const initialFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    dob: undefined,
    gender: GenderMale,
    CMND: undefined,
    phoneNumber: undefined,
    qualification: Primary,
    state: IsTeaching,
};

const validationSchema = Yup.object().shape({
    firstName:Yup.string().required("Mời nhập tên giảng viên"),
    lastName:Yup.string().required("Mời nhập tên giảng viên"),
    address: Yup.string().required("Mời nhập địa chỉ giảng viên"),
    gender: Yup.string().required("Mời chọn giới tính giảng viên"),
    CMND: Yup.string()
    .required("Mời nhập CMND của giảng viên")
    .matches(/^[0-9]+$/, "Chỉ được nhập số")
    .min(12, 'CMND phải gồm 12 số')
    .max(12, 'CMND phải gồm 12 số'),
    phoneNumber: Yup.string().required("Mời nhập số điện thoại giảng viên")
    .matches(/^[0-9]+$/, "Chỉ được nhập số")
    .min(10, 'số điện thoại phải gồm 10 số')
    .max(10, 'số điện thoại phải gồm 10 số'),
    state: Yup.number().required("Mời chọn trạng thái giảng viên"),
    qualification: Yup.number().required("Mời chọn trình độ chuyên môn của giảng viên"),
    dob: Yup.date().nullable().required('Mời chọn ngày sinh')
        .max(new Date(Date.now() - 567993600000 - 86400000), "Giảng viên đang có ngày sinh <= 18 tuổi, xin hãy chọn ngày khác")
        .min(new Date(Date.now() - 1893456000000), "Giảng viên đang có ngày sinh > 60 tuổi, xin hãy chọn ngày khác"),
});
const TeacherFormContainer = ({ initialTeacherForm = {
        ...initialFormValues
    }
}) => {
    const [loading, setLoading] = useState(false);

    const isUpdate = initialTeacherForm.id ? true : false;

    const history = useHistory();

    const handleResult = (result, message) => {
        console.log("result");
        console.log(result);
        console.log("message");
        console.log(message);
        if (message!="") {
            NotificationManager.success(
                `${isUpdate ? "Cập nhật" : "Thêm"} giảng viên ${message} thành công`,
                `${isUpdate ? "Cập nhật" : "Thêm"} thành công`,
                2000
            );

            setTimeout(() => {
                history.push(TEACHER);
            }, 1000);
        } else {
            NotificationManager.error(message, "Thêm không thành công", 2000);
        }
    };

    const updateTeacherAsync = async (form) => {
        console.log("update teacher async");
        let data = await updateTeacherRequest(initialTeacherForm.id, form.formValues);
        if (data) {
            handleResult(true, data);
        }
    };

    const createTeacherAsync = async (form) => {
        console.log("create teacher async");
        let data = await RegisterUser(form.formValues);
        if (data) {
            handleResult(true, data);
        }
    };

    return (
        <Formik
            initialValues={initialTeacherForm}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values) => {
                setLoading(true);
                setTimeout(() => {
                    if (isUpdate) {
                        updateTeacherAsync({ handleResult, formValues: values });
                    } else {
                        createTeacherAsync({ handleResult, formValues: values });
                    }
                    setLoading(false);
                }, 1000);
            } }
        >
            {({ isValid }) => (
                <Form className="intro-y col-lg-10 col-10">
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="Tên giảng viên"
                        isrequired="true" 
                    />
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Họ giảng viên"
                        isrequired="true" />
                    <TextField
                        id="address"
                        name="address"
                        label="Địa chỉ giảng viên"
                        isrequired="true" 
                    />
                    <TextField
                        id="CMND"
                        name="CMND"
                        label="CMND"
                        type="string"
                        isrequired="true" 
                    />
                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Số điện thoại:"
                        type="string"
                        isrequired="true" 
                    />
                    <DateField
                        id="dob"
                        name="dob"
                        label="Ngày sinh"
                        isrequired="true" 
                    />
                    <CheckboxField
                        name="gender"
                        label="Giới tính"
                        isrequired={true}
                        options={UserGenderOptions}
                        defaultValue={initialTeacherForm.gender}
                    />
                    <SelectField 
                        id="qualification"
                        name="qualification"
                        label="Trình độ chuyên môn"
                        options = {TeacherQualificationOptions}
                        isrequired
                    />
                    <SelectField 
                        id="state"
                        name="state"
                        label="Tình trạng giảng viên"
                        options = {TeacherStateOptions}
                        isrequired
                        disabled={isUpdate?false:true}
                    />

                    <div className="d-flex">
                        <div className="ml-auto">
                            <button
                                className="btn btn-danger"
                                type="submit"
                                disabled={!isValid || loading}
                            >
                                Save{" "}
                                {loading && (
                                    <img src="/oval.svg" alt="" className="w-4 h-4 ml-2 inline-block" />
                                )}
                            </button>

                            <Link to={TEACHER} className="btn btn-outline-secondary ml-2">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default TeacherFormContainer;
