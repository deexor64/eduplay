import { EdgeStoreProvider } from "@/lib/edgestore";

export default function ProfileLayout(props: any) {
  return (
    <EdgeStoreProvider>
      {props.children}
    </EdgeStoreProvider>
  ); 
}
