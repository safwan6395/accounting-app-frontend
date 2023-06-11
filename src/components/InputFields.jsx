const InputFields = ({i, accounts, name, numInputFields, changeNumInputFieldsHandler}) => {
  return (
    <div className='mt-4 flex items-center space-x-8'>
      <label className=''>
        <span className='mr-2'>Account Title</span>
        <select
          className='border-2 border-gray-200 p-2 w-44'
          name={`${name}-account-title-${i}`}
          id=''
        >
          <option className='text-gray-400 disabled selected' value='' hidden>
            select an Account
          </option>
          {accounts.map((acc) => (
            <option value={`${acc.account_name} ${acc._id}`} key={acc._id}>
              {acc.account_name} {" "} {`(${acc.account_type})`}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className='mr-2'>Amount</span>
        <input
          className='border-2 border-gray-200 p-2 w-36'
          type='number'
          name={`${name}-amount-${i}`}
          placeholder='e.g. 999'
          id=''
        />
      </label>
      {i === 0 ? (
        <div className='flex items-center'>
          <div className='border-t-2 border-dotted border-gray-400 w-16'></div>
          <button
            className='border-2 border-gray-400 rounded-full w-8 h-8'
            onClick={(e) => {
              e.preventDefault();
              changeNumInputFieldsHandler(numInputFields + 1);
            }}
          >
            +
          </button>
        </div>
      ) : null}
      {i + 1 === numInputFields && i !== 0 ? (
        <div className='flex items-center'>
          <div className='border-t-2 border-dotted border-gray-400 w-16'></div>
          <button
            className='border-2 border-gray-400 rounded-full w-8 h-8'
            onClick={() => {
              changeNumInputFieldsHandler(numInputFields - 1);
            }}
          >
            -
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default InputFields;
