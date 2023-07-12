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

  getFilteredByClassAndLevel(spellClass, level) {
    return this.api.get(`/classes/${spellClass}/spells/${level}`);
  }

  getOne(id) {
    return this.api.get(`/spells/${id}`);
  }
}

const spellsService = new SpellsService();

export default spellsService;
// import axios from "axios";
// import { TOKEN_NAME } from "../context/auth.context";
// import apiInstance from "./apiInstance";

// class SpellsService {
//   constructor() {
//     this.api = apiInstance;
//   }

//   create(data) {
//     return this.api.post("/spells", data);
//   }

//   edit(id, data) {
//     return this.api.put(`/spells/${id}`, data);
//   }

//   delete(id) {
//     return this.api.delete(`/spells/${id}`);
//   }

//   getAll() {
//     return this.api.get("/spells");
//   }

//   getFilteredByClassAndLevel(spellClass, level) {
//     // return this.api.get(`/api/classes/${spellClass}/spells/${level}`);
//     return this.api.get(`/classes/${spellClass}/spells/${level}`);
//   }

//   getOne(id) {
//     return this.api.get(`/spells/${id}`);
//     // return this.api.get(`api/spells/${spellIndex}`);
//   }
// }

// const spellsService = new SpellsService();

// export default spellsService;
