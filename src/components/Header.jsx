import { Fragment, useContext, useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import AppContext from "../context/AppContext";

const Header = () => {
  const { authState, setAuthState } = useContext(AppContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <Fragment>
      {showLoginModal && <Login hideModal={() => setShowLoginModal(false)} />}
      {showSignupModal && (
        <Signup hideModal={() => setShowSignupModal(false)} />
      )}
      <header className='flex justify-between items-center w-full px-6 py-4 bg-slate-400'>
        <h1 className='font-semibold text-2xl'>Basic Accounting Project</h1>
        <nav className=''>
          <ul className='flex gap-x-6'>
            {!authState.isLoggedIn ? (
              <Fragment>
                <li>
                  <button
                    className='py-1 px-4 hover:bg-slate-500 duration-300'
                    onClick={() => setShowLoginModal(true)}
                  >
                    login
                  </button>
                </li>
                <li>
                  <button
                    className='py-1 px-4 hover:bg-slate-500 duration-300'
                    onClick={() => setShowSignupModal(true)}
                  >
                    signup
                  </button>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <p className='py-1 px-4'>Hey, {authState.name}</p>
                </li>
                <li>
                  <button
                    className='py-1 px-4 bg-slate-500 duration-300'
                    onClick={() => {
                      setAuthState({
                        isLoggedIn: false,
                        name: null,
                        userId: null,
                      });
                      localStorage.removeItem('authState')
                    }}
                  >
                    Logout
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};
export default Header;
