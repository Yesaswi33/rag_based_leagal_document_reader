import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../lib/utils";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
// import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "../slices/authSlice";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const UserInfo = useSelector((state) => state.auth.UserInfo);
    const handleChanges = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            let response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/signup`,
                formData,
                {
                    withCredentials: true,
                }
            );
            // console.log(response.data);
            let result = response.data;
            // dispatch(setCredentials(result.user));

            if (result.success) {
                handleSuccess(result.message);
                navigate("/document");
            }
        } catch (error) {
            console.log(error);
            let msg = error?.response?.data?.message;
            handleError(msg);
        }
    };
    return (
        <div className="h-screen flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="w-1/4 border-2 border-gray-200 mx-auto px-6 py-4 rounded-lg bg-white"
            >
                <h1 className="font-bold text-3xl text-center mb-6">Sign Up</h1>

                <FormInput
                    name="name"
                    value={formData.name}
                    labelName="Full Name"
                    handleChanges={handleChanges}
                />
                <FormInput
                    name="email"
                    value={formData.email}
                    labelName="Email"
                    handleChanges={handleChanges}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={formData.password}
                    labelName="Password"
                    handleChanges={handleChanges}
                />

                <FormButton name="Sign Up" />
                <hr />
                <p className="mt-5 text-center">
                    Have an account?
                    <Link
                        to="/auth/login"
                        className="mx-1 hover:underline text-custom-orange"
                    >
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
