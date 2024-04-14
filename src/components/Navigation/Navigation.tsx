import {
  FolderPlusIcon,
  DocumentPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "../Menu";
import { useContext } from "react";
import { FilesContext } from "../../context/FilesContext";

const menuData = [
  {
    id: 1,
    text: "Create folder",
    type: "folder",
    icon: <FolderPlusIcon className="w-6 h-6" />,
  },
  {
    id: 2,
    text: "Upload file",
    type: "file",
    icon: <DocumentPlusIcon className="w-6 h-6" />,
  },
];

export const Navigation = () => {
  const { setShowModal, setModalType } = useContext(FilesContext)!;
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">File Explorer</h1>
        <Menu
          {...{ menuData }}
          icon={
            <PlusIcon className="text-white w-6 h-6 group-hover/menu:scale-125 duration-300" />
          }
          onClick={(type?: string) => {
            setShowModal(true);
            if (type) setModalType(type);
          }}
        />
      </div>
    </nav>
  );
};
