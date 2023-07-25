import { useContext, useState } from "react";
import Modal from "../components/Modal";
import AppContext from "../context/AppContext";
import useData from "../hooks/useData";
import GeneralJournal from "./GeneralJournal";

const ClosingEntries = ({
  accounts,
  closingEntries,
  closingEntriesHandler,
  addAccountHandler,
  addTransactionHandler,
  displayClosingEntriesBtn,
  displayClosingEntriesBtnHandler,
}) => {
  const { authState } = useContext(AppContext);

  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState({
    visibility: false,
    reason: null,
  });

  const {
    revenueTotal,
    filterRevAccs,
    expenseTotal,
    filterExpAccs,
    drawingsTotal,
    cId,
    dId,
  } = useData(accounts);

  // console.log(
  //   revenueTotal,
  //   filterRevAccs,
  //   expenseTotal,
  //   filterExpAccs,
  //   drawingsTotal,
  //   cId,
  //   dId
  // );

  const submitAndDisplayClosingEntriesHandler = async () => {
    if (!authState.isLoggedIn) {
      return setShowModal({
        visibility: true,
        reason: "Please login or signup in order to continue",
      });
    }

    displayClosingEntriesBtnHandler(false);
    setDisabled(true);

    let id;
    await (async () => {
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

        id = resData.data.account._id;
        addAccountHandler(resData.data.account);
      } else {
        const acc = accounts.find(
          (a) => a.account_type === "income-summary-account"
        );
        id = acc._id;
      }
    })();

    Array.from({ length: 4 }).forEach(async (_, i) => {
      let requireObj;
      switch (i) {
        case 0:
          requireObj = {
            date: new Date().toISOString().split("T")[0],
            description: "closing revenue accounts",
            user_id: authState.userId,
            debitAccounts: filterRevAccs,
            creditAccounts: [
              {
                _id: id,
                creditAccount: "Income Summary",
                amount: revenueTotal,
              },
            ],
          };
          break;

        case 1:
          requireObj = {
            date: new Date().toISOString().split("T")[0],
            description: "closing expense accounts",
            user_id: authState.userId,
            debitAccounts: [
              {
                _id: id,
                debitAccount: "Income Summary",
                amount: expenseTotal,
              },
            ],
            creditAccounts: filterExpAccs,
          };
          break;

        case 2:
          if (revenueTotal - expenseTotal > 0) {
            requireObj = {
              date: new Date().toISOString().split("T")[0],
              description: "closing income summary accounts",
              user_id: authState.userId,
              debitAccounts: [
                {
                  _id: id,
                  debitAccount: "Income Summary",
                  amount: revenueTotal - expenseTotal,
                },
              ],
              creditAccounts: [
                {
                  _id: cId,
                  creditAccount: "Capital",
                  amount: revenueTotal - expenseTotal,
                },
              ],
            };
          }
          if (revenueTotal - expenseTotal < 0) {
            requireObj = {
              date: new Date().toISOString().split("T")[0],
              description: "closing income summary accounts",
              user_id: authState.userId,
              debitAccounts: [
                {
                  _id: cId,
                  debitAccount: "Capital",
                  amount: Math.abs(revenueTotal - expenseTotal),
                },
              ],
              creditAccounts: [
                {
                  _id: id,
                  creditAccount: "Income Summary",
                  amount: Math.abs(revenueTotal - expenseTotal),
                },
              ],
            };
          }
          break;

        case 3:
          requireObj = {
            date: new Date().toISOString().split("T")[0],
            description: "closing drawings accounts",
            user_id: authState.userId,
            debitAccounts: [
              {
                _id: cId,
                debitAccount: "Capital",
                amount: drawingsTotal,
              },
            ],
            creditAccounts: [
              {
                _id: dId,
                creditAccount: "Drawings",
                amount: drawingsTotal,
              },
            ],
          };
          break;

        default:
          break;
      }
      // console.log(requireObj);

      // Adding each transaction to DB
      await requireObj.debitAccounts.forEach(async (debAcc) => {
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

        // Reflecting the effect of transaction on base account
        const clg = await fetch(
          `http://localhost:3000/accounts/${resData.data.transaction.account_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              transaction_type: resData.data.transaction.transaction_type,
              amount: resData.data.transaction.amount,
            }),
          }
        );
        console.log(await clg.json());
      });

      // Adding each transaction to DB
      await requireObj.creditAccounts.forEach(async (credAcc) => {
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

        // Reflecting the effect of transaction on base account
        const clg2 = await fetch(
          `http://localhost:3000/accounts/${resData.data.transaction.account_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              transaction_type: resData.data.transaction.transaction_type,
              amount: resData.data.transaction.amount,
            }),
          }
        );
        console.log(await clg2.json());
      });

      // sending the entry to backend
      await (async () => {
        await fetch("http://localhost:3000/users/closingentry", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...requireObj, user_id: authState.userId }),
        });
      })();

      closingEntriesHandler(requireObj);
    });

    setTimeout(async () => {
      const res = await fetch(`http://localhost:3000/accounts/zero/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({}),
      });

      console.log(await res.json());
    }, 2500);

    setDisabled(false);
  };

  const removeAndHideClosingEntriesHandler = async () => {
    displayClosingEntriesBtnHandler(true);
    setDisabled(true);

    setDisabled(false);
  };

  return (
    <div className='flex flex-col space-y-10 mx-auto'>
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
            onClick={submitAndDisplayClosingEntriesHandler}
            disabled={disabled}
          >
            Pass Closing Entries
          </button>
        ) : (
          <button
            className='block mx-auto my-6 px-10 py-2 bg-slate-200'
            onClick={removeAndHideClosingEntriesHandler}
            disabled={disabled}
          >
            Remove Closing Entries
          </button>
        )}
      </div>
      <GeneralJournal entries={closingEntries} />
    </div>
  );
};
export default ClosingEntries;
