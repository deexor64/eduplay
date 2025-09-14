import { AuthProvider } from "@/contexts/AuthProvider";

export default function Layout(props: any) {
  
  return (
    <AuthProvider userType={[]} role={[]} status={[]}>
      {props.children}
    </AuthProvider>
  )
    
}
