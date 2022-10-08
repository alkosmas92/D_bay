// Helper styles for demo
import "./helper.css";


import { React , useContext} from "react";
import { render } from "react-dom";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";



const Date = () => {



return    (

        <div className="app">
            <Formik
                initialValues={{email: ""}}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
                validationSchema={Yup.object().shape({
                    pickedDate: Yup.string().required("Required")
                })}
            >
                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;
                    return (
                        <Form>
                            <Field type="date" name="pickedDate"/>
                            Picked {values.pickedDate}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};



export default Date;