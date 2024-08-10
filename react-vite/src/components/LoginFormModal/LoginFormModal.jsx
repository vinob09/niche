import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disableLogin, setDisableLogin] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if(email && password){
      setDisableLogin(false)
    }else{
      setDisableLogin(true)
    }
  })
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemo = async(e) => {
    e.preventDefault();
    try{
      await dispatch(thunkLogin({ email: "demo@email.com", password: "password123" }))
      closeModal();
    } catch(res){
      const data = await res.json();
      if(data && data.errors){
        setErrors.apply(data.errors)
      } else{
        setErrors({email: 'Unsuccessful Demo Login'})
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='errors'>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='errors'>{errors.password}</p>}
        <button type="submit" className="pill-button" disabled={disableLogin}>Log In</button>
        <button type="button" className="pill-button" onClick={handleDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
