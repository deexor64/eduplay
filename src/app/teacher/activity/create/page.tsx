"use client";

import React, { useState } from "react";
import Tab, { TabButton, TabButtons } from "@/components/view-data/Tab";
import Title from "@/components/view-data/Title";
import Filters, { InputFilter, OptionFilter } from "@/components/view-data/filter/Filters";
import { generateUniqueID } from "@/utils/generateRandomID";
import ItemList from "@/components/view-data/item-list/ItemList";
import { CreateLessonItem } from "./_ui/CreateLessonItem";

export default function CreateLesson() {
  
  const dbData = {
    default: [
      { TemplateID: "1", name: "Match the Animals", type: "Drag and Drop", 
        coverIcon: "/icons/animal-match.png", previewImage: "/previews/animal-match-preview.png",
      },
      { templateID: "2", name: "Solve the Puzzle", type: "Puzzle",
        coverIcon: "/icons/puzzle.png", previewImage: "/previews/puzzle-preview.png",
      },
      { templateID: "3", name: "Fill in the Blanks", type: "Fill Blanks",
        coverIcon: "/icons/fill-blanks.png", previewImage: "/previews/fill-blanks-preview.png",
      },
      { templateID: "4", name: "Match the Colors", type: "Drag and Drop",
        coverIcon: "/icons/color-match.png", previewImage: "/previews/color-match-preview.png",
      },
      { templateID: "5", name: "Match the Colors 2 ", type: "Drag and Drop",
        coverIcon: "/icons/color-match.png", previewImage: "/previews/color-match-preview-2.png",
      },
      { templateID: "6", name: "Match the Colors 3", type: "Drag and Drop",
        coverIcon: "/icons/color-match.png", previewImage: "/previews/color-match-preview-3.png",
      }
    ]
  };
  
  var [filteredData, setFilteredData] = useState(dbData);
 
  var [selectedTab, setSelectedTab] = useState<string>("default");
  
  return (
    <>
      
      {/* Title */}
      <Title title="Create lessons"/>

      {/* Tabs Menu */}
      <TabButtons>
        <TabButton tabName="default" selected={selectedTab} setSelected={setSelectedTab} >
          Admins</TabButton>
      </TabButtons>
      
      {/* Filters */}
      <Filters filterTab="default" selected={selectedTab}>
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
      </Filters>
      
      
      {/* Info */}
      <Tab>
        <ItemList>
          {
            // @ts-ignore
            filteredData[selectedTab].map(function (item) {
              return <CreateLessonItem itemData={item} key={ generateUniqueID()}/>;
            })
          } 
        </ItemList>
      </Tab>

    </>   
  );
}
