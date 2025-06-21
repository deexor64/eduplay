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
import { CreateLessonItem } from "@/components/item-list/ViewLessonItem";
import { generateUniqueID } from "@/lib/utils/generateRandomString";


export default function ViewLesson() {
  
  const dbData = {
    DEFAULT: [
      { activityID: "a1", name: "Animal Match - Grade 1", type: "Drag and Drop",
        grade: "1", subject: "Science", date: "2025-04-22",  templateUrl: "/templates/1-SortItems-tmpl/view",
        coverIcon: "/icons/animal-match.png", previewImage: "/previews/animal-match-preview.png",
      },
      {
        activityID: "a2", name: "Basic Puzzle", type: "Puzzle", grade: "2", 
        subject: "Math", date: "2025-04-24", templateUrl: "/templates/1-SortItems-tmpl/view",
        coverIcon: "/icons/puzzle.png", previewImage: "/previews/puzzle-preview.png",
      },
      {
        activityID: "a3", name: "Fill Blanks - Alphabet", type: "Fill Blanks", grade: "1",
        subject: "English", date: "2025-04-30", templateUrl: "/templates/1-SortItems-tmpl/view",
        coverIcon: "/icons/fill-blanks.png", previewImage: "/previews/fill-blanks-preview.png",
      },
    ]
  };
  
  var [filteredData, setFilteredData] = useState(dbData);
 
  var [selectedTab, setSelectedTab] = useState<string>("DEFAULT");
  
  return (
    <>
      
      {/* Title */}
      <Title title="Manage lessons"/>

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
