import apiInstance from "./apiInstance";

class ContraptionService {
  constructor() {
    this.api = apiInstance;
  }

  create(data) {
    return this.api.post("/contraptions", data);
  }

  edit(id, data) {
    return this.api.put(`/contraptions/${id}`, data);
  }

  delete(id) {
    return this.api.delete(`/contraptions/${id}`);
  }

  getAll() {
    return this.api.get(`/contraptions`);
  }

  getOne(id) {
    return this.api.get(`/contraptions/${id}`);
  }
  getByIndex(id) {
    // return this.api.get(`/contraptions/${id}`);
    return this.api.get(`https://www.dnd5eapi.co/api/equipment/${id}`);
  }
  addContraptions(characterId, contraptions) {
    return this.api.post(`/characters/${characterId}/addContraptions`, {
      contraptions,
    });
  }
  removeContraption(characterId, contraptionId) {
    return this.api.delete(
      `/characters/${characterId}/removeContraption/${contraptionId}`
    );
  }
}

const contraptionService = new ContraptionService();

export default contraptionService;
