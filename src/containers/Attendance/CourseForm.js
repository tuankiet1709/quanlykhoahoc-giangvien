import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { COURSE } from "./../../constants/pages";
import TextField from "../../components/FormInputs/TextField";
import DateField from "../../components/FormInputs/DateField";
import TextAreaField from "../../components/FormInputs/TextAreaField";

import SelectField from "../../components/FormInputs/SelectField"

import { createCourseRequest, updateCourseRequest } from "./services/request";
import { CourseStateOptions } from "../../constants/selectOptions"
import {NotStart} from "../../constants/Course/CourseStateConstant"

const initialFormValues = {
    name: "",
    tuition: undefined,
    startDate: undefined,
    duration: undefined,
    studyCondition: "",
    studyObject: "",
    content: "",
    detail: "",
    state: NotStart,

};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Mời nhập tên khóa học"),
    content: Yup.string().required("Mời nhập nội dung khóa học"),
    tuition: Yup.number().required("Mời nhập học phí"),
    detail: Yup.string().required("Mời nhập chi tiết khóa học"),
    studyCondition: Yup.string().required("Mời nhập điều kiện học"),
    studyObject: Yup.string().required("Mời nhập đối tượng học"),
    duration: Yup.number().required("Mời nhập thời lượng khóa học"),
    state: Yup.number().required("Mời nhập thời lượng khóa học"),
    startDate: Yup.date()
    .nullable()
    .required("Mời chọn ngày bắt đầu")
    .min(
        new Date(Date.now()),
        "Ngày bắt đầu phải lớn hơn ngày hôm nay. Xin hãy chọn ngày khác"
    ),
});
const CourseFormContainer = ({ initialCourseForm = {
        ...initialFormValues
    }
}) => {
    const [loading, setLoading] = useState(false);

    const isUpdate = initialCourseForm.id ? true : false;

    const history = useHistory();

    const handleResult = (result, message) => {
        console.log("result");
        console.log(result);
        console.log("message");
        console.log(message);
        if (result) {
            NotificationManager.success(
                `${isUpdate ? "Cập nhật" : "Thêm"} khóa học ${message} thành công`,
                `${isUpdate ? "Cập nhật" : "Thêm"} thành công`,
                2000
            );

            setTimeout(() => {
                history.push(COURSE);
            }, 1000);
        } else {
            NotificationManager.error(message, "Thêm không thành công", 2000);
        }
    };

    const updateCourseAsync = async (form) => {
        console.log("update course async");
        let data = await updateCourseRequest(initialCourseForm.id, form.formValues);
        if (data) {
            handleResult(true, data.name);
        }
    };

    const createCourseAsync = async (form) => {
        console.log("create course async");
        let data = await createCourseRequest(form.formValues);
        if (data) {
            handleResult(true, data.name);
        }
    };

    return (
        <Formik
            initialValues={initialCourseForm}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values) => {
                setLoading(true);
                setTimeout(() => {
                    if (isUpdate) {
                        updateCourseAsync({ handleResult, formValues: values });
                    } else {
                        createCourseAsync({ handleResult, formValues: values });
                    }
                    setLoading(false);
                }, 1000);
            } }
        >
            {({ isValid }) => (
                <Form className="intro-y col-lg-10 col-10">
                    <TextField
                        id="name"
                        name="name"
                        label="Tên khóa học"
                        isrequired="true" />
                    <TextField
                        id="tuition"
                        name="tuition"
                        label="Học phí"
                        type="number"
                        min="1"
                        isrequired="true" />
                    <DateField
                        id="startDate"
                        name="startDate"
                        label="Ngày bắt đầu"
                        isrequired="true" />
                    <TextField
                        id="duration"
                        name="duration"
                        label="Thời lượng (Buổi)"
                        type="number"
                        min="1"
                        isrequired="true" />
                    <TextField
                        id="studyCondition"
                        name="studyCondition"
                        label="Điều kiện học"
                        isrequired="true" />
                        <TextField
                        id="studyObject"
                        name="studyObject"
                        label="Đối tượng học"
                        isrequired="true" />
                    <TextAreaField
                        id="content"
                        name="content"
                        label="Nội dung khóa học"
                        isrequired="true" />
                    <TextAreaField
                        id="detail"
                        name="detail"
                        label="Chi tiết khóa học"
                        isrequired="true" />
                    <SelectField 
                        id="state"
                        name="state"
                        label="Tình trạng khóa học"
                        options = {CourseStateOptions}
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

                            <Link to={COURSE} className="btn btn-outline-secondary ml-2">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CourseFormContainer;
