import { EdgeStoreProvider } from "@/lib/edgestore";

export default function StudentLayout(props: any) {
  return (
    <EdgeStoreProvider>
      {props.children}
    </EdgeStoreProvider>
  ); 
}
