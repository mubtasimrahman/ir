import axios from "axios";

interface Props<U> {
  formData: U;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
}

async function TriggerUpdateWorkflow<U>({ formData, setStatus }: Props<U>) {
  const response = await axios.post<U>(
    "https://us-central1-mythic-attic-446309-k5.cloudfunctions.net/updateAllTrades/triggerAllTrades",
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
