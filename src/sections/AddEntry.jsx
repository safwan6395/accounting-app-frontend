import AddEntryForm from "../components/AddEntryForm";

// Exist for Historical Reasons
const AddEntry = ({addEntryHandler, accounts}) => {
  const takeEntryHandler = (entry) => {
    addEntryHandler(entry)
  }

  return (
    <section className='mx-auto'>  
      <AddEntryForm accounts={accounts} takeEntryHandler={takeEntryHandler} />
    </section>
  );
};
export default AddEntry;
