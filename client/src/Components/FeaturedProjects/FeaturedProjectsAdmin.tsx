import { useState } from "react";
import ResolveImage from "../Utils/ResolveImage";
import TriggerUpdateWorkflow from "../Utils/TriggerUpdateWorkflow";
import FetchJSON from "../Utils/FetchJSON";

interface Project {
  name: string;
  services: string[];
  image: File | null; // For new image uploads
  imageUrl: string; // For resolving the current image
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

const jsonFilePath = "server/content/featuredProjects.json";
const imageFilePath = "client/src/asset/featuredProjects"
const endPoint = "https://asia-southeast1-mythic-attic-446309-k5.cloudfunctions.net/updateFeaturedProjects/triggerFeaturedProjects"

function FeaturedProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  

  console.log(projects);
  // Fetch JSON data and resolve image paths
  FetchJSON<FileMetadata, Project[]>({
    filePath:jsonFilePath,
    setFormData: setProjects,
  });

  const handleInputChange = (
    index: number,
    field: keyof Project,
    value: string | File
  ) => {
    if (field === "image") {
      const previewContainer = document.querySelector(
        `.thumbnail-img[data-index="${index.toString()}"]`
      );

      // Remove the existing image preview for this project
      const existingImage = previewContainer?.querySelector("img");
      if (existingImage) {
        URL.revokeObjectURL(existingImage.src); // Revoke the earlier URL
        previewContainer?.removeChild(existingImage); // Remove the old image
      }

      // Create a new image preview
      const newImage = document.createElement("img");
      newImage.src = URL.createObjectURL(value as File);
      previewContainer?.appendChild(newImage);
    }

    // Update project data
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave =async () => {
    const updatedProjects = projects.map((project) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...rest } = project;
      return rest;
    });

    const formData = new FormData();
    console.log(formData);
    formData.append("content", JSON.stringify(updatedProjects));
    console.log(formData);
    formData.append("jsonFilePath", jsonFilePath);
    formData.append("imageFilePath", imageFilePath);
    console.log(formData.getAll("filePath"));

    // Add new images to formData
    projects.forEach((project, index) => {
      if (project.image) {
        formData.append(`image_${index.toString()}`, project.image);
      }
    });
    console.log(formData.getAll("image_0"));

    try {
      await TriggerUpdateWorkflow({
        formData,
        setStatus,
        endPoint
      });
      setStatus("Successfully updated and deployed!");
    } catch (error) {
      console.error(error);
      setStatus("Failed to update. Check console for details.");
    }
  };

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
              Services:
              <input
                type="text"
                value={project.services}
                onChange={(e) => {
                  handleInputChange(index, "services", e.target.value);
                }}
              />
            </label>
            <label htmlFor={`image ${index.toString()}`}>
              Current Image:
              <img
                id={`image ${index.toString()}`}
                src={ResolveImage(project.imageUrl)}
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
                  const file = e.target.files?.[0];
                  if (file) {
                    handleInputChange(index, "image", file);
                  }
                }}
                
              />
              <div className="thumbnail-img" data-index={index}></div>
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            handleSave().catch((err: unknown) => {
              console.log(err);
            });
          }}
        >
          Save and Deploy
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default FeaturedProjectsAdmin;
