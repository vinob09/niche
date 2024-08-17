import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupFormModal.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  // const [username, setUsername] = useState("");
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [disableSignUp, setDisableSignUp] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const { username, first_name, last_name, email, password, confirmPassword } = user;
    if (username && first_name && last_name && email && password && confirmPassword) {
      setDisableSignUp(false);
    } else {
      setDisableSignUp(true);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (user.password !== user.confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
    }

    const userData = {  
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    };

    const res = await dispatch(thunkSignup(userData));

    if (res && res.errors) {
      setErrors(res.errors);
    } else if (res && res.server) {
      setErrors({ server: res.server })
    } else {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    setErrors({ ...errors, [name]: '' })
  }

  return (
    <div className="signup-form-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleInputChange}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}
        <label>
          Last Name
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleInputChange}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}
        <label>
          Email
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className='pill-button' disabled={disableSignUp}>Sign Up</button>
      </form>
    </div>
  );
}
export default SignupFormModal;
