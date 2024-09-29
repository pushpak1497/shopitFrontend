import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({});
  const { name, email, password } = user;
  const [register, { isLoading, error, data, isSuccess }] =
    useRegisterMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(data);
  const handleRegister = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("user created");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess, navigate]);
  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={handleRegister}>
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={onchange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={onchange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={onchange}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            disabled={isLoading}
            className="btn w-100 py-2"
          >
            {isLoading ? "Registering....." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
