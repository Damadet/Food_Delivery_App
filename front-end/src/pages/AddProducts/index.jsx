import { Header2 } from "../../components/Header2";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/elements/Button";
// import { app } from "../../firebase-config";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        fetch('http://localhost:8080/api/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Name: data.name,
              Adjective: data.adjective,
              Description: data.description,
              Price: data.price,
              Category: data.category,
              ImageUrl: data.imageUrl
            })
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                toast.success('Product Added successfully!🎉', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                navigate('/addProducts');
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
                    <h5 className="text-3xl">Add Products</h5>
                    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-lg font-medium text-gray-200">Product Name</label>
                            <input
                                {...register('name')}
                                id="name"
                                type="text"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>

                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-lg font-medium text-gray-200">Adjective</label>
                            <input
                                {...register('adjective')}
                                id="adjective"
                                type="text"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>


                        <div>
                            <label
                                htmlFor="description"
                                className="block text-lg font-medium text-gray-200">Description</label>
                            <input
                                {...register('description')}
                                id="description"
                                type="string"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>


                        <div>
                            <label
                                htmlFor="price"
                                className="block text-lg font-medium text-gray-200">Price</label>
                            <input
                                {...register('price')}
                                id="price"
                                type="number"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-lg font-medium text-gray-200">Category</label>
                            <select {...register('category')} id="category" className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-200 focus:border-gray-200">
                                <option value="">Select a category</option>
                                <option value="drinks">Drink</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>

                        </div>
                        <div>
                            <label
                                htmlFor="imageUrl"
                                className="block text-lg font-medium text-gray-200">Image Link</label>
                            <input
                                {...register('imageUrl')}
                                id="imageUrl"
                                type="string"
                                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200" />
                        </div>

                        <Button variant="light" size="large">{loading ? "loading" : 'Add Product'}</Button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div></>
    )
}

export default AddProduct;