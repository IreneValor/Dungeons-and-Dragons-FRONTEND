
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
  addContraption(characterId, contraptionId) {
    return this.api.post(`/characters/${characterId}/addContraption`, {
      contraptionId,
    });
  }
}

const charactersService = new CharactersService();

export default charactersService;
