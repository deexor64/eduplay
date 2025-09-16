"use client";

import Title from "@/components/shared/headings/Title";
import FilterWrapper from "@/components/shared/filter/FilterWrapper";
import InputFilter from "@/components/shared/filter/InputFilter";
import OptionFilter from "@/components/shared/filter/OptionFilter";
import Paginator from "@/components/shared/pagination/Paginator";
import ViewUserItem from "@/components/users/ViewUserItem";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import cleanParams from "@/lib/utils/cleanParams";
import NavigatorLayout from "@/components/navigator/NavigatorLayout";
import { TeacherRole, UserStatus } from "@prisma/client";
import toast from "react-hot-toast";
import { updateUserStatus } from "@/actions/user/updateUserStatus";
import { AuthContext } from "@/contexts/AuthProvider";

export default function Users() {
  
  const { userID, email, userType, role, status, user } = useContext(AuthContext);
  
  const searchParams = useSearchParams();
  const userListType = searchParams.get("userListType");
 
  const [dbData, setDbData] = useState<{
    users: Array<{
      indexNumber?: string,
      grade?: number,
      role?: string,
      subject?: string,
      user: {
        userID: string,
        firstName: string,
        lastName: string,
        email: string,
        verified: boolean,
        displayPicUrl: string,
        status: UserStatus
      }
    }>,
    total: number;
  }>({ users: [], total: 0 });

  const [filter, setFilter] = useState({
    indexNumber: undefined,
    fullName: undefined,
    grade: undefined,
    role: undefined,
    email: undefined,
    verified: undefined,
    status: undefined
  });
  
  const [pagination, setPagination] = useState({
    page: 1, 
    limit: 10
  });
  
  const [triggerFilter, setTriggerFilter] = useState(false);
  
  function usersQuery(): URLSearchParams {

    // params
    const params = cleanParams({
      userListType: userListType,
      ...filter,
      ...pagination,
    });

    return new URLSearchParams(params);
    
  }

  async function fetchUsers () {

    // fetch
    const params = usersQuery();
    const url = `/api/users?${params}`;
    const token = await user?.getIdToken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    
    const resData = await res.json();
    setDbData(resData.data);
  
  }
  
  useEffect(() => {
    setTriggerFilter(false);
    fetchUsers();
  }, [pagination, triggerFilter, userListType]);

  async function handleUpdateUserStatus(userID: string, status: UserStatus) {
    
    const token = await user?.getIdToken();

    toast.promise(updateUserStatus(userID, status, token!), {
      loading: "Updating user...",
      success: () => {
        fetchUsers();
        return "User updated successfully";
      },
      error: "Failed to update user",
    })

  }
  
  return (
    <NavigatorLayout>
      
      {/* Title */}
      {(userListType === "teacher") && <Title title="Teachers" addUser="teacher"/>}
      {(userListType === "student") && <Title title="Students" addUser="student"/>}

      {/* Filters */}
      <FilterWrapper>
        <InputFilter
          filterKey="fullName"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Full Name</InputFilter>
        <InputFilter
          filterKey="indexNumber"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Index NUmber</InputFilter>
        <InputFilter
          filterKey="email"
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Email</InputFilter>
        {
          userListType === "student" && 
          <>
            <OptionFilter
            filterKey="grade"
            values={["1", "2", "3", "4", "5"]}
            setFilter={setFilter}
            setTriggerFilter={setTriggerFilter}
          >Grade</OptionFilter>
        </>
        }
        {
          userListType === "teacher" && 
          <OptionFilter
            filterKey="role"
            values={Object.values(TeacherRole)}
            setFilter={setFilter}
            setTriggerFilter={setTriggerFilter}
          >Role</OptionFilter>
        }
        <OptionFilter
          filterKey="verified"
          values={["VERIFIED", "UNVERIFIED"]}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Verified</OptionFilter>
        <OptionFilter
          filterKey="status"
          values={Object.values(UserStatus)}
          setFilter={setFilter}
          setTriggerFilter={setTriggerFilter}
        >Status</OptionFilter>
      </FilterWrapper>
      
      {/* Info */}
      <div className="w-full min-h-[calc(100vh-380px)] table-auto text-left">
        {dbData.users.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Nothing to display</div>
        ) : (
          dbData.users.map(function (item) {
            return <ViewUserItem itemData={item} handleUpdateUserStatus={handleUpdateUserStatus} 
            key={item.user.userID}/>;
          })
        )}
      </div>
  
      {/* paginator */}
      <Paginator totalItems={dbData.total} pagination={pagination} setPagination={setPagination}/>

    </NavigatorLayout>
    
  );

}
