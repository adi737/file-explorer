import { FC, useContext } from "react";
import {
  DocumentIcon,
  FolderIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "../Menu";
import { removeItem } from "../../actions/filesActions";
import { FilesContext } from "../../context/FilesContext";
import { useLocation } from "react-router-dom";

const menuData = [
  {
    id: 1,
    text: "Rename",
    type: "rename",
    icon: <PencilIcon className="w-6 h-6" />,
  },
  {
    id: 2,
    text: "Delete",
    type: "delete",
    icon: <TrashIcon className="w-6 h-6" />,
  },
];
interface IIconProps {
  id: number;
  name: string;
  type: string;
  onClick: (name: string, type: string) => void;
}

export const Icon: FC<IIconProps> = ({ id, name, type, onClick }) => {
  const {
    filesData,
    setFilesData,
    setModalType,
    setShowModal,
    setRenamedItem,
  } = useContext(FilesContext)!;
  const location = useLocation();

  const pathNameArr = location.pathname.split("/");

  return (
    <article
      className="w-full cursor-pointer group text-center border border-gray-300 rounded-lg p-2 relative"
      onClick={() => onClick(name, type)}
    >
      <div className="absolute top-1 right-1 z-10">
        <Menu
          {...{ menuData }}
          icon={
            <EllipsisVerticalIcon className="text-gray-500 w-6 h-6 group-hover/menu:scale-125 duration-300" />
          }
          onClick={(menuItemType?: string) => {
            if (menuItemType === "delete") {
              const newFilesData = removeItem(
                filesData,
                {
                  id,
                  name,
                  type,
                },
                pathNameArr
              );

              if (!newFilesData) return;

              return setFilesData(newFilesData);
            }

            setRenamedItem({ id, name, type });
            setModalType(menuItemType);
            setShowModal(true);
          }}
        />
      </div>
      {type === "folder" ? (
        <FolderIcon className="w-full text-blue-500 duration-300 group-hover:scale-110" />
      ) : (
        <DocumentIcon className="w-full text-blue-500 duration-300 group-hover:scale-110" />
      )}
      <p className="text-xs mt-1 truncate">{name}</p>
    </article>
  );
};
