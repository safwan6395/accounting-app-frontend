import { Fragment } from "react";

const GeneralJournal = ({ entries }) => {
  return (
    <section className='flex-1 bg-slate-50 p-4 pb-28 relative -z-10'>
      {entries.length === 0 ? (
        <p className='text-center text-xl pt-8'>No entries to display!</p>
      ) : (
        <table className='mx-auto'>
          <thead>
            <tr className='bg-slate-200'>
              <th className='w-40 py-6'>Date</th>
              <th className='w-60 py-6'>Accounts</th>
              <th className='w-40 py-6'>Debit</th>
              <th className='w-40 py-6'>Credit</th>
            </tr>
          </thead>
          <tbody className=''>
            {entries.map((entry, index) => (
              <Fragment key={index}>
                {entry.debitAccounts.map((acc, i) => (
                  <tr
                    key={i}
                    className={index % 2 !== 0 ? "bg-slate-200" : null}
                  >
                    {i === 0 ? (
                      <td
                        rowSpan={
                          entry.debitAccounts.length +
                          entry.creditAccounts.length +
                          1
                        }
                        className='text-center pt-2'
                      >
                        {entry.date}
                      </td>
                    ) : null}
                    <td className='pt-2'>{acc.debitAccount}</td>
                    <td className='text-center pt-2'>{acc.amount}</td>
                    <td></td>
                  </tr>
                ))}
                {entry.creditAccounts.map((acc, i) => (
                  <tr
                    key={i}
                    className={index % 2 !== 0 ? "bg-slate-200" : null}
                  >
                    <td className='indent-9'>{acc.creditAccount}</td>
                    <td></td>
                    <td className='text-center'>{acc.amount}</td>
                  </tr>
                ))}
                <tr className={`${index % 2 !== 0 ? "bg-slate-200" : null}`}>
                  <td colSpan='3' className='pb-2'>
                    ({entry.description})
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};
export default GeneralJournal;
