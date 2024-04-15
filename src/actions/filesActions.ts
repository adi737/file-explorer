import { IFileSystemItem } from "../context/FilesContext";

type FnReturn = (
  items: IFileSystemItem[] | undefined,
  index: number,
  pathNameArr: string[]
) => FnReturn | null | IFileSystemItem[];

export const findFolderItems: FnReturn = (items, index, pathNameArr) => {
  if (!items) return null;
  if (index > pathNameArr.length - 1) return items;

  const itemsFound = items?.find(
    (file) => file.name === pathNameArr[index]
  )?.children;

  return findFolderItems(itemsFound, index + 1, pathNameArr);
};

export const addItemToFolder = (
  filesData: IFileSystemItem[],
  newItem: IFileSystemItem,
  pathNameArr: string[]
) => {
  const folderItems = findFolderItems(filesData, 2, pathNameArr) as
    | IFileSystemItem[]
    | null;

  if (!folderItems) return null;
  if (folderItems.length === 0)
    return alert("No possibility of adding item to empty folder yet");

  const doesItemExist = folderItems.some(
    (item: IFileSystemItem) => item.name === newItem.name
  );

  if (doesItemExist) return "Item alredy exist";

  const filesDataString = JSON.stringify(filesData);
  const folderItemsString = JSON.stringify(folderItems);
  const indexOfFolderItems = filesDataString.indexOf(folderItemsString);
  const modifiedDataStr =
    filesDataString.substring(0, indexOfFolderItems + 1) +
    JSON.stringify(newItem) +
    "," +
    filesDataString.substring(indexOfFolderItems + 1);
  const modifiedData = JSON.parse(modifiedDataStr) as IFileSystemItem[];

  return modifiedData;
};

export const removeItem = (
  filesData: IFileSystemItem[],
  itemToRemove: IFileSystemItem
) => {
  const filesDataString = JSON.stringify(filesData);
  const itemToRemoveString = JSON.stringify(itemToRemove);
  const modifiedDataStr = filesDataString.replace(itemToRemoveString + ",", "");
  const modifiedData = JSON.parse(modifiedDataStr) as IFileSystemItem[];

  return modifiedData;
};
