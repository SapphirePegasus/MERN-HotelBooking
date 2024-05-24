import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./signup.css";

const Signup = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
        city: undefined,
        country: undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "SIGNUP_START" });
        try {
          const res = await axios.post("/auth/register", credentials);
          dispatch({ type: "SIGNUP_SUCCESS", payload: res.data.details });
          navigate("/")
        } catch (err) {
          dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
        }
      };

    return (
        <div className="signupbg">
            <div className="signup">
                <div className="sContainer">
                    <h2>Sign Up!</h2>
                    <Link to="/login">Already have an account? Click here</Link>
                    <input
                        required
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={handleChange}
                        className="sInput"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                        className="sInput"
                    />
                    <input
                        type="number"
                        placeholder="Phone Number"
                        id="phone"
                        onChange={handleChange}
                        className="sInput"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        id="city"
                        onChange={handleChange}
                        className="sInput"
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        id="country"
                        onChange={handleChange}
                        className="sInput"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                        className="sInput"
                    />
                    <button disabled={loading} onClick={handleClick} className="sButton">
                        Sign Up
                    </button>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </div>
    );
};

export default Signup;
