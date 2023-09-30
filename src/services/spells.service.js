import apiInstance from "./apiInstance";

class SpellsService {
  constructor() {
    this.api = apiInstance;
  }

  create(data) {
    return this.api.post("/spells", data);
  }

  edit(id, data) {
    return this.api.put(`/spells/${id}`, data);
  }

  delete(id) {
    return this.api.delete(`/spells/${id}`);
  }

  getAll() {
    return this.api.get("/spells");
  }

  getFilteredByLevel(level) {
    return this.api.get(`/spells?level=${level}`);
  }
  search(term) {
    return this.api.get(`/spells/search?term=${term}`);
  }

  getOne(id) {
    return this.api.get(`/spells/${id}`);
  }
  getByIndex(id) {
    return this.api.get(`https://www.dnd5eapi.co/api/spells/${id}`);
  }
  addSpells(characterId, spells) {
    return this.api.post(`/characters/${characterId}/addSpells`, {
      spells,
    });
  }
  removeSpell(characterId, spellId) {
    return this.api.delete(`/characters/${characterId}/removeSpell/${spellId}`);
  }
}

const spellsService = new SpellsService();

export default spellsService;
