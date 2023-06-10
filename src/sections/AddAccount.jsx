import { useRef } from "react";

const AddAccount = ({ addAccountHandler }) => {
  const accountTitle = useRef();
  const accountType = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      accountTitle.current.value.trim().length !== 0 &&
      accountType.current.value
    ) {
      addAccountHandler({
        id: Math.random(),
        name: accountTitle.current.value,
        type: accountType.current.value,
      });
      accountTitle.current.value = "";
      accountType.current.value = "";
    }
  };

  return (
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
          className='border-2 border-gray-200 p-2 w-44'
          name='account-type'
          ref={accountType}
          id=''
        >
          <option className='text-gray-400 disabled selected' value='' hidden>
            select an Account
          </option>

          <option value='asset-account'>Asset Account</option>
          <option value='liability-account'>Liability Account</option>
          <option value='revenue-account'>Revenue Account</option>
          <option value='expense-account'>Expense Account</option>
          <option value='contra-asset-account'>Contra Asset Account</option>
          <option value='drawings-account'>Drawings Account</option>
        </select>
      </label>
      <button className='mx-auto px-10 py-2 bg-slate-200' type='submit'>
        Add
      </button>
    </form>
  );
};
export default AddAccount;
