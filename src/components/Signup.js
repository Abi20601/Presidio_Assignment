import React,{useState,useRef} from 'react'
import { Card, Button, Form, Alert} from 'react-bootstrap'
import { useAuth } from './auth'
import { Link, useNavigate } from "react-router-dom"

function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconRef = useRef()
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneNumberRef = useRef();
    const userTypeRef = useRef();
    const { signup } = useAuth() 
    const [error,setError] = useState("")
    const [loading,SetLoading] = useState(false)
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordconRef.current.value)
            {
                return setError("Passwords do not match")
            }

            const userDetails = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                email: emailRef.current.value,
                userType: userTypeRef.current.value
            };
    
        try{
            setError("")
            SetLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, userDetails)
            // navig("/")
            if (userDetails.userType === "seller") {
                navigate("/dashboardseller"); 
            } else if (userDetails.userType === "buyer") {
                navigate("/dashboardbuyer"); 
            }
        } catch (error) {
            setError(`Failed to create an account: ${error.message}`);
        }
        SetLoading(false)
    }

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {/* {JSON.stringify(currentUser)} */}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="Firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type = "text" ref={firstNameRef} required />
                </Form.Group>

                <Form.Group id="Lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type = "text" ref={lastNameRef} required />
                </Form.Group>

                <Form.Group id="phonenumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type = "number" ref={phoneNumberRef} required />
                </Form.Group> 

                <Form.Group id="user">
    <Form.Label>User Type</Form.Label>
    <Form.Select ref={userTypeRef} required>
        <option value="" disabled>Select User Type</option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        </Form.Select>
        </Form.Group>                            

                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type = "password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type = "password" ref={passwordconRef} required />
                </Form.Group>         
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already Have an Account ? <Link to="/login">Login</Link>
    </div>
    </>
  )
}

export default Signup;

