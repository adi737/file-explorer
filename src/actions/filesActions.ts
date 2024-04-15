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

export const findPreviousFolderItems: FnReturn = (
  items,
  index,
  pathNameArr
) => {
  if (!items) return null;
  if (index > pathNameArr.length - 2) return items;

  const itemsFound = items?.find(
    (file) => file.name === pathNameArr[index]
  )?.children;

  return findPreviousFolderItems(itemsFound, index + 1, pathNameArr);
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

  if (pathNameArr.length < 3 && folderItems.length === 0) {
    return [newItem];
  }

  if (folderItems.length === 0) {
    const previousFolderItems = findPreviousFolderItems(
      filesData,
      2,
      pathNameArr
    ) as IFileSystemItem[] | null;

    const newItems = previousFolderItems?.map((item) =>
      item.name === pathNameArr[pathNameArr.length - 1]
        ? { ...item, children: [newItem] }
        : item
    );

    const filesDataString = JSON.stringify(filesData);
    const previousFolderItemsString = JSON.stringify(previousFolderItems);
    const newItemsString = JSON.stringify(newItems);

    const modifiedDataStr = filesDataString.replace(
      previousFolderItemsString,
      newItemsString
    );

    const modifiedData = JSON.parse(modifiedDataStr) as IFileSystemItem[];

    return modifiedData;
  }

  const doesItemExist = folderItems.some(
    (item: IFileSystemItem) => item.name === newItem.name
  );

  if (doesItemExist) return alert("Item with this name alredy exist");

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
  itemToRemove: IFileSystemItem,
  pathNameArr: string[]
) => {
  const folderItems = findFolderItems(filesData, 2, pathNameArr) as
    | IFileSystemItem[]
    | null;

  if (!folderItems) return;

  const removedItem = folderItems.find((item) => item.id === itemToRemove.id);
  const removedItemIndex = folderItems.findIndex(
    (item) => item.id === itemToRemove.id
  );

  const filesDataString = JSON.stringify(filesData);
  const removedItemString = JSON.stringify(removedItem);
  const modifiedDataStr = filesDataString.replace(
    folderItems.length === 1
      ? removedItemString
      : folderItems.length - 1 === removedItemIndex
      ? "," + removedItemString
      : removedItemString + ",",
    ""
  );

  const modifiedData = JSON.parse(modifiedDataStr) as IFileSystemItem[];

  return modifiedData;
};

export const renameItem = (
  filesData: IFileSystemItem[],
  itemToRename: IFileSystemItem | undefined,
  pathNameArr: string[],
  newName: string
) => {
  const folderItems = findFolderItems(filesData, 2, pathNameArr) as
    | IFileSystemItem[]
    | null;

  if (!folderItems || !itemToRename) return;

  const newFolderName = newName.replace(/ /g, "-");

  const renameItem = folderItems.find((item) => item.id === itemToRename.id);
  const renamedItem = { ...renameItem, name: newFolderName };

  const doesItemExist = folderItems.some(
    (item: IFileSystemItem) => item.name === renamedItem.name
  );
  if (doesItemExist) return alert("Item with this name alredy exist");

  const filesDataString = JSON.stringify(filesData);
  const renameIemString = JSON.stringify(renameItem);
  const renamedItemString = JSON.stringify(renamedItem);
  const modifiedDataStr = filesDataString.replace(
    renameIemString,
    renamedItemString
  );
  const modifiedData = JSON.parse(modifiedDataStr) as IFileSystemItem[];

  return modifiedData;
};
