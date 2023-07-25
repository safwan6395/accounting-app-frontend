const useData = (accounts) => {
  let revenueTotal = 0;
  let expenseTotal = 0;
  let drawingsTotal = 0;

  let filterRevAccs = accounts.filter(
    (a) => a.account_type === "revenue-account"
  );
  filterRevAccs = filterRevAccs.map((a) => {
    revenueTotal += a.balance;
    return {
      _id: a._id,
      amount: a.balance,
      debitAccount: a.account_name,
    };
  });

  let filterExpAccs = accounts.filter(
    (a) => a.account_type === "expense-account"
  );
  filterExpAccs = filterExpAccs.map((a) => {
    expenseTotal += a.balance;
    return {
      _id: a._id,
      amount: a.balance,
      creditAccount: a.account_name,
    };
  });

  accounts
    .filter((a) => a.account_type === "drawings-account")
    .forEach((a) => {
      drawingsTotal += a.balance;
    });

  const cId = accounts.filter((a) => a.account_type === "equity-account")[0]
    ?._id;
  const dId = accounts.filter((a) => a.account_type === "drawings-account")[0]
    ?._id;

  return {
    revenueTotal,
    filterRevAccs,
    expenseTotal,
    filterExpAccs,
    drawingsTotal,
    cId,
    dId,
  };
};

export default useData;
