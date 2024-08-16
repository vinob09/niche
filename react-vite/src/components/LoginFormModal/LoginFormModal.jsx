import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [disableLogin, setDisableLogin] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (user.email && user.password) {
      setDisableLogin(false)
    } else {
      setDisableLogin(true)
    }
  }, [user.email, user.password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '' }); 
    const serverResponse = await dispatch(
      thunkLogin((user))
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    setErrors({ ...errors, [name]: '' })
  }

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

  return (
    <div className="login-form-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </label>
        <button type="submit" className="pill-button" disabled={disableLogin}>Log In</button>
        <button type="button" className="pill-button" onClick={handleDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
