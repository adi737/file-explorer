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
}

export const FilesContext = createContext<IFilesContext | null>(null);

interface IFilesProvider {
  children: React.ReactNode;
}

export const FilesProvider: FC<IFilesProvider> = ({ children }) => {
  const [filesData, setFilesData] =
    useState<IFileSystemItem[]>(mockedFilesData);
  return (
    <FilesContext.Provider value={{ filesData, setFilesData }}>
      {children}
    </FilesContext.Provider>
  );
};
