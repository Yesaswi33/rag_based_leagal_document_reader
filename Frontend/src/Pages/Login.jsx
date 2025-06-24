import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function Login() {
    const [formData, setFormData] = useState({
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
                `${import.meta.env.VITE_API_URL}/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(response);
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
        <div className="h-screen flex justify-center items-center overflow-hidden">
            <form
                onSubmit={handleSubmit}
                className="w-1/4 border-2 border-gray-200 mx-auto px-6 py-8 rounded-lg bg-white"
            >
                <h1 className="font-bold text-3xl text-center mb-6">Log In</h1>
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
                <div className="mb-4">
                    <Link
                        to="/auth/login"
                        className="hover:underline "  
                    >
                        Forgot password?
                    </Link>
                </div>

                <FormButton name="Log In" />
                <hr />

                <p className="mt-4 text-center">
                    Don't have an account?
                    <Link
                        to="/auth/signup"
                        className="mx-1 hover:underline text-custom-orange"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
