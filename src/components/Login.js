import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./auth"
import { Link, useNavigate } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("");
      setLoading(true);
      const userCredential = await login(emailRef.current.value, passwordRef.current.value);
      const uid = userCredential.user.uid;
      const q = query(collection(db, "/1"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      let userType = "";
      querySnapshot.forEach((doc) => {
        userType = doc.data().usertype;
      });

      if (userType === "seller") {
        navigate("/dashboardseller"); 
      } else if (userType === "buyer") {
        navigate("/dashboardbuyer ");
      } else {
        throw new Error("User type is undefined");
      }
    } catch (error) {
      setError("Failed to log in");
      console.error(error);
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <div>Latest User : { currentUser && currentUser.email }</div>  
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">Forgot Password <Link to="/forgotpassword">Forget Password</Link> </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}