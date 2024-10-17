import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginFormPage.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleDemo = async (e) => {
    e.preventDefault();
    try {
      await dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }));
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors)
      } else {
        setErrors({ email: 'Unsuccessful Demo Login' })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-form-page">
      <div className="login-div">
      <h1>Log In</h1>
      </div>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button type="button" className="pill-button" onClick={handleDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
