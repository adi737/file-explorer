import { FC } from "react";
import { FilesContext, IFilesContext } from "../context/FilesContext";
import { MemoryRouter } from "react-router-dom";

type MakeOptional<T> = Partial<T>;
type OptionalIFilesContext = MakeOptional<IFilesContext>;

interface IProviderWrapper {
  children: React.ReactNode;
  value?: OptionalIFilesContext;
  path?: string[];
}

export const ProviderWrapper: FC<IProviderWrapper> = ({
  children,
  value,
  path,
}) => (
  <FilesContext.Provider value={value as IFilesContext}>
    <MemoryRouter initialEntries={path ?? ["/"]}>{children}</MemoryRouter>
  </FilesContext.Provider>
);
