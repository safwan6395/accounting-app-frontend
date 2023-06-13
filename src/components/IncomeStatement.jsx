const IncomeStatement = ({
  revenueAccs,
  expenseAccs,
  totalRevenue,
  totalExpense,
}) => {
  return (
    <div>
      <h2 className='font-semibold text-2xl text-center mb-6'>
        Income Statement
      </h2>
      <div className="mx-auto w-80">
        <div className='revenues mb-6'>
          <h4 className='text-lg mb-2'>Revenues:</h4>
          {revenueAccs.map((r) => (
            <div key={Math.random()} className='flex space-x-4 ml-10'>
              <p>{r.accName}: </p>
              <p>{r.amount}</p>
            </div>
          ))}
          <h6 className='ml-44 mt-4 font-semibold'>Total: {totalRevenue}</h6>
        </div>
        <div className='expense'>
          <h4 className='text-lg mb-2'>Expenses:</h4>
          {expenseAccs.map((e) => (
            <div key={Math.random()} className='flex space-x-4 ml-10'>
              <p>{e.accName}: </p>
              <p>{e.amount}</p>
            </div>
          ))}
          <h6 className='ml-44 mt-4 font-semibold'>Total: {totalExpense}</h6>
        </div>
      </div>
      <div className='net-income text-center mt-8 text-lg'>
        Total Revenue - Total Expense = Net Income
      </div>
      <div className='net-income text-center mt-2 text-lg'>
        {totalRevenue} - {totalExpense} = {totalRevenue - totalExpense}
      </div>
    </div>
  );
};
export default IncomeStatement;
