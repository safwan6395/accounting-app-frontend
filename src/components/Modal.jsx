const Modal = ({ hideModal, reason, children }) => {
  return (
    <div
      className='fixed inset-0 w-full min-h-screen bg-gray-500 bg-opacity-20'
      onClick={hideModal}
    >
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 shadow-lg bg-white'
        onClick={(e) => e.stopPropagation()}
      >
        {reason}
        {children}
      </div>
    </div>
  );
};
export default Modal;
