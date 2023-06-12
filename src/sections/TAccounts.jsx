import { Fragment } from "react";

const TAccounts = ({ transactions }) => {
  const accNames = transactions.map((t) => t.account_name);
  const uniqueAcc = [...new Set([...accNames])];

  const formatedData = uniqueAcc.map((u) => {
    let tAcc = { name: u, debits: [], credits: [] };
    transactions.map((t) => {
      if (t.account_name === u) {
        if (t.transaction_type === "Debit") tAcc.debits.push(t.amount);
        if (t.transaction_type === "Credit") tAcc.credits.push(t.amount);
      }
    });
    return tAcc;
  });

  return (
    <Fragment>
      {transactions.length === 0 && (
        <p className='text-center text-xl pt-8 w-full'>No Accounts to display!</p>
      )}
      <div>
        <div className='flex flex-wrap'>
          {formatedData.map((d) => (
            <div key={Math.random()} className='flex flex-col w-52 m-8'>
              <p className='text-center border-gray border-b-2 pb-2'>
                {d.name}
              </p>
              <div className='flex justify-around pt-2'>
                <div className='w-28 text-center border-gray border-r-2'>
                  {d.debits.map((deb) => (
                    <div key={Math.random()}>{deb}</div>
                  ))}
                </div>
                <div className='w-28 text-center '>
                  {d.credits.map((cred) => (
                    <div key={Math.random()}>{cred}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
export default TAccounts;
