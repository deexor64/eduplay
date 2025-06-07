"use client";

import { useParams } from 'next/navigation';

import TeacherDashboard from "./(dashboard)/TeacherDashboard";
import AdminDashboard from "./(dashboard)/AdminDashboard";
import ParentDashboard from "./(dashboard)/ParentDashboard";

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
