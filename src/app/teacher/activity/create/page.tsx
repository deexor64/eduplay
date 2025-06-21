"use client";

import React, { useState } from "react";
import Title from "@/components/Title";
import TabButtonWrapper from "@/components/tab/TabButtonWrapper";
import TabButton from "@/components/tab/TabButton";
import TabWrapper  from "@/components/tab/TabWrapper";
import FilterWrapper from "@/components/client-filter/FilterWrapper";
import InputFilter from "@/components/client-filter/InputFilter";
import OptionFilter from "@/components/client-filter/OptionFilter";
import ItemListWrapper from "@/components/item-list/ItemListWrapper";
import { CreateLessonItem } from "@/components/item-list/CreateLessonItem";
import { generateUniqueID } from "@/lib/utils/generateRandomString";


export default function CreateLesson() {
  
  const dbData = {
    DEFAULT: [
      { TemplateID: "0", name: "Sort Items", type: "Drag and Drop", templateUrl: "/templates/1-SortItems-tmpl/create",
        coverIcon: "/icons/animal-match.png", previewImage: "/previews/animal-match-preview.png",
      },
      { TemplateID: "1", name: "Match the Animals", type: "Drag and Drop", templateUrl: "/templates/1-SortItems-tmpl/create",
        coverIcon: "/icons/animal-match.png", previewImage: "/previews/animal-match-preview.png",
      },
      { templateID: "2", name: "Solve the Puzzle", type: "Puzzle", templateUrl: "/templates/1-SortItems-tmpl/create",
        coverIcon: "/icons/puzzle.png", previewImage: "/previews/puzzle-preview.png",
      },
      { templateID: "3", name: "Fill in the Blanks", type: "Fill Blanks", templateUrl: "/templates/1-SortItems-tmpl/create",
        coverIcon: "/icons/fill-blanks.png", previewImage: "/previews/fill-blanks-preview.png",
      },
      { templateID: "4", name: "Match the Colors", type: "Drag and Drop", templateUrl: "/templates/1-SortItems-tmpl/create",
        coverIcon: "/icons/color-match.png", previewImage: "/previews/color-match-preview.png",
      },
      { templateID: "5", name: "Match the Colors 2 ", type: "Drag and Drop", templateUrl: "/templates/1-SortItems-tmpl/create",
        coverIcon: "/icons/color-match.png", previewImage: "/previews/color-match-preview-2.png",
      },
      { templateID: "6", name: "Match the Colors 3", type: "Drag and Drop", templateUrl: "/templates/1-SortItems-tmpl/create",
        coverIcon: "/icons/color-match.png", previewImage: "/previews/color-match-preview-3.png",
      }
    ]
  };
  
  var [filteredData, setFilteredData] = useState(dbData);
 
  var [selectedTab, setSelectedTab] = useState<string>("DEFAULT");
  
  return (
    <>
      
      {/* Title */}
      <Title title="Create lessons"/>

      {/* Tabs Menu */}
      <TabButtonWrapper>
        <TabButton tabName="DEFAULT" selected={selectedTab} setSelected={setSelectedTab} >
          Admins</TabButton>
      </TabButtonWrapper>
      
      {/* Filters */}
      <FilterWrapper filterTab="DEFAULT" selected={selectedTab}>
        <OptionFilter
          filterTab="DEFAULT"
          values={{ type: ["All", "Drag and Drop", "Fill Blanks", "Puzzle"] }}
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
        <InputFilter
          filterTab="DEFAULT"
          filterKey="name"
          originalData={dbData}
          setFilteredData={setFilteredData}
        />
      </FilterWrapper>
      
      
      {/* Info */}
      <TabWrapper>
        <ItemListWrapper>
          {
            // @ts-ignore
            filteredData[selectedTab].map(function (item) {
              return <CreateLessonItem itemData={item} key={ generateUniqueID()}/>;
            })
          } 
        </ItemListWrapper>
      </TabWrapper>

    </>   
  );
}
