import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from "../components/auth"
import Navbar from '../components/NavbarComponent';

const PropertyForm = () => {
  const [property, setProperty] = useState({
    city: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearbyHospitals: '',
    nearbyColleges: '',
  });

  const {currentUser } = useAuth()

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("No user logged in");
      return;
    }
    try {
      await addDoc(collection(db, "properties"), {
        ...property,
        owner_uid: currentUser.uid, 
      });
      alert("Property added successfully!");
    } catch (error) {
      console.error("Error adding property: ", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <h2>Post Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="place" className="form-label">City</label>
          <input type="text" className="form-control" id="city" name="city" value={property.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">Area</label>
          <input type="text" className="form-control" id="area" name="area" value={property.area} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="bedrooms" className="form-label">Number of Bedrooms</label>
          <input type="number" className="form-control" id="bedrooms" name="bedrooms" value={property.bedrooms} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="bathrooms" className="form-label">Number of Bathrooms</label>
          <input type="number" className="form-control" id="bathrooms" name="bathrooms" value={property.bathrooms} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="nearbyHospitals" className="form-label">Nearby Hospitals</label>
          <input type="text" className="form-control" id="nearbyHospitals" name="nearbyHospitals" value={property.nearbyHospitals} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="nearbyColleges" className="form-label">Nearby Colleges</label>
          <input type="text" className="form-control" id="nearbyColleges" name="nearbyColleges" value={property.nearbyColleges} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  );
};

export default PropertyForm;