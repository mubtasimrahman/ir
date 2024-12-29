import React, { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";
const REPO_OWNER = "mubtasimrahman";
const REPO_NAME = "ir";
const FILE_PATH = "server/content/allTrades.json";

interface FileMetadata {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}
interface FormData {
  intro: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

const AdminApp = () => {
  const [formData, setFormData] = useState<FormData>({
    intro: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchContent() {
      try {
        // Explicitly typing the Axios GET request response
        const response = await axios.get<FileMetadata>(
          `${GITHUB_API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=backend-cms-integration`,
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

        setFormData(parsedContent as FormData);
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
    }; // Cleanup and cancel the request if needed
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData)
  const triggerUpdateWorkflow = async () => {
    try {
      const response = await axios.post(
        `${GITHUB_API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/update-content.yaml/dispatches`,
        {
          ref: "backend-cms-integration",
          inputs: {
            content: JSON.stringify(formData, null, 2),
            filePath: FILE_PATH,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (response.status === 204) {
        setStatus("Workflow triggered successfully.");
      } else {
        console.log("Failed to trigger workflow.");
      }
    } catch (error) {
      console.error("Error triggering workflow:", error);
      setStatus("Error triggering workflow.");
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form>
        <div>
          <label>Intro:</label>
          <input
            type="text"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Paragraph 1:</label>
          <textarea
            name="paragraph1"
            value={formData.paragraph1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Paragraph 2:</label>
          <textarea
            name="paragraph2"
            value={formData.paragraph2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Paragraph 3:</label>
          <textarea
            name="paragraph3"
            value={formData.paragraph3}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={ triggerUpdateWorkflow}>
          Save and Deploy
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AdminApp;
