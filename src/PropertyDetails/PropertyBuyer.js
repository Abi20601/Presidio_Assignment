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
      const q = query(collection(db, "properties")); // Assuming 'properties' is your collection
      const querySnapshot = await getDocs(q);
      setProperties(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchProperties();
  }, []);

  const handleInterest = async (sellerUid) => {
    const q = query(collection(db, "1"), where("uid", "==", sellerUid)); // Adjust "1" to your users collection
    const querySnapshot = await getDocs(q);
    const sellerDetails = querySnapshot.docs.map(doc => doc.data())[0]; // Assuming only one seller per uid
    alert(`Seller Contact: ${sellerDetails.email}`); // Display seller details, adjust as needed
  };

  return (
    <>
    <NavbarBuy />
    <div className="container mt-5">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Filter Properties</Form.Label>
          <Form.Control type="text" placeholder="Enter filter criteria" onChange={e => setFilter(e.target.value)} />
        </Form.Group>
      </Form>
      {properties.filter(property => property.city.includes(filter)).map((property) => ( // Example filter by city
        <Card key={property.id} className="mb-3">
          <Card.Body>
            <Card.Title>{property.city}</Card.Title>
            <Card.Text>
              Area: {property.area} sqft
              {/* Display other property details */}
            </Card.Text>
            <Button variant="primary" onClick={() => handleInterest(property.owner_uid)}>I'm Interested</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
    </>
  );
};

export default BuyerPage;