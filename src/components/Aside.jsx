const Aside = ({ section, changeSectionHandler }) => {
  return (
    <aside className='w-60 bg-slate-200 overflow-hidden flex-shrink-0'>
      <ul className='flex flex-col items-center my-2 mx-4'>
        <li
          onClick={() => {
            changeSectionHandler(0);
          }}
          className={`w-full text-center py-4 ${section === 0 ? "active" : ""}`}
        >
          <a href='#'>Add Account</a>
        </li>
        <li
          onClick={() => {
            changeSectionHandler(1);
          }}
          className={`w-full text-center py-4 ${section === 1 ? "active" : ""}`}
        >
          <a href='#'>New Entry</a>
        </li>
        <li
          onClick={() => {
            changeSectionHandler(2);
          }}
          className={`w-full text-center py-4 ${section === 2 ? "active" : ""}`}
        >
          <a href='#'>General Journal</a>
        </li>
        <li
          onClick={() => {
            changeSectionHandler(3);
          }}
          className={`w-full text-center py-4 ${section === 3 ? "active" : ""}`}
        >
          <a href='#'>T Accounts</a>
        </li>
        <li
          onClick={() => {
            changeSectionHandler(4);
          }}
          className={`w-full text-center py-4 ${section === 4 ? "active" : ""}`}
        >
          <a href='#'>Financial Statements</a>
        </li>
        <li
          onClick={() => {
            changeSectionHandler(5);
          }}
          className={`w-full text-center py-4 ${section === 5 ? "active" : ""}`}
        >
          <a href='#'>About Us</a>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
