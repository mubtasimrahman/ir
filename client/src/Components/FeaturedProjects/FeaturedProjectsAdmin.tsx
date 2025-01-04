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
const imageFilePath = "client/src/asset/featuredProjects";
const endPoint =
  "https://us-central1-mythic-attic-446309-k5.cloudfunctions.net/updateFeaturedClients/triggerFeaturedProjects";

function FeaturedProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  // Fetch JSON data and resolve image paths
  FetchJSON<FileMetadata, Project[]>({
    filePath: jsonFilePath,
    setFormData: setProjects,
  });

  const handleInputChange = (
    index: number,
    field: keyof Project,
    value: string | File
  ) => {
    if (field === "image") {

      const file = value as File;
      // Check if the file name already exists in other projects
    const isDuplicate = projects.some(
      (project, projectIndex) =>
        projectIndex !== index && project.image?.name === file.name
    );

    if (isDuplicate) {
      window.alert(`The image file "${file.name}" is already in use. Please choose a different file.`);
      return; // Exit early to prevent updating the state
    }  


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
      console.log(prev);
      const updated = [...prev];
      console.log(updated);
      updated[index] = { ...updated[index], [field]: value };
      console.log(updated);
      return updated;
    });
  };

  const handleServiceChange = (
    index: number,
    serviceIndex: number,
    value: string
  ) => {
    setProjects((prev) => {
      const updated = [...prev];
      const updatedServices = [...updated[index].services];
      updatedServices[serviceIndex] = value; // Update the specific service
      updated[index] = { ...updated[index], services: updatedServices };
      return updated;
    });
  };

  const addService = (index: number) => {
    setProjects((prev) => {
      const updated = [...prev];
      const updatedServices = [...updated[index].services, ""]; // Add an empty service
      updated[index] = { ...updated[index], services: updatedServices };
      return updated;
    });
  };

  const removeService = (index: number, serviceIndex: number) => {
    setProjects((prev) => {
      const updated = [...prev];
      const updatedServices = [...updated[index].services];
      updatedServices.splice(serviceIndex, 1); // Remove the specific service
      updated[index] = { ...updated[index], services: updatedServices };
      return updated;
    });
  };

  const handleSave = async () => {
    const updatedProjects = projects.map((project) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...rest } = project;
      return rest;
    });

    const formData = new FormData();
    formData.append("content", JSON.stringify(updatedProjects));
    formData.append("jsonFilePath", jsonFilePath);
    formData.append("imageFilePath", imageFilePath);
    console.log(formData.getAll("jsonFilePath"));

    const mapping: Record<string, string> = {};

    // Add new images to formData
    projects.forEach((project) => {
      if (project.image) {
        formData.append(project.image.name, project.image); // Append file 
        // Map the file name to the project's `imageUrl`
        mapping[project.image.name] = project.imageUrl
      }
    });
    formData.append("mapping", JSON.stringify(mapping));

    // Debugging: Log the FormData content
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await TriggerUpdateWorkflow<FormData>({
        formData,
        setStatus,
        endPoint,
        contentType: "multipart/form-data",
      });
    } catch (error) {
      console.error(error);
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
            {project.services.map((service, serviceIndex) => (
              <div key={serviceIndex} className="service-item">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => {
                    handleServiceChange(index, serviceIndex, e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    removeService(index, serviceIndex);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                addService(index);
              }}
            >
              Add Service
            </button>

            <label htmlFor={`image ${index.toString()}`}>
              Current Image:
              <img
                id={`image-${index.toString()}`}
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
