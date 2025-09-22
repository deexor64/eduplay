"use client";

import Link from "next/link";
import InfoBadge from "@/components/shared/badges/InfoBadge";
import ViewItemActionButton from "@/components/shared/buttons/ViewItemActionButton";
import { TeacherRole, UserStatus, UserType } from "@prisma/client";
import MiniProfile from "./MiniProfile";
import { useState } from "react";

interface ViewUserItemProps {
  itemData: {
    indexNumber: string,
    role?: TeacherRole
    grade?: 1 | 2 | 3 | 4 | 5,
    user: {
      userID: string,
      firstName: string,
      lastName: string,
      email: string,
      verified: boolean,
      status: UserStatus,
      displayPicUrl: string,
    }
  },
  userType: UserType,
  handleUpdateUserStatus: Function,
  handleUpdateUserInfo: Function,
}

export default function ViewUserItem(props: ViewUserItemProps) {

  const {itemData, userType, handleUpdateUserStatus, handleUpdateUserInfo} = props;
   const [showProfile, setShowProfile] = useState(false);
   
  const minUser = {
    userID: itemData.user.userID,
    name: `${itemData.user.firstName} ${itemData.user.lastName}`,
    email: itemData.user.email,
    indexNumber: itemData.indexNumber,
    role: itemData.role,
    grade: itemData.grade,
  }

  return (
    <div className="border border-blue-200 bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition 
    hover:bg-blue-50 justify-between relative mb-0.5 mt-2 min-h-[96px]">

      {/* Display picture */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={itemData.user.displayPicUrl}
          alt={itemData.user.firstName + ' ' + itemData.user.lastName}
          className="w-15 h-15 rounded-full object-cover border border-gray-200"
        />
      </div>

      {/* Item info */}
        <div className="min-w-0 mr-auto">

          {/* Name */}
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-pink-700 truncate focus:outline-none no-underline"
              style={{ textDecoration: 'none' }}>
              {`${itemData.user.firstName} ${itemData.user.lastName} | ${itemData.user.email}`}
            </p>
            {itemData.indexNumber && (
              <InfoBadge text={itemData.indexNumber} colorTheme="default" />
            )}
          </div>

          {/* Badge and description */}
          <div className="flex items-center gap-2 mt-1 text-xs">
            {itemData.role && (
              <InfoBadge text={itemData.role} colorTheme="purple" />
            )}
            {itemData.grade && (
              <InfoBadge text={`Grade ${itemData.grade}`} colorTheme="indigo" />
            )}
            {itemData.user.status && (
              <InfoBadge text={itemData.user.status} colorTheme="gray" />
            )}
            <InfoBadge text={itemData.user.verified ? "VERIFIED" : "UNVERIFIED"} colorTheme="yellow" />
          </div>
        </div>
     
      {/* Action buttons */}
      <div className="flex flex-row items-end gap-2  ml-4">
        
        <ViewItemActionButton text="Edit" colorTheme="gray"
          onAction={() => setShowProfile(true)} />
          
        {itemData.user.status === "ACTIVE" && (
          <>
            <ViewItemActionButton text="Suspend" colorTheme="yellow"
              onAction={() => handleUpdateUserStatus(itemData.user.userID, "SUSPENDED")} />
            <ViewItemActionButton text="Delete" colorTheme="red"
              onAction={() => handleUpdateUserStatus(itemData.user.userID, "DELETED")} />
          </>
        )}
        {itemData.user.status === "SUSPENDED" && (
          <>
            <ViewItemActionButton text="Activate" colorTheme="green"
              onAction={() => handleUpdateUserStatus(itemData.user.userID, "ACTIVE")} />
            <ViewItemActionButton text="Delete" colorTheme="red"
              onAction={() => handleUpdateUserStatus(itemData.user.userID, "DELETED")} />
          </>
        )}
        {itemData.user.status === "DELETED" && (
          <>
            <ViewItemActionButton text="Activate" colorTheme="green"
              onAction={() => handleUpdateUserStatus(itemData.user.userID, "ACTIVE")} />
          </>
        )}
      </div>
      
      <MiniProfile showPreview={showProfile} setShowProfile={setShowProfile}
        userType={userType} user={minUser} handleUpdateUserInfo={handleUpdateUserInfo } />

    </div>
  );
}
