import { Fragment, useContext, useState } from "react";
import InputFields from "./InputFields";
import Modal from "./Modal";
import AppContext from "../context/AppContext";

const AddEntryForm = ({ accounts, addEntryHandler, addTransactionHandler }) => {
  const [showModal, setShowModal] = useState({
    visibility: false,
    reason: null,
  });
  const [numDebitInputFields, setNumDebitInputFields] = useState(1);
  const [numCreditInputFields, setNumCreditInputFields] = useState(1);

  const { authState } = useContext(AppContext);

  const changeNumDebitInputFieldsHandler = (numFields) => {
    setNumDebitInputFields(numFields);
  };

  const changeNumCreditInputFieldsHandler = (numFields) => {
    setNumCreditInputFields(numFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // reformatting the data
    const requireObj = { debitAccounts: [], creditAccounts: [] };

    const dataArr = Object.entries(data);
    let valueFromPrevIter; // to save a value that will be used in next iteration
    dataArr.forEach(([key, value]) => {
      if (key === "date") requireObj.date = value;
      if (key === "description") requireObj.description = value;

      if (key.startsWith("debit-account-title")) {
        valueFromPrevIter = value.split(" ");
      } else if (key.startsWith("debit-amount")) {
        requireObj.debitAccounts.push({
          _id: valueFromPrevIter[valueFromPrevIter.length - 1],
          debitAccount: valueFromPrevIter
            .map((v, i, a) => (i !== a.length - 1 ? v : ""))
            .join(" "),
          amount: value,
        });
      }

      if (key.startsWith("credit-account-title")) {
        valueFromPrevIter = value.split(" ");
      } else if (key.startsWith("credit-amount")) {
        requireObj.creditAccounts.push({
          _id: valueFromPrevIter[valueFromPrevIter.length - 1],
          creditAccount: valueFromPrevIter
            .map((v, i, a) => (i !== a.length - 1 ? v : ""))
            .join(" "),
          amount: value,
        });
      }
    });

    // comparing debit and credit balance
    let credAccAmount = 0;
    let debAccAmount = 0;
    requireObj.creditAccounts.forEach(
      (credAcc) => (credAccAmount += +credAcc.amount)
    );
    requireObj.debitAccounts.forEach(
      (debAcc) => (debAccAmount += +debAcc.amount)
    );
    // console.log(credAccAmount, debAccAmount);
    if (credAccAmount !== debAccAmount) {
      return setShowModal({
        visibility: true,
        reason: "credit and debit amounts are not equal",
      });
      // console.log("credit and debit amounts are not equal");
    }
    if (credAccAmount === 0 || debAccAmount === 0) {
      return setShowModal({
        visibility: true,
        reason: "some amount fields are empty",
      });
    }

    // Adding each transaction to DB
    requireObj.debitAccounts.forEach(async (debAcc) => {
      const res = await fetch(
        `http://localhost:3000/accounts/${debAcc._id}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: requireObj.date,
            account_name: debAcc.debitAccount,
            transaction_type: "Debit",
            amount: debAcc.amount,
            user_id: authState.userId,
          }),
        }
      );

      const resData = await res.json();

      addTransactionHandler(resData.data.transaction);
    });

    requireObj.creditAccounts.forEach(async (credAcc) => {
      const res = await fetch(
        `http://localhost:3000/accounts/${credAcc._id}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: requireObj.date,
            account_name: credAcc.creditAccount,
            transaction_type: "Credit",
            amount: credAcc.amount,
            user_id: authState.userId,
          }),
        }
      );

      const resData = await res.json();

      addTransactionHandler(resData.data.transaction);
    });

    // lifting the data up
    addEntryHandler(requireObj);
    console.log("submitted");

    // reseting the form
    form.reset();
  };

  return (
    <Fragment>
      {showModal.visibility && (
        <Modal
          hideModal={() => setShowModal({ visibility: false, reason: null })}
          reason={showModal.reason}
        />
      )}
      <form className='p-12' onSubmit={handleSubmit}>
        <label>
          <span className='mr-2'>Date</span>
          <input
            className='border-2 border-gray-200 p-2'
            type='date'
            name='date'
            defaultValue={new Date().toISOString().substring(0, 10)}
          />
        </label>
        <h4 className='mt-10 text-xl font-semibold'>Debit Accounts:</h4>
        {Array.from({ length: numDebitInputFields }, (_, i) => (
          <InputFields
            key={i}
            i={i}
            name='debit'
            accounts={accounts}
            numInputFields={numDebitInputFields}
            changeNumInputFieldsHandler={changeNumDebitInputFieldsHandler}
          />
        ))}

        <h4 className='mt-10 text-xl font-semibold'>Credit Accounts:</h4>
        {Array.from({ length: numCreditInputFields }, (_, i) => (
          <InputFields
            key={i}
            i={i}
            name='credit'
            accounts={accounts}
            numInputFields={numCreditInputFields}
            changeNumInputFieldsHandler={changeNumCreditInputFieldsHandler}
          />
        ))}

        <h4 className='mt-10 text-xl font-semibold'>Description:</h4>
        <textarea
          className='border-2 border-gray-200 p-2 mt-4'
          name='description'
          id=''
          cols='70'
          rows='4'
        ></textarea>

        <button
          className='block mt-10 mx-auto px-10 py-4 bg-slate-200'
          type='submit'
        >
          submit
        </button>
      </form>
    </Fragment>
  );
};
export default AddEntryForm;
