import { FC } from "react";
import { FilesContext, IFilesContext } from "../context/FilesContext";
import { BrowserRouter } from "react-router-dom";

interface IProviderWrapper {
  children: React.ReactNode;
  value: IFilesContext;
}

export const ProviderWrapper: FC<IProviderWrapper> = ({ children, value }) => (
  <FilesContext.Provider value={value}>
    <BrowserRouter>{children}</BrowserRouter>
  </FilesContext.Provider>
);
