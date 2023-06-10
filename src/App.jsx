import { useContext, useEffect, useState } from "react";

import AddAccount from "./sections/AddAccount";
import AddEntry from "./sections/AddEntry";
import Header from "./components/Header";
import Aside from "./components/Aside";
import GeneralJournal from "./sections/GeneralJournal";

import "./App.css";
import AppContext from "./context/AppContext";

function App() {
  const { authState, setAuthState } = useContext(AppContext);
  const [section, setSection] = useState(0);
  const [accounts, setAccounts] = useState([]);

  const [entries, setEntries] = useState([]);
  const changeSectionHandler = (section) => {
    setSection(section);
  };

  // To take new entry from AddEntry
  const addEntryHandler = (entry) => {
    setEntries([...entries, entry]);
    // localStorage.setItem("entries", JSON.stringify([...entries, entry]));
  };

  // To take new account from AddAccount
  const addAccountHandler = (account) => {
    setAccounts([...accounts, account]);
  };

  // to automatically log in
  useEffect(() => {
    localStorage.getItem("authState") &&
      setAuthState(JSON.parse(localStorage.getItem("authState")));
  }, [setAuthState]);

  //  to automatically fetch all accounts that user previously created
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/users/${authState.userId}/accounts`) 

      const resData = await res.json();

      setAccounts(resData.data.accounts)
    })();
  }, [authState.userId]);

  return (
    <div className='font-custom flex flex-col h-screen'>
      <Header />
      <main className='w-full flex flex-auto items-stretch'>
        <Aside section={section} changeSectionHandler={changeSectionHandler} />

        {section === 0 ? (
          <AddAccount addAccountHandler={addAccountHandler} />
        ) : null}
        {section === 1 ? (
          <AddEntry addEntryHandler={addEntryHandler} accounts={accounts} />
        ) : null}
        {section === 2 ? <GeneralJournal entries={entries} /> : null}
        {section === 3 ? <div></div> : null}
        {section === 4 ? <div></div> : null}
      </main>
    </div>
  );
}

export default App;
