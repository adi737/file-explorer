import { FC } from "react";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";

interface IIconProps {
  name: string;
  type: string;
  onClick: (name: string, type: string) => void;
}

export const Icon: FC<IIconProps> = ({ name, type, onClick }) => {
  return (
    <article
      className="w-full cursor-pointer group text-center border border-gray-300 rounded-lg p-2"
      onClick={() => onClick(name, type)}
    >
      {type === "folder" ? (
        <FolderIcon className="w-full text-blue-500 duration-300 group-hover:scale-110" />
      ) : (
        <DocumentIcon className="text-blue-500 duration-300 group-hover:scale-110" />
      )}
      <p className="text-xs mt-1 truncate">{name}</p>
    </article>
  );
};
