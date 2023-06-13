const OwnerEquityStatement = ({
  capitalBalance,
  drawingsBalance,
  netIncome,
}) => {
  return (
    <div>
      <h2 className='font-semibold text-2xl text-center mb-12'>
        Statement of Owner Equity
      </h2>
      <div className="mx-auto w-96">
        <div className='text-lg flex flex-col space-y-4'>
          <p className='w-full pr-3 text-right'>
            Begining balance of Owner Capital = {capitalBalance}
          </p>
          <p className='w-full pr-3 text-right'>+Net Income = {netIncome}</p>
          <p className='w-full pr-3 text-right'>
            -Withdrawals = ({drawingsBalance})
          </p>
          <div className='border border-t-gray-300' />
          <p className='w-full pr-3 text-right'>
            Ending balance of Owner Capital ={" "}
            {capitalBalance + netIncome - drawingsBalance}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OwnerEquityStatement;
