import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { TOKEN_NAME } from "../context/auth.context";

export default function ContraptionDetail() {
  const { id } = useParams();
  const history = useHistory();

  const [contraption, setContraption] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getContraption();
  }, []);

  const getContraption = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const res = await axios.get(
        `http://localhost:5005/api/contraptions/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { name, type, description, quantity, done } = res.data;
      setContraption(res.data);
      setName(name);
      setType(type);
      setDescription(description);
      setQuantity(quantity);
      setDone(done);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContraption = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await axios.put(
        `http://localhost:5005/api/contraptions/${id}`,
        {
          name,
          type,
          description,
          quantity,
          done,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      history.push("/contraptions");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContraption = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await axios.delete(`http://localhost:5005/api/contraptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      history.push("/contraptions");
    } catch (error) {
      console.log(error);
    }
  };

  if (!contraption) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Name: {contraption.name}</h1>
      <p>Type: {contraption.type}</p>
      <p>Description: {contraption.description}</p>
      <p>Quantity: {contraption.quantity}</p>
      <p>Done: {contraption.done ? "Yes" : "No"}</p>

      <h2>Edit Contraption</h2>
      <form onSubmit={updateContraption}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="done">Done:</label>
          <input
            type="checkbox"
            id="done"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      <button onClick={deleteContraption}>Delete</button>
    </div>
  );
}
