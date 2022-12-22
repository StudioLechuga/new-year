import React, { createContext, ReactNode, useContext } from "react";
interface ModalContext {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
}
const inititalState = ():ModalContext => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return {
    isModalOpen,
    closeModal,
    openModal,
  };
};

const ModalContext = React.createContext<ModalContext>({} as ModalContext);

const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: any) => {
  const state = inititalState();
  return (
    <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
