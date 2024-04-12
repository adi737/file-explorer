import { FC, createContext, useState } from "react";
import mockedFilesData from "../mockedFilesData.json";

export interface IFilesContext {
  filesData: typeof mockedFilesData;
  setFilesData: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        type: string;
      }[]
    >
  >;
}

export const FilesContext = createContext<IFilesContext | null>(null);

interface IFilesProvider {
  children: React.ReactNode;
}

export const FilesProvider: FC<IFilesProvider> = ({ children }) => {
  const [filesData, setFilesData] = useState(mockedFilesData);
  return (
    <FilesContext.Provider value={{ filesData, setFilesData }}>
      {children}
    </FilesContext.Provider>
  );
};
