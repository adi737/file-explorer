import { render, screen } from "@testing-library/react";
import { FilesContainer } from "./FilesContainer";
import { FilesContext } from "../../context/FilesContext";

const testData = [
  {
    id: 1,
    name: "super-png.png",
    type: "image/png",
  },
  {
    id: 2,
    name: "folder1",
    type: "folder",
  },
  {
    id: 3,
    name: "folder2",
    type: "folder",
  },
];

describe("FilesContainer", () => {
  test("Icons display correctly", () => {
    render(
      <FilesContext.Provider
        value={{ filesData: testData, setFilesData: () => 1 }}
      >
        <FilesContainer />
      </FilesContext.Provider>
    );

    testData.forEach((item) => {
      const element = screen.getByText(item.name);

      expect(element).toBeDefined();
    });
  });

  test('Get all elements with "folder" in their text', () => {
    render(
      <FilesContext.Provider
        value={{ filesData: testData, setFilesData: () => 1 }}
      >
        <FilesContainer />
      </FilesContext.Provider>
    );

    const folderElements = screen.getAllByText(/folder/i);

    expect(folderElements).toHaveLength(2);
  });
});
