import { FC } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";

interface IFolderProps {
  name: string;
}

export const Folder: FC<IFolderProps> = ({ name }) => {
  return (
    <div className="w-full cursor-pointer group text-center border border-gray-300 rounded-lg p-2">
      <FolderIcon className="w-full text-blue-500 duration-300 group-hover:scale-110" />
      <p className="text-xs mt-1 truncate">{name}</p>
    </div>
  );
};
