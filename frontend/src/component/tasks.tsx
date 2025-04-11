
import { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../services/taskService';
import { Link } from 'react-router-dom';
import { Task } from '../models/task.model';



export default function Tasks() {

  const [tareas, setTareas] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTareas(data);
      } catch (error) {
      }
    };

    fetchTasks();
  }, []);



  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTareas(tareas.filter(tarea => tarea.id !== id));
      alert('Tarea eliminada');
    } catch (error) {
      alert('Hubo un error al eliminar la tarea');
    }
  };


  const filteredTasks = tareas.filter(tarea =>
    tarea.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || (filter === 'completed' && tarea.completed) || (filter === 'incomplete' && !tarea.completed))
  );



  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-4 text-center fw-bold">Lista de Tareas</h2>

        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botones para alternar entre tareas completadas, incompletas y todas */}
        <div className="mb-3">
          <button
            className={`btn ${filter === 'completed' ? 'btn-secondary' : 'btn-primary'} me-2`}
            onClick={() => setFilter('completed')}>
            Ver Tareas Completas
          </button>
          <button
            className={`btn ${filter === 'incomplete' ? 'btn-secondary' : 'btn-primary'} me-2`}
            onClick={() => setFilter('incomplete')}>
            Ver Tareas Incompletas
          </button>
          <button
            className={`btn ${filter === 'all' ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setFilter('all')}>
            Ver Todas las Tareas
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="alert alert-info text-center">No hay tareas que coincidan con el título ingresado.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Completado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((tarea) => (
                  <tr key={tarea.id}>
                    <td>{tarea.title}</td>
                    <td>{tarea.description}</td>
                    <td>
                      <span className={`badge ${tarea.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {tarea.completed ? 'Completado' : 'Incompleto'}
                      </span>
                    </td>
                    <td>{new Date(tarea.createAT).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/taskone/${tarea.id}`}>
                        <button className="btn btn-primary me-2">Ver</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(tarea.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}