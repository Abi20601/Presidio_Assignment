import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Navbar from '../components/NavbarComponent';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "properties"));
      setProperties(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "properties", id));
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <h2>My Properties</h2>
      {properties.map((property) => (
        <div key={property.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{property.city}</h5>
            <p className="card-text"><strong>Area:</strong> {property.area} sqft</p>
            <p className="card-text"><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p className="card-text"><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p className="card-text"><strong>Nearby Hospitals:</strong> {property.nearbyHospitals}</p>
            <p className="card-text"><strong>Nearby Colleges:</strong> {property.nearbyColleges}</p>
            <button onClick={() => handleDelete(property.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default PropertiesList;