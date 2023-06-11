import AddEntryForm from "../components/AddEntryForm";

// Exist for Historical Reasons
const AddEntry = ({ addEntryHandler, addTransactionHandler, accounts }) => {
  return (
    <section className='mx-auto'>
      <AddEntryForm
        accounts={accounts}
        addTransactionHandler={addTransactionHandler}
        addEntryHandler={addEntryHandler}
      />
    </section>
  );
};
export default AddEntry;
