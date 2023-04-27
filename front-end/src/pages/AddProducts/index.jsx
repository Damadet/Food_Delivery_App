import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header2 } from "../../components/Header2";

const AddProducts = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [adjective, setAdjective] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (data) => {
    setLoading(true);
    // send form data to backend API using Axios or other library
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.email,
            adjective: data.adjective,
            description: data.description,
            price: data.price,
            category: data.category,
            imageUrl: data.imageUrl

        })
    }).then((response) => {
        if (response.status === 200) {
            setLoading(false);
            toast.success('Login successful!🎉', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            });
            navigate('/');
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
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Adjective:
              <input type="text" value={adjective} onChange={(e) => setAdjective(e.target.value)} required />
            </label>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
              Price:
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <label>
              Category:
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select a category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>
            <label>
              Image Link:
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
            </label>
            <button type="submit">Add Product</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div></>
  );
}

export default AddProducts;