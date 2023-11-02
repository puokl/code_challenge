import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <p className="text-lg mb-4">
          Are you sure you want to view the solution?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
