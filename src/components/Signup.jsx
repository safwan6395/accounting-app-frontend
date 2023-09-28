import { useRef, useContext } from "react";
import Modal from "./Modal";
import AppContext from "../context/AppContext";

const Signup = ({ hideModal }) => {
  const { authState, setAuthState } = useContext(AppContext);

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      name.current.value.trim().length !== 0 &&
      email.current.value.trim().length !== 0 &&
      password.current.value.trim().length !== 0
    ) {
      const res = await fetch("https://accounting-app-backend.cyclic.cloud/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.current.value,
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
      {!authState.isLoggedIn ? (
        <form className='flex flex-col gap-8' onSubmit={signupHandler}>
          <label>
            <span className='mr-8'>Name</span>
            <input
              className='border-2 border-gray-200 p-2 w-64'
              type='text'
              name='name'
              placeholder='e.g. safwan'
              ref={name}
            />
          </label>
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
            Signup
          </button>
        </form>
      ) : (
        "Successfull signup"
      )}
    </Modal>
  );
};
export default Signup;
