"use client";

import { useParams } from 'next/navigation';

import TeacherDashboard from "./_dashboard/TeacherDashboard";
import AdminDashboard from "./_dashboard/AdminDashboard";
import ParentDashboard from "./_dashboard/ParentDashboard";

export default function Dashboard(props: any) {

  const userType = useParams().userType;

  return (
    <>
      {userType === "teacher" && <TeacherDashboard />}
      {userType === "admin" && <AdminDashboard />}
      {userType === "parent" && <ParentDashboard />}
    </>
  );
}
