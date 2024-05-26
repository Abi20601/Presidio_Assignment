import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Button, Card, Form } from 'react-bootstrap';
import NavbarBuy from '../components/NavbarBuy';

const BuyerPage = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      const q = query(collection(db, "properties")); 
      const querySnapshot = await getDocs(q);
      setProperties(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchProperties();
  }, []);

  const handleInterest = async (sellerUid) => {
    const q = query(collection(db, "1"), where("uid", "==", sellerUid)); 
    const querySnapshot = await getDocs(q);
    const sellerDetails = querySnapshot.docs.map(doc => doc.data())[0]; 
    alert(`Seller Contact: ${sellerDetails.phonenumber}`); 
  };

  return (
    <>
    <NavbarBuy />
    <div className="container mt-5">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Filter Properties</Form.Label>
          <Form.Control type="text" placeholder="Enter Desired City" onChange={e => setFilter(e.target.value)} />
        </Form.Group>
      </Form>
      {properties.filter(property => property.city.includes(filter)).map((property) => ( 
        <Card key={property.id} className="mb-3">
        <Card.Body>
            <Card.Title>{property.city}</Card.Title>
            <Card.Text>
                Area: {property.area} sqft
            </Card.Text>
            <Card.Text>
                Bedrooms: {property.bedrooms}
            </Card.Text>
            <Card.Text>
                Bathrooms: {property.bathrooms}
            </Card.Text>
            <Card.Text>
                Nearby Hospitals: {property.nearbyHospitals}
            </Card.Text>
            <Card.Text>
                Nearby Colleges: {property.nearbyColleges}
            </Card.Text>
            <Button variant="primary" onClick={() => handleInterest(property.uid)}>I'm Interested</Button>
        </Card.Body>
        </Card>
      ))}
    </div>
    </>
  );
};

export default BuyerPage;