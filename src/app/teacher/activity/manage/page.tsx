"use client";

import React, { useState } from "react";
import Title from "@/components/Title";
import TabButtonWrapper from "@/components/tab/TabButtonWrapper";
import TabButton from "@/components/tab/TabButton";
import TabWrapper  from "@/components/tab/TabWrapper";
import FilterWrapper from "@/components/filter/FilterWrapper";
import InputFilter from "@/components/filter/InputFilter";
import OptionFilter from "@/components/filter/OptionFilter";
import ItemListWrapper from "@/components/item-list/ItemListWrapper";
import { CreateLessonItem } from "@/components/item-list/ViewLessonItem";
import { generateUniqueID } from "@/utils/generateRandomID";


export default function ViewLesson() {
  
  const dbData = {
    default: [
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
 
  var [selectedTab, setSelectedTab] = useState<string>("default");
  
  return (
    <>
      
      {/* Title */}
      <Title title="Manage lessons"/>

      {/* Tabs Menu */}
      <TabButtonWrapper>
        <TabButton tabName="default" selected={selectedTab} setSelected={setSelectedTab} >
          Admins</TabButton>
      </TabButtonWrapper>
      
      {/* Filters */}
      <FilterWrapper filterTab="default" selected={selectedTab}>
        <OptionFilter
          filterTab="default"
          values={{ type: ["All", "Drag and Drop", "Fill Blanks", "Puzzle"] }}
          dbData={dbData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <InputFilter
          filterTab="default"
          filterKey="name"
          dbData={dbData}
          filteredData={filteredData}
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
