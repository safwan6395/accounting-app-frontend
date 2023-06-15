import { Fragment, useContext, useState } from "react";
import Modal from "../components/Modal";
import AppContext from "../context/AppContext";

const ClosingEntries = ({ accounts, addAccountHandler }) => {
  const { authState } = useContext(AppContext);
  const [displayClosingEntriesBtn, setDisplayClosingEntriesBtn] =
    useState(true);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState({
    visibility: false,
    reason: null,
  });
  // use

  const displayClosingEntriesHandler = async () => {
    setDisplayClosingEntriesBtn(false);
    setDisabled(true);

    if (!authState.isLoggedIn)
      return setShowModal({
        visibility: true,
        reason: "Please login or signup in order to continue",
      });

    if (!accounts.some((a) => a.account_type === "income-summary-account")) {
      const res = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_name: "Income Summary",
          account_type: "income-summary-account",
          balance_type: "credit",
          user_id: authState.userId,
        }),
      });
      const resData = await res.json();

      addAccountHandler(resData.data.account);
    }

    // work here
    const requireObj = {
      date: new Date().toISOString().split('T')[0],
      description: "closing revenue accounts",
      user_id: authState.userId,
      debitAccounts: [{

      }],
      creditAccounts: []
    }

    // // Adding each transaction to DB
    // requireObj.debitAccounts.forEach(async (debAcc) => {
    //   const res = await fetch(
    //     `http://localhost:3000/accounts/${debAcc._id}/transactions`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         date: requireObj.date,
    //         account_name: debAcc.debitAccount,
    //         transaction_type: "Debit",
    //         amount: debAcc.amount,
    //         user_id: authState.userId,
    //       }),
    //     }
    //   );

    //   const resData = await res.json();
    //   addTransactionHandler(resData.data.transaction);

    //   // Reflecting the effect of transaction on base account 
    //   await fetch(
    //     `http://localhost:3000/accounts/${resData.data.transaction.account_id}`,
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         transaction_type: resData.data.transaction.transaction_type,
    //         amount: resData.data.transaction.amount,
    //       }),
    //     }
    //   );
    // });

    // // Adding each transaction to DB
    // requireObj.creditAccounts.forEach(async (credAcc) => {
    //   const res = await fetch(
    //     `http://localhost:3000/accounts/${credAcc._id}/transactions`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         date: requireObj.date,
    //         account_name: credAcc.creditAccount,
    //         transaction_type: "Credit",
    //         amount: credAcc.amount,
    //         user_id: authState.userId,
    //       }),
    //     }
    //   );
    //   const resData = await res.json();
    //   addTransactionHandler(resData.data.transaction);
      
    //   // Reflecting the effect of transaction on base account 
    //   await fetch(
    //     `http://localhost:3000/accounts/${resData.data.transaction.account_id}`,
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         transaction_type: resData.data.transaction.transaction_type,
    //         amount: resData.data.transaction.amount,
    //       }),
    //     }
    //   );
    // });

    setDisabled(false)
  };

  const removeClosingEntriesHandler = async () => {
    setDisplayClosingEntriesBtn(true);
    setDisabled(true);

    setDisabled(false);
  };

  return (
    <Fragment>
      {showModal.visibility && (
        <Modal
          hideModal={() => setShowModal({ visibility: false, reason: null })}
          reason={showModal.reason}
        />
      )}
      <div className='w-full'>
        {displayClosingEntriesBtn ? (
          <button
            className='block mx-auto my-6 px-10 py-2 bg-slate-200'
            onClick={displayClosingEntriesHandler}
            disabled={disabled}
          >
            Pass Closing Entries
          </button>
        ) : (
          <button
            className='block mx-auto my-6 px-10 py-2 bg-slate-200'
            onClick={removeClosingEntriesHandler}
            disabled={disabled}
          >
            Remove Closing Entries
          </button>
        )}
      </div>
    </Fragment>
  );
};
export default ClosingEntries;
