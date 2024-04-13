import { FC } from "react";
import { FilesContext, IFilesContext } from "../context/FilesContext";
import { MemoryRouter } from "react-router-dom";

interface IProviderWrapper {
  children: React.ReactNode;
  value: IFilesContext;
  path?: string[];
}

export const ProviderWrapper: FC<IProviderWrapper> = ({
  children,
  value,
  path,
}) => (
  <FilesContext.Provider value={value}>
    <MemoryRouter initialEntries={path ?? ["/"]}>{children}</MemoryRouter>
  </FilesContext.Provider>
);
