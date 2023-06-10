import { useContext, useRef } from "react";
import Modal from "./Modal";
import AppContext from "../context/AppContext";

const Login = ({ hideModal }) => {
  const { authState, setAuthState } = useContext(AppContext);
  const email = useRef();
  const password = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (
      email.current.value.trim().length !== 0 &&
      password.current.value.trim().length !== 0
    ) {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      });
      const resData = await res.json();
      setAuthState({
        userId: resData.data.user._id,
        name: resData.data.user.name,
        isLoggedIn: true,
      });
      localStorage.setItem('authState', JSON.stringify({
        userId: resData.data.user._id,
        name: resData.data.user.name,
        isLoggedIn: true,
      }))
    }
  };

  return (
    <Modal hideModal={hideModal}>
      {!authState.isLoggedIn ? <form className='flex flex-col gap-8' onSubmit={loginHandler}>
        <label>
          <span className='mr-8'>Email</span>
          <input
            className='border-2 border-gray-200 p-2 w-64'
            type='email'
            name='email'
            placeholder='e.g. safwanahmed@gmail.com'
            ref={email}
          />
        </label>
        <label>
          <span className='mr-8'>Password</span>
          <input
            className='border-2 border-gray-200 p-2 w-64'
            type='password'
            name='password'
            placeholder='*******'
            ref={password}
          />
        </label>
        <button type='submit' className='mx-auto px-10 py-2 bg-slate-200'>
          Login
        </button>
      </form> : 'Successfully login'}
    </Modal>
  );
};
export default Login;
