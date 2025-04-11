import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTaskById } from '../services/taskService';

export default function Taskone() {
    const { id } = useParams();
    const [task, setTask] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                if (!id) {
                    throw new Error("No se proporcionó un id");
                }
                const taskId = parseInt(id, 10);
                const data = await getTaskById(taskId);
                if (!data) {
                    throw new Error("Tarea no encontrada");
                }
                setTask(data);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!task) {
        return <div>No se encontró la tarea.</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card mb-3" style={{
                width: '18rem',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}>
                <div className="card-body">
                    <h5 className="card-title"><strong>TITULO:</strong> {task.title}</h5>
                    <p className="card-text"><strong>Descripción:</strong> {task.description}</p>
                    <p className="card-text"><strong>Estado:</strong> {task.completed ? 'Completado' : 'Incompleto'}</p>
                    <p className="card-text"><strong>Fecha de creación:</strong> {new Date(task.createAT).toLocaleDateString()}</p>
                </div>
                <Link to={'/task'}>
                    <button className="btn btn-primary me-2">
                        VOLVER
                    </button>
                </Link>
            </div>
        </div>

    );
}
