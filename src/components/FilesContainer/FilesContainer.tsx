import { FC, useContext } from "react";
import { File, Folder } from "./icons";
import { FilesContext } from "../../context/FilesContext";

export const FilesContainer: FC = () => {
  const { filesData } = useContext(FilesContext)!;

  console.log(filesData);

  return filesData.length === 0 ? (
    <p className="text-center text-gray-500 p-4">No icons to display</p>
  ) : (
    <section className="p-4">
      <div className="container mx-auto grid gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {filesData.map((fileData) =>
          fileData.type === "folder" ? (
            <Folder key={fileData.id} name={fileData.name} />
          ) : (
            <File key={fileData.id} name={fileData.name} />
          )
        )}
      </div>
    </section>
  );
};
