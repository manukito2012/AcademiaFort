
const urlBase = 'http://localhost:3000/task/';


// metodo para obtener todas las tareas
export const getTasks = async () => {
    try {
        const response = await fetch(urlBase);
        if (!response.ok) {
            throw new Error('Error al obtener las tareas');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        throw error;
    }
}

// metodo para obtener una tarea por ID
export const getTaskById = async (id: number) => {
    try {
        const response = await fetch(`${urlBase}${id}`);
        if (!response.ok) {
            throw new Error(`Error al obtener la tarea con id ${id}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener la tarea con id ${id}:`, error);
        throw error;
    }
}

// Metodo para crear tareas
export const createTask = async (taskData: object) => {
    try {
        const response = await fetch(urlBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error('Error al crear la tarea');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
}

// Mtodo para eliminar tareas
export const deleteTask = async (id: string) => {
    console.log('ID recibido en deleteTask:', id);  // Verifica si el id está presente aquí
    try {
        const response = await fetch(`${urlBase}${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar la tarea con id ${id}`);
        }
        return id;
    } catch (error) {
        console.error(`Error al eliminar la tarea con id ${id}:`, error);
        throw error;
    }
};


// Metodo para actualizar Tareas
export const updateTask = async (id: number, updatedData: object) => {
    try {
        const response = await fetch(`${urlBase}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar la tarea con id ${id}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al actualizar la tarea con id ${id}:`, error);
        throw error;
    }
}
