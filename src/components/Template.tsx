import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TemplateDataService from "../services/TemplateService";
import ITemplateData from "../types/Template";

const Template: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTemplateState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentTemplate, setCurrentTemplate] =
    useState<ITemplateData>(initialTemplateState);
  const [message, setMessage] = useState<string>("");

  const getTemplate = (id: string) => {
    TemplateDataService.get(id)
      .then((response: any) => {
        setCurrentTemplate(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getTemplate(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTemplate({ ...currentTemplate, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentTemplate.id,
      title: currentTemplate.title,
      description: currentTemplate.description,
      published: status,
    };

    TemplateDataService.update(currentTemplate.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentTemplate({ ...currentTemplate, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateTemplate = () => {
    TemplateDataService.update(currentTemplate.id, currentTemplate)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The template was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteTemplate = () => {
    TemplateDataService.remove(currentTemplate.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/templates");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTemplate ? (
        <div className="edit-form">
          <h4>Template</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTemplate.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTemplate.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTemplate.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTemplate.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTemplate}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTemplate}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Template...</p>
        </div>
      )}
    </div>
  );
};

export default Template;
