import { Fragment, useContext, useRef, useState } from "react";

import Modal from "../components/Modal";
import AppContext from "../context/AppContext";

const AddAccount = ({ addAccountHandler }) => {
  const { authState } = useContext(AppContext);
  const [showModal, setShowModal] = useState({
    visibility: false,
    reason: null,
  });

  const accountTitle = useRef();
  const accountType = useRef();
  const balanceType = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    // checking auth state
    if (!authState.isLoggedIn)
      return setShowModal({
        visibility: true,
        reason: "Please login or signup in order to continue",
      });

    // checking correctness of inputs
    if (
      accountTitle.current.value.trim().length === 0 ||
      accountType.current.value === "" ||
      balanceType.current.value === ""
    )
      return setShowModal({
        visibility: true,
        reason: "Some input fields are empty",
      });

    const res = await fetch("http://localhost:3000/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_name: accountTitle.current.value,
        account_type: accountType.current.value,
        balance_type: balanceType.current.value,
        user_id: authState.userId,
      }),
    });
    const resData = await res.json();

    addAccountHandler(resData.data.account);

    accountTitle.current.value = "";
    accountType.current.value = "";
    balanceType.current.value = "";
  };

  return (
    <Fragment>
      {showModal.visibility && (
        <Modal
          hideModal={() => setShowModal({ visibility: false, reason: null })}
          reason={showModal.reason}
        />
      )}
      <form
        className='flex flex-col justify-start items-start gap-8 p-12 pb-0 mx-auto'
        onSubmit={submitHandler}
      >
        <label>
          <span className='mr-2'>Account Title</span>
          <input
            className='border-2 border-gray-200 p-2'
            type='text'
            name='account-title'
            placeholder='e.g. Cash'
            ref={accountTitle}
          />
        </label>
        <label className=''>
          <span className='mr-2'>Account Type</span>
          <select
            className='border-2 border-gray-200 p-2 w-48'
            name='account-type'
            ref={accountType}
            id=''
          >
            <option className='text-gray-400 disabled selected' value='' hidden>
              select an account
            </option>

            <option value='asset-account'>Asset Account</option>
            <option value='liability-account'>Liability Account</option>
            <option value='revenue-account'>Revenue Account</option>
            <option value='expense-account'>Expense Account</option>
            <option value='contra-asset-account'>Contra Asset Account</option>
            <option value='drawings-account'>Drawings Account</option>
            <option value='equity-account'>Equity Account</option>
          </select>
        </label>
        <label className=''>
          <span className='mr-2'>Normal Balance</span>
          <select
            className='border-2 border-gray-200 p-2 w-48'
            name='balance-type'
            ref={balanceType}
            id=''
          >
            <option className='text-gray-400 disabled selected' value='' hidden>
              select balance type
            </option>
            <option value='debit'>Debit Balance</option>
            <option value='credit'>Credit Balance</option>
          </select>
        </label>
        <button className='mx-auto px-10 py-2 bg-slate-200' type='submit'>
          Add
        </button>
      </form>
    </Fragment>
  );
};
export default AddAccount;
