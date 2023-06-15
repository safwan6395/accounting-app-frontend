import IncomeStatement from "../components/IncomeStatement";
import OwnerEquityStatement from "../components/OwnerEquityStatement";
import BalanceSheet from "../components/BalanceSheet";

const FinancialStatements = ({ accounts }) => {
  // FOR INCOME STATEMENT
  let revenueAccs = accounts.filter(
    (a) => a.account_type === "revenue-account" && a.balance !== 0
  );
  revenueAccs = revenueAccs.map((a) => ({
    accName: a.account_name,
    amount: a.balance,
  }));

  let expenseAccs = accounts.filter(
    (a) => a.account_type === "expense-account" && a.balance !== 0
  );
  expenseAccs = expenseAccs.map((a) => ({
    accName: a.account_name,
    amount: a.balance,
  }));

  const totalRevenue = revenueAccs.reduce((acc, r) => acc + r.amount, 0);
  const totalExpense = expenseAccs.reduce((acc, r) => acc + r.amount, 0);

  // FOR STATEMENT OF OWNER EQUITY
  let capitalAccs = accounts.filter(
    (a) => a.account_type === "equity-account" && a.balance !== 0
  );
  capitalAccs = capitalAccs.map((a) => a.balance);

  let drawingAccs = accounts.filter(
    (a) => a.account_type === "drawings-account" && a.balance !== 0
  );
  drawingAccs = drawingAccs.map((a) => a.balance);

  const capitalBalance = capitalAccs.reduce((a, b) => a + b, 0);
  const drawingsBalance = drawingAccs.reduce((a, b) => a + b, 0);

  // FOR BALANCE SHEET
  let assetAccs = accounts.filter(
    (a) => a.account_type === "asset-account" && a.balance !== 0
  );
  assetAccs = assetAccs.map((a) => ({
    accName: a.account_name,
    amount: a.balance,
  }));

  let contraAssetAccs = accounts.filter(
    (a) => a.account_type === "contra-asset-account" && a.balance !== 0
  );
  contraAssetAccs = contraAssetAccs.map((a) => ({
    accName: a.account_name,
    amount: a.balance,
    belongsTo: a.belongs_to,
  }));

  let liabilityAccs = accounts.filter(
    (a) => a.account_type === "liability-account" && a.balance !== 0
  );
  liabilityAccs = liabilityAccs.map((a) => ({
    accName: a.account_name,
    amount: a.balance,
  }));

  return (
    <section className='m-6 mx-auto w-full'>
      <IncomeStatement
        revenueAccs={revenueAccs}
        expenseAccs={expenseAccs}
        totalRevenue={totalRevenue}
        totalExpense={totalExpense}
      />
      <div className='border my-10 border-t-gray-500' />
      <OwnerEquityStatement
        capitalBalance={capitalBalance}
        drawingsBalance={drawingsBalance}
        netIncome={totalRevenue - totalExpense}
      />
      <div className='border mt-12 mb-10 border-t-gray-500' />
      <BalanceSheet
        assetAccs={assetAccs}
        contraAssetAccs={contraAssetAccs}
        liabilityAccs={liabilityAccs}
        capital={capitalBalance + totalRevenue - totalExpense - drawingsBalance}
      />
    </section>
  );
};

export default FinancialStatements;
