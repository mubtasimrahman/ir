

import React, { useState, useEffect } from "react";

const GITHUB_API_BASE_URL = "https://api.github.com";
const REPO_OWNER = "mubtasimrahman";
const REPO_NAME = "ir";
const FILE_PATH = "server/content/allTrades.json";

const AdminApp = () => {
  const [formData, setFormData] = useState({
    intro: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `${GITHUB_API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
          {
            headers: { Accept: "application/vnd.github.v3+json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch content");

        const data = await response.json();
        const decodedContent = atob(data.content);
        const parsedContent = JSON.parse(decodedContent);

        setFormData(parsedContent);
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerUpdateWorkflow = async () => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/update-content.yml/dispatches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            ref: "main",
            inputs: {
              content: JSON.stringify(formData, null, 2),
              filePath: FILE_PATH,
            },
          }),
        }
      );

      if (response.ok) {
        setStatus("Workflow triggered successfully.");
      } else {
        throw new Error("Failed to trigger workflow.");
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
        <button type="button" onClick={triggerUpdateWorkflow}>
          Save and Deploy
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AdminApp;
