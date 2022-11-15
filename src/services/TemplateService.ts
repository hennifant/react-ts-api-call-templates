import http from "../http-common";
import ITemplateData from "../types/Template";

const getAll = () => {
  return http.get<Array<ITemplateData>>("/templates");
};

const get = (id: any) => {
  return http.get<ITemplateData>(`/templates/${id}`);
};

const create = (data: ITemplateData) => {
  return http.post<ITemplateData>("/templates", data);
};

const update = (id: any, data: ITemplateData) => {
  return http.put<any>(`/templates/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/templates/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/templates`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ITemplateData>>(`/templates?title=${title}`);
};

const TemplateService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TemplateService;
