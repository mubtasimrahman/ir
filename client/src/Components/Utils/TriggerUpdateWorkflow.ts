import axios from "axios";

interface Props<U> {
  formData: U;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
  endPoint:string;
}

async function TriggerUpdateWorkflow<U>({ formData, setStatus,endPoint }: Props<U>) {
  const response = await axios.post<U>(
    endPoint,
    {
      content: formData,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    setStatus("Workflow triggered successfully.");
  } else {
    console.log("Failed to trigger workflow.");
    setStatus("Failed to trigger workflow.");
  }
}

export default TriggerUpdateWorkflow;
