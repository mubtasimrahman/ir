import axios, { CanceledError } from "axios";
import { useEffect } from "react";



interface Props<T extends { content: string },U>{
    filePath:string;
    jsonShape?:T;
    setFormData:React.Dispatch<React.SetStateAction<U>>;
}

function FetchJSON<T extends { content: string },U>({filePath,setFormData}:Props<T,U>){


  useEffect(()=>{const controller = new AbortController();
  async function fetchContent() {
    try {
      const response = await axios.get<T>(
        `https://api.github.com/repos/mubtasimrahman/ir/contents/${filePath}?ref=backend-cms-integration`,
        {
          headers: { Accept: "application/vnd.github.v3+json" },
          signal: controller.signal, // Pass the abort signal
        }
      );
      // console.log(response);
      const decodedContent = atob(response.data.content);
      // console.log(decodedContent);
      const parsedContent: unknown = JSON.parse(decodedContent);
      // console.log(parsedContent);

      setFormData(parsedContent as U);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  // Check to see if error is from controller.abort due to dismount in strict mode
  fetchContent().catch((error: unknown) => {
    if (error instanceof CanceledError) {
      return;
    }
    console.error("Unhandled fetchContent error:", error);
  });

  return () => {
    controller.abort();
  }; // Cleanup and cancel the request if needed)

},[filePath, setFormData])}

export default FetchJSON