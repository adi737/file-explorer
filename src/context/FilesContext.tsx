import { FC, createContext, useState } from "react";
import mockedFilesData from "../mockedFilesData.json";

export interface IFileSystemItem {
  id: number;
  name: string;
  type: string;
  children?: IFileSystemItem[];
}

export interface IFilesContext {
  filesData: IFileSystemItem[];
  setFilesData: React.Dispatch<React.SetStateAction<IFileSystemItem[]>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType?: string;
  setModalType: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const FilesContext = createContext<IFilesContext | null>(null);

interface IFilesProvider {
  children: React.ReactNode;
}

export const FilesProvider: FC<IFilesProvider> = ({ children }) => {
  const [filesData, setFilesData] =
    useState<IFileSystemItem[]>(mockedFilesData);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>();

  return (
    <FilesContext.Provider
      value={{
        filesData,
        setFilesData,
        showModal,
        setShowModal,
        modalType,
        setModalType,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
