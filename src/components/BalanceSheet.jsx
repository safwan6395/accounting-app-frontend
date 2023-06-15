const BalanceSheet = ({
  assetAccs,
  contraAssetAccs,
  liabilityAccs,
  capital,
}) => {
  let assetTotal =
    assetAccs.reduce((acc, a) => acc + a.amount, 0) -
    contraAssetAccs.reduce((acc, a) => acc + a.amount, 0);
  let liabilityAndOETotal =
    liabilityAccs.reduce((acc, a) => acc + a.amount, 0) + capital;

  const emptyDivNum =
    assetAccs.length + contraAssetAccs.length - liabilityAccs.length - 1;

  return (
    <div className='mx-auto w-full px-56'>
      <h2 className='font-semibold text-2xl text-center mb-10'>
        Balance Sheet
      </h2>
      <div className='flex'>
        <table className='w-1/2'>
          <thead>
            <tr className='border border-gray-500'>
              <th className='py-4 border border-gray-500'>Assets</th>
              <th className='py-4 border border-gray-500 w-1/3'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {assetAccs.map((a) => (
              <tr key={Math.random()}>
                <td className='py-4 border border-gray-500 text-center'>
                  {a.accName}
                </td>
                <td className='py-4 border border-gray-500 text-center'>
                  {a.amount}
                </td>
              </tr>
            ))}
            {contraAssetAccs.map((a) => (
              <tr key={Math.random()}>
                <td className='py-4 border border-gray-500 text-center'>
                  {a.accName}
                </td>
                <td className='py-4 border border-gray-500 text-center'>
                  ({a.amount})
                </td>
              </tr>
            ))}
            <tr>
              <td className='py-4 border border-gray-500 text-center font-semibold'>
                Total
              </td>
              <td className='py-4 border border-gray-500 text-center'>
                {assetTotal}
              </td>
            </tr>
          </tbody>
        </table>
        <table className='w-1/2'>
          <thead>
            <tr className='border border-gray-500'>
              <th className='py-4 border border-gray-500'>
                Liabilities + Owner Equity
              </th>
              <th className='w-1/3 py-4 border border-gray-500'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {liabilityAccs.map((a) => (
              <tr key={Math.random()}>
                <td className='py-4 border border-gray-500 text-center'>
                  {a.accName}
                </td>
                <td className='py-4 border border-gray-500 text-center'>
                  {a.amount}
                </td>
              </tr>
            ))}
            <tr>
              <td className='py-4 border border-gray-500 text-center'>
                Capital
              </td>
              <td className='py-4 border border-gray-500 text-center'>
                {capital}
              </td>
            </tr>
            {Array.from({ length: emptyDivNum }).map((_, i) => (
              <tr key={i}>
                <td className='py-7 border border-gray-500 text-center font-semibold'></td>
                <td className='py-7 border border-gray-500 text-center'></td>
              </tr>
            ))}
            <tr>
              <td className='py-4 border border-gray-500 text-center font-semibold'>
                Total
              </td>
              <td className='py-4 border border-gray-500 text-center'>
                {liabilityAndOETotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BalanceSheet;
