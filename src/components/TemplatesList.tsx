import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import TemplateDataService from "../services/TemplateService";
import ITemplateData from "../types/Template";

const TemplatesList: React.FC = () => {
  const [templates, setTemplates] = useState<Array<ITemplateData>>([]);
  const [currentTemplate, setCurrentTemplate] = useState<ITemplateData | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveTemplates();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTemplates = () => {
    TemplateDataService.getAll()
      .then((response: any) => {
        setTemplates(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTemplates();
    setCurrentTemplate(null);
    setCurrentIndex(-1);
  };

  const setActiveTemplate = (template: ITemplateData, index: number) => {
    setCurrentTemplate(template);
    setCurrentIndex(index);
  };

  const removeAllTemplates = () => {
    TemplateDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TemplateDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setTemplates(response.data);
        setCurrentTemplate(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Templates List</h4>

        <ul className="list-group">
          {templates &&
            templates.map((template, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTemplate(template, index)}
                key={index}
              >
                {template.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTemplates}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTemplate ? (
          <div>
            <h4>Template</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTemplate.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTemplate.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTemplate.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/templates/" + currentTemplate.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Template...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesList;
