import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState('');
  const [disableLogin, setDisableLogin] = useState(true);
  const { closeModal } = useModal();
  const loggedInUser = useSelector(state => state.session.user)

  useEffect(() => {
    if(user.email && user.password){
      setDisableLogin(false)
    }else{
      setDisableLogin(true)
    }
  }, [user.email, user.password])


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors('');
    dispatch(thunkLogin(user))
    // .then(closeModal)
    .catch(async (data) => {
      if (data && data.errors) setErrors(data.errors);
      if (data && data.message) setErrors(data.message);
      console.log(errors)
    })
    .then(() => {
      if (!errors) {
        navigate('/')
        closeModal()
      }
    })
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors({});
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //       if (data && data.message) setErrors(data.message);
  //     });
  // };

  const handleDemo = async(e) => {
    e.preventDefault();
    try{
      dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }));
    } catch(res){
      const data = await res.json();
      if(data && data.errors){
        setErrors(data.errors)
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
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </label>
        {errors && <p className='errors'>{errors}</p>}
        <button type="submit" className="pill-button" disabled={disableLogin}>Log In</button>
        <button type="button" className="pill-button" onClick={handleDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
