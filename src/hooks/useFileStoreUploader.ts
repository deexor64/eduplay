import { RefObject } from 'react';
import { useEdgeStore } from '@/lib/edgestore';

/*
  const { uploadFiles } = useFileStoreUploader();
  const urlMap = await uploadFiles(files, onProgress, abortSave);
*/

// custom fileserver hook
export default function useFileStoreUploader() {
  
  // edge store hook
  const { edgestore } = useEdgeStore();
  
  // using edge store as file server
  async function fileStoreUplaoder(files: Map<string, File>, abortSave?: RefObject<boolean>,
    onProgress?: (progress: number) => void): Promise<Map<string, string>> {
      
    const fileUrlMap = new Map<string, string>();
    const abortController = new AbortController();
    
    // upload every file in the map
    // then create a new map containing the actual urls
    for (const [hash, file] of files.entries()) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          if (abortSave && abortSave.current) abortController.abort(); // abort if saving is aborted
          onProgress && onProgress(progress); // upload progress
        },
        signal: abortController.signal,
      });
      fileUrlMap.set(hash, res.url); // update url
    }

    return fileUrlMap;
    
  }

  return fileStoreUplaoder;
  
}
