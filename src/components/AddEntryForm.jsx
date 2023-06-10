import { Fragment, useState } from "react";
import InputFields from "./InputFields";
import Modal from "./Modal";

const AddEntryForm = ({ accounts, takeEntryHandler }) => {
  const [showModal, setShowModal] = useState({
    visibility: false,
    reason: null,
  });
  const [numDebitInputFields, setNumDebitInputFields] = useState(1);
  const [numCreditInputFields, setNumCreditInputFields] = useState(1);

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
        valueFromPrevIter = value;
      } else if (key.startsWith("debit-amount")) {
        requireObj.debitAccounts.push({
          debitAccount: valueFromPrevIter,
          amount: value,
        });
      }

      if (key.startsWith("credit-account-title")) {
        valueFromPrevIter = value;
      } else if (key.startsWith("credit-amount")) {
        requireObj.creditAccounts.push({
          creditAccount: valueFromPrevIter,
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

    // lifting the data up
    takeEntryHandler(requireObj);
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
