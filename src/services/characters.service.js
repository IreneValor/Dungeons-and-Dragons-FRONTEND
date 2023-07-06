
import { TOKEN_NAME } from "../context/auth.context";
import axios from "axios";
import apiInstance from "./apiInstance";
class CharactersService {
  constructor() {
    this.api = apiInstance;
  }

  create(data) {
    return this.api.post("/characters", data);
  }

  edit(id, data) {
    return this.api.put(`/characters/${id}`, data);
  }

  delete(id) {
    return this.api.delete(`/characters/${id}`);
  }

  getAll() {
    return this.api.get("/characters");
  }

  getOne(id) {
    return this.api.get(`/characters/${id}`);
  }
}

const charactersService = new CharactersService();

export default charactersService;
