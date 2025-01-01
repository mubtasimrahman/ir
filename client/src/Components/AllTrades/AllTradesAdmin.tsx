import TriggerUpdateWorkflow from "../Utils/TriggerUpdateWorkflow";
import FetchJSON from "../Utils/FetchJSON";
import { useState } from "react";

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
const filePath = "server/content/allTrades.json";
function AllTradesAdmin() {
  const [formData, setFormData] = useState<FormData>({
    intro: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  FetchJSON<FileMetadata, FormData>({
    filePath,
    setFormData,
  });

  return (
    <div>
      <h1>Admin Panel</h1>
      <form>
        <div>
          <label>
            Intro:
            <input
              type="text"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Paragraph 1
            <textarea
              name="paragraph1"
              value={formData.paragraph1}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Paragraph 2:
            <textarea
              name="paragraph2"
              value={formData.paragraph2}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Paragraph 3:
            <textarea
              name="paragraph3"
              value={formData.paragraph3}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          type="button"
          onClick={() => {
            TriggerUpdateWorkflow({ formData, setStatus }).catch(
              (error: unknown) => {
                console.log(error);
              }
            );
          }}
        >
          Save and Deploy
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default AllTradesAdmin;
