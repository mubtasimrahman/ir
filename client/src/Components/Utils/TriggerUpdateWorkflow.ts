import axios from "axios";

interface Props<U> {
  formData: U;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
  endPoint: string;
  contentType?: "application/json" | "multipart/form-data"; // Optional property to specify content type
}

async function TriggerUpdateWorkflow<U>({ formData, setStatus, endPoint, contentType = "application/json" }: Props<U>) {
  try {
    const headers =
      contentType === "multipart/form-data"
        ? {} // Let Axios handle Content-Type for multipart/form-data
        : { "Content-Type": "application/json" };

    const data =
      contentType === "multipart/form-data"
        ? formData // Directly send FormData for multipart/form-data
        : { content: formData }; // Wrap in content for application/json

    const response = await axios.post<U>(endPoint, data, { headers });

    if (response.status === 200) {
      setStatus("Workflow triggered successfully.");
    } else {
      console.log("Failed to trigger workflow.");
      setStatus("Failed to trigger workflow.");
    }
  } catch (error) {
    console.error("Error triggering workflow:", error);
    setStatus("Failed to trigger workflow. Check console for details.");
  }
}

export default TriggerUpdateWorkflow;
