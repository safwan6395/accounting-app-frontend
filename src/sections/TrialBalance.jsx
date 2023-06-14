const TrialBalance = ({ accounts }) => {
  const filterAccs = accounts.filter((a) => a.balance !== 0);

  const formattedAccs = filterAccs.map((a) => {
    if (a.balance_type === "debit") {
      console.log("first if");
      if (a.balance > 0) return [a.account_name, a.balance, "-"];
      else return [a.account_name, "-", a.balance];
    }

    if (a.balance_type === "credit" && a.balance > 0) {
      console.log("second if");
      if (a.balance > 0) return [a.account_name, "-", a.balance];
      else return [a.account_name, a.balance, "-"];
    }
  });

  return (
    <section className='flex-1 bg-slate-50 p-4 pb-28 relative -z-10'>
      <table className='mx-auto w-3/4'>
        <thead>
          <tr className='bg-slate-200'>
            <th className='py-6'>Accounts</th>
            <th className='py-6'>Debit</th>
            <th className='py-6'>Credit</th>
          </tr>
        </thead>
        <tbody className=''>
          {formattedAccs.map(([name, debit, credit], i) => (
            <tr key={Math.random()} className={i % 2 !== 0 ? 'bg-slate-200' : ''}>
              <td className='text-center py-4'>{name}</td>
              <td className='text-center pt-4'>{debit}</td>
              <td className='text-center pt-4'>{credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default TrialBalance;
