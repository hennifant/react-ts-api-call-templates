import React, { useState, ChangeEvent } from "react";
import TemplateDataService from "../services/TemplateService";
import ITemplateData from "../types/Template";

const AddTemplate: React.FC = () => {
  const initialTemplateState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [template, setTemplate] = useState<ITemplateData>(initialTemplateState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTemplate({ ...template, [name]: value });
  };

  const saveTemplate = () => {
    var data = {
      title: template.title,
      description: template.description,
    };

    TemplateDataService.create(data)
      .then((response: any) => {
        setTemplate({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newTemplate = () => {
    setTemplate(initialTemplateState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTemplate}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={template.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={template.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTemplate} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTemplate;
