import React, { useState } from 'react';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditPropertyForm = ({ property, onClose }) => {
  const [formData, setFormData] = useState({ ...property });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const propertyRef = doc(db, "properties", property.id);
    await updateDoc(propertyRef, { ...formData });
    alert("Property updated successfully!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      <input type="text" name="area" value={formData.area} onChange={handleChange} required />
      <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
      <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
      <input type="text" name="nearbyHospitals" value={formData.nearbyHospitals} onChange={handleChange} />
      <input type="text" name="nearbyColleges" value={formData.nearbyColleges} onChange={handleChange} />
      <button type="submit">Update Property</button>
    </form>
  );
};

export default EditPropertyForm;