import { useState } from "react";
import TriggerUpdateWorkflow from "../Utils/TriggerUpdateWorkflow";
import FetchJSON from "../Utils/FetchJSON";

interface Project {
  name: string;
  service: string;
  image: File | null; // For new image uploads
  imagePath: string; // For resolving the current image
}

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

const filePath = "server/content/featuredProjects.json";

function FeaturedProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  // Fetch JSON data and resolve image paths
  FetchJSON<FileMetadata, Project[]>({
    filePath,
    setFormData: setProjects,
  });

  const handleInputChange = (
    index: number,
    field: keyof Project,
    value: string | File
  ) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  //   const handleSave = async () => {
  //     const updatedProjects = projects.map((project) => {
  //       const { image, ...rest } = project;
  //       return rest;
  //     });

  //     const formData = new FormData();
  //     formData.append("content", JSON.stringify(updatedProjects));
  //     formData.append("filePath", filePath);

  //     // Add new images to formData
  //     projects.forEach((project, index) => {
  //       if (project.image) {
  //         formData.append(`image_${index.toString()}`, project.image);
  //       }
  //     });

  //     try {
  //       await TriggerUpdateWorkflow({
  //         formData,
  //         setStatus,
  //       });
  //       setStatus("Successfully updated and deployed!");
  //     } catch (error) {
  //       console.error(error);
  //       setStatus("Failed to update. Check console for details.");
  //     }
  //   };

  return (
    <div>
      <h1>Featured Projects Admin</h1>
      <form>
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <label>
              Name:
              <input
                type="text"
                value={project.name}
                onChange={(e) => {
                  handleInputChange(index, "name", e.target.value);
                }}
              />
            </label>
            <label>
              Service:
              <input
                type="text"
                value={project.service}
                onChange={(e) => {
                  handleInputChange(index, "service", e.target.value);
                }}
              />
            </label>
            <label htmlFor={`image ${index.toString()}`}>
              Current Image:
              <img
                id={`image ${index.toString()}`}
                src={project.imagePath}
                alt={project.name}
                className="preview"
              />
            </label>
            <label>
              Replace Image:
              <input
                type="file"
                accept="image/webp"
                onChange={(e) => {
                  handleInputChange(
                    index,
                    "image",
                    e.target.value
                  );
                }}
              />
            </label>
          </div>
        ))}
        {/* <button
          type="button"
          onClick={() => {
            handleSave().catch((err: unknown) => {
              console.log(err);
            });
          }}
        >
          Save and Deploy
        </button> */}
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default FeaturedProjectsAdmin;
