import { Header2 } from "../../components/Header2";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/elements/Button";
// import { app } from "../../firebase-config";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        fetch('http://localhost:8080/api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                Email: data.email,
                Password: data.password
            })
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                toast.success('Account created successfully!🎉', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                navigate('/login');
            } else {
                console.log(response.json());
            }
        }).catch((error) => {
            setLoading(false);
            console.log(error)
        })
    }
    return (
        <><Header2 /><div className="h-screen bg-black flex  items-center justify-center">
            <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
                <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
                    <h5 className="text-3xl">Register</h5>
                    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-lg font-medium text-gray-200">First Name</label>
                            <input
                                {...register('firstName')}
                                id="firstName"
                                type="text"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>

                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-lg font-medium text-gray-200">Last Name</label>
                            <input
                                {...register('lastName')}
                                id="lastName"
                                type="text"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>


                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-200">Email</label>
                            <input
                                {...register('email')}
                                id="email"
                                type="email"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-lg font-medium text-gray-200">Password</label>
                            <input
                                {...register('password')}
                                id="Password"
                                type="password"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>
                        <Button variant="light" size="large">{loading ? "loading" : 'Register'}</Button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div></>
    )
}

export default Register;