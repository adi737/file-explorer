import { render, screen } from "@testing-library/react";
import { FilesContainer } from "./FilesContainer";
import { ProviderWrapper } from "../../tests/ProviderWrapper";

const testData = [
  {
    id: 1,
    name: "super-icon.png",
    type: "image/png",
  },
  {
    id: 2,
    name: "folder1",
    type: "folder",
    children: [
      {
        id: 1,
        name: "super-icon.png",
        type: "image/png",
      },
      {
        id: 3,
        name: "folder2",
        type: "folder",
        children: [
          {
            id: 1,
            name: "super-icon.png",
            type: "image/png",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "folder2",
    type: "folder",
    children: [],
  },
];

describe("FilesContainer", () => {
  test("Icons display correctly", () => {
    render(
      <ProviderWrapper
        value={{
          filesData: testData,
        }}
      >
        <FilesContainer />
      </ProviderWrapper>
    );

    testData.forEach((item) => {
      const element = screen.getByText(item.name);

      expect(element).toBeDefined();
    });
  });

  test('Proper number of items with "folder" text', () => {
    render(
      <ProviderWrapper
        value={{
          filesData: testData,
        }}
      >
        <FilesContainer />
      </ProviderWrapper>
    );

    const folderElements = screen.getAllByText(/folder/i);

    expect(folderElements).toHaveLength(2);
  });

  test('Proper number of items with "folder" text on specific path', () => {
    render(
      <ProviderWrapper
        value={{
          filesData: testData,
        }}
        path={["/folders/folder1"]}
      >
        <FilesContainer />
      </ProviderWrapper>
    );

    const folderElements = screen.getAllByText(/folder/i);

    expect(folderElements).toHaveLength(1);
  });
});
