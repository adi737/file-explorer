import { FC } from "react";
import {
  DocumentIcon,
  FolderIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "../Menu";

const menuData = [
  {
    id: 1,
    text: "Rename",
    icon: <PencilIcon className="w-6 h-6" />,
  },
  {
    id: 2,
    text: "Delete",
    icon: <TrashIcon className="w-6 h-6" />,
  },
];
interface IIconProps {
  name: string;
  type: string;
  onClick: (name: string, type: string) => void;
}

export const Icon: FC<IIconProps> = ({ name, type, onClick }) => {
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
