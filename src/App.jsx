import { useContext, useEffect, useState } from "react";

import AddAccount from "./sections/AddAccount";
import AddEntry from "./sections/AddEntry";
import Header from "./components/Header";
import Aside from "./components/Aside";
import GeneralJournal from "./sections/GeneralJournal";
import AppContext from "./context/AppContext";
import TAccounts from "./sections/TAccounts";
import FinancialStatements from "./sections/FinancialStatements";
import TrialBalance from "./sections/TrialBalance";
import ClosingEntries from "./sections/ClosingEntries";
import AboutUs from "./sections/AboutUs";

import "./App.css";

function App() {
  const { authState, setAuthState } = useContext(AppContext);
  const [section, setSection] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [entries, setEntries] = useState([]);
  const [closingEntries, setClosingEntries] = useState([]);

  const [displayClosingEntriesBtn, setDisplayClosingEntriesBtn] =
    useState(true);

  const changeSectionHandler = (section) => {
    setSection(section);
  };

  // To take new entry from AddEntry which takes entry from AddEntryForm
  const addEntryHandler = (entry) => {
    setEntries((prevState) => [...prevState, entry]);
  };

  // To take new account from AddAccount
  const addAccountHandler = (account) => {
    setAccounts((prevState) => [...prevState, account]);
  };

  // To take new transaction from AddEntry which takes entry from AddEntryForm
  const addTransactionHandler = (transaction) => {
    setTransactions((prevState) => {
      return [...prevState, transaction];
    });
  };

  // manage state that decide whether the closing entries are supposed to be displayed or not
  const displayClosingEntriesBtnHandler = (state) => {
    setDisplayClosingEntriesBtn(state);
  };

  const closingEntriesHandler = (entry) => {
    setClosingEntries((prevState) => [...prevState, entry]);
  };

  // to automatically log in
  useEffect(() => {
    localStorage.getItem("authState") &&
      setAuthState(JSON.parse(localStorage.getItem("authState")));
  }, [setAuthState]);

  //  to automatically fetch all accounts that user previously created
  useEffect(() => {
    (() => {
      setTimeout(async () => {
        const res = await fetch(
          `https://accounting-app-backend.cyclic.cloud/users/${authState.userId}/accounts`
        );

        const resData = await res.json();

        setAccounts(resData.data.accounts);
      }, 1500);
    })();
  }, [authState.userId, entries, closingEntries]);

  // to automatically fetch all transactions that user previously did
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://accounting-app-backend.cyclic.cloud/users/${authState.userId}/transactions`
      );

      const resData = await res.json();

      setTransactions(resData.data.transactions);
    })();
  }, [authState.userId]);

  // to automatically fetch all entries that user did
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://accounting-app-backend.cyclic.cloud/users/${authState.userId}/entry`
      );

      const resData = await res.json();

      resData.data.entries.forEach((e) => (e.date = e.date.split("T")[0]));

      setEntries(resData.data.entries);
    })();
  }, [authState.userId]);

  // to automatically fetch all closing entries that user did
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://accounting-app-backend.cyclic.cloud/users/${authState.userId}/closingentry`
      );

      const resData = await res.json();

      resData.data.entries.forEach((e) => (e.date = e.date.split("T")[0]));

      setClosingEntries(resData.data.entries);
    })();
  }, [authState.userId]);

  return (
    <div className='font-custom flex flex-col h-screen'>
      <Header />
      <main className='w-full flex flex-auto items-stretch'>
        <Aside section={section} changeSectionHandler={changeSectionHandler} />
        {section === 0 ? (
          <AddAccount
            accounts={accounts}
            addAccountHandler={addAccountHandler}
          />
        ) : null}
        {section === 1 ? (
          <AddEntry
            addEntryHandler={addEntryHandler}
            addTransactionHandler={addTransactionHandler}
            accounts={accounts}
          />
        ) : null}
        {section === 2 ? <GeneralJournal entries={entries} /> : null}
        {section === 3 ? <TAccounts transactions={transactions} /> : null}
        {section === 4 ? <TrialBalance accounts={accounts} /> : null}
        {section === 5 ? <FinancialStatements accounts={accounts} /> : null}
        {/*{section === 6 ? (
          <ClosingEntries
            accounts={accounts}
            closingEntries={closingEntries}
            closingEntriesHandler={closingEntriesHandler}
            addAccountHandler={addAccountHandler}
            addTransactionHandler={addTransactionHandler}
            displayClosingEntriesBtn={displayClosingEntriesBtn}
            displayClosingEntriesBtnHandler={displayClosingEntriesBtnHandler}
          />
        ) : null}*/}
        {section === 6 ? <AboutUs /> : null}
      </main>
    </div>
  );
}

export default App;
