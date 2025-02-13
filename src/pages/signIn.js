import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox'; // Assuming InputBox is located in the correct path
import BorderButton from '../components/BorderButton';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase'; // Correct the import path to match your firebase.js location
import { getCurrentUserId } from './firebase'; // Ensure the correct import path


function SignIn({ setIsVerified }) {
    const [isSignIn, setSignIn] = useState("SignIn");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cnfPass, setCnfPass] = useState("");
    const [uname, setUname] = useState("");

    const [errorMessage, setErrorMessage] = useState(""); // To display error messages
    const [loading, setLoading] = useState(false); // To show loading indicator

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(""); // Reset error message on form submit
        setLoading(true); // Show loading state

        if (isSignIn === "SignIn") {
            handleSignIn();
        } else {
            handleSignUp();
        }
    };

    const handleSignUp = async () => {
        if (pass !== cnfPass) {
            setErrorMessage("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            // Create user with email and password
            await createUserWithEmailAndPassword(auth, email, pass);
            console.log("User Created Successfully");
            setSignIn("SignedIn");
            
            setIsVerified(true); // Set verification state to true
            navigate('/dashboard'); // Navigate to dashboard
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message); // Show Firebase error
        }
        setLoading(false);
    };

    const handleSignIn = async () => {
        try {
            // Sign in user with email and password
            await signInWithEmailAndPassword(auth, email, pass);
            const userId = getCurrentUserId();
            console.log("User Signed In Successfully with ID:", userId);
            setSignIn("SignedIn");
            setIsVerified(true); // Set verification state to true
            navigate('/dashboard'); // Navigate to dashboard
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
            setIsVerified(false); // Set verification state to false
        }
        setLoading(false);
    };

    return (
        <div className="signin-page">
            <h1>{isSignIn === "SignIn" ? "Sign In" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit}>
                <InputBox
                    type="email"
                    placeholder="Mail ID"
                    value={email} // Bind email state to value prop
                    onChange={(e) => setEmail(e.target.value)} // Handle change event
                />

                {isSignIn === "SignIn" ? (
                    <InputBox
                        type="password"
                        placeholder="Password"
                        value={pass} // Bind pass state to value prop
                        onChange={(e) => setPass(e.target.value)} // Handle change event
                    />
                ) : (
                    <>
                        <InputBox
                            type="text"
                            placeholder="Username"
                            value={uname} // Bind uname state to value prop
                            onChange={(e) => setUname(e.target.value)} // Handle change event
                        />
                        <InputBox
                            type="password"
                            placeholder="Password"
                            value={pass} // Bind pass state to value prop
                            onChange={(e) => setPass(e.target.value)} // Handle change event
                        />
                        <InputBox
                            type="password"
                            placeholder="Confirm Password"
                            value={cnfPass} // Bind cnfPass state to value prop
                            onChange={(e) => setCnfPass(e.target.value)} // Handle change event
                        />
                    </>
                )}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <BorderButton type="submit" disabled={loading}>
                    {isSignIn === "SignIn" ? "Sign In" : "Sign Up"}
                </BorderButton>
                <p style={{ margin: "5px auto", fontSize: "9px" }} onClick={() => setSignIn(isSignIn === "SignIn" ? "SignUp" : "SignIn")}>
                    {isSignIn === "SignIn" ? "Don't have an account?" : "Already have an account?"} <b style={{ cursor: "pointer", color: "#9747FF" }}>
                        {isSignIn === "SignIn" ? " Sign Up" : " Sign In"}
                    </b>
                </p>
            </form>
        </div>
    );
}

export default SignIn;
