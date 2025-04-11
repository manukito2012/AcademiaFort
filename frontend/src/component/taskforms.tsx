import { useState } from "react";
import { createTask } from "../services/taskService";




export default function Taskforms() {


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "completed" ? value === "true" : value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createdTask = await createTask(formData);
      console.log("Tarea creada:", createdTask);
      alert('Tarea creada exitosamente');
      setFormData({
        title: "",
        description: "",
        completed: false,
      });
    } catch (error) {
    }
  };


  return (

    <div>
      <div className="container mt-5">
        <h2>Formulario para Crear Tareas</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ingrese el título"
            />
          </div>

          {/* Campo de descripción */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Ingrese la descripción"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="completed" className="form-label">Completado</label>
            <select
              className="form-select"
              id="completed"
              name="completed"
              value={formData.completed.toString()}
              onChange={handleChange}
            >
              <option value="false">Incompleto</option>
              <option value="true">Completado</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Crear</button>
        </form>
      </div>
    </div>
  )
}

