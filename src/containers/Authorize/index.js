import React, { useEffect, useState } from "react";
import { Form, Formik, setNestedObjectValues } from "formik";
import Header from "../Header/Header";
import TextField from "../../components/FormInputs/TextField";
import { Card, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PasswordField from "../../components/FormInputs/PasswordField";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";
import { UserLogin, GetUser } from "./services";
import { HOME, COURSE, COURSE_TEACHER } from '../../constants/pages';
import { 
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';
import { db } from "../../services/requests";

const initialValues = {
	email: "",
	password: "",
};

const validationLoginSchema = Yup.object().shape({
    email: Yup.string().email("Email không hợp lệ").required("Mời nhập tên khóa học"),
    password: Yup.string().required("Password không được để trống"),
});

const validationChangePasswordSchema = Yup.object().shape({
    name: Yup.string().required("Mời nhập tên khóa học"),
    content: Yup.string().required("Mời nhập nội dung khóa học"),
});

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
	const [newpass, setNewPass] = useState("");
	const [isShow, setShow] = useState(false);
	const [notification, setNotification] = useState("");
	const [notificationNewPass, setNotificationNewPass] = useState("");

    const history = useHistory();

    const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("sidebar",user.uid);
      await setUserData((await GetUser(user.uid)).data());
      if(userData.role===0){
        history.push(COURSE);
      } else {
        history.push(COURSE_TEACHER);
      }
      console.log(userData);
    })
  },[]);

    const loginAsync = async (form) => {
        await UserLogin(form.formValues);
        onAuthStateChanged(auth, function(user) {
            console.log("user login",user);
            if (user) {
                const userInfo = GetUser(user.uid).data();
                console.log(userInfo);
                if(userInfo.role === 0 ){
                    history.push(COURSE);
                } else {
                    history.push(COURSE_TEACHER);
                }
            }
        })
        
    };

    const changePasswordAsync = async (form) => {
        console.log("create course async");
        // let data = await createCourseRequest(form.formValues);
        // if (data) {
        //     handleResult(true, data.name);
        // }
    };

    return (
        <>
            <Header></Header>
            <div className="container d-flex justify-content-center flex-column align-items-center mt-5">
                <Card>
                    <Card.Header className="text-monospace text-center lead text-danger font-weight-bold">
                        Chào mừng đến với Trung tâm tin học
                    </Card.Header>
                    <Card.Body>
                        <p className="lead text-danger text-center">
                            {notification.length > 0 ? notification : ""}
                        </p>
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validationSchema={validationLoginSchema}
                            onSubmit={(values) => {
                                setLoading(true);
                                setTimeout(() => {
                                    loginAsync({ formValues: values });
                                    setLoading(false);
                                }, 1000);
                            } }
                        >
                            {({isValid}) => (
                                <Form className="intro-y">
                                    <TextField
                                        name="email"
                                        label="Email"
                                        isrequired="true"
                                    />
                                    <PasswordField
                                        name="password"
                                        label="Password"
                                        isrequired="true"
                                    />
                                    <button
                                        className="btn btn-danger w-25 float-right"
                                        type="submit"
                                        disabled={!isValid || loading}
                                    >
                                        Login{" "}
                                        {loading && (
                                        <img src="/oval.svg" alt="" className="w-4 h-4 ml-2 inline-block" />
                                    )}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </div>

            <div className="container">
                <Modal
                    show={isShow}
                    dialogClassName="modal-90w"
                    aria-labelledby="login-modal"
                >
                    <Card>
                        <Card.Header className="text-monospace lead text-danger font-weight-bold">
                            Change password
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                This is the first time you logged in.
                                <br />
                                You have to change your password to continue
                                <br />
                                <p className="lead text-danger text-center">
                                    {notificationNewPass.length > 0 ? notificationNewPass : ""}
                                </p>
                            </Card.Text>

                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                validationSchema={validationChangePasswordSchema}
                                onSubmit={(values) => {
                                    setLoading(true);
                                    setTimeout(() => {
                                        changePasswordAsync({ formValues: values });
                                        setLoading(false);
                                    }, 1000);
                                }}
                            >
                                {({isValid}) => (
                                    <Form className="intro-y">
                                        <PasswordField
                                            name="newPassword"
                                            label="New password"
                                            isrequired="true"
                                            onChange={(e) => setNewPass(e.target.value)}
                                        />
{/* 
                                        {error?.error && (
                                            <div className="invalid">{error.message}</div>
                                        )} */}
                                        <button
                                            className="btn btn-danger w-25 float-right"
                                            type="submit"
                                            disabled={!isValid || loading}
                                        >
                                            Save{" "}
                                            {loading && (
                                    <img src="/oval.svg" alt="" className="w-4 h-4 ml-2 inline-block" />
                                )}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Modal>
            </div>
        </>
    );
};

export default Login;