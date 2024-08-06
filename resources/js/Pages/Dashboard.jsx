import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dashboard({ auth }) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                if (response.data.length === 0) {
                    setTasks([{ title: 'Tarea por defecto', order: '', is_completed: false }]);
                } else {
                    setTasks(response.data);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleInputChange = (e, index, field) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, [field]: field === 'is_completed' ? e.target.checked : e.target.value };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const handleDeleteTask = async (index) => {
        const taskToDelete = tasks[index];
        if (taskToDelete.id) {
            try {
                await axios.delete(`/api/tasks/${taskToDelete.id}`);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
        console.log(index)
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleAddTask = () => {
        setTasks([...tasks, { title: '', order: '', is_completed: false }]);
    };

    const handleSaveTask = async (index) => {
        const taskToSave = tasks[index];
        try {
            if (taskToSave.id) {
                await axios.put(`/api/tasks/${taskToSave.id}`, taskToSave);
            } else {
                const response = await axios.post('/api/tasks', taskToSave);
                const newTasks = tasks.map((task, i) => (i === index ? response.data : task));
                setTasks(newTasks);
            }
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleSortTasks = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });
        setTasks(sortedTasks);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleFilterChange = async (e) => {
        setFilter(e.target.value);
        try {
            const response = await axios.get('/api/tasks/search', {
                params: { query: e.target.value }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching filtered tasks:', error);
        }
    };

    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Tasks</h2>}
        >
            <Head title="Dashboard" />
            <div className="mb-3 d-flex align-items-center">
                <button onClick={handleSortTasks} className="btn btn-primary mb-3 me-4">
                    <i className="bi bi-sort-alpha-down"></i> Ordenar por ID
                </button>
                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={filter}
                    onChange={handleFilterChange}
                    className="border rounded px-2 py-1"
                    style={{ marginLeft: '4cm' }}
                />
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="font-bold">Title</div>
                                <div className="font-bold">Order</div>
                                <div className="font-bold">Completed</div>
                                <div className="font-bold">Actions</div>
                            </div>
                            {filteredTasks.map((task, index)=> (
                                <div key={index} className="grid grid-cols-4 gap-4 mt-4">
                                    <input
                                        type="text"
                                        value={task.title}
                                        onChange={(e) => handleInputChange(e, index, 'title')}
                                        className="border rounded px-2 py-1"
                                    />
                                    <input
                                        type="text"
                                        value={task.order}
                                        onChange={(e) => handleInputChange(e, index, 'order')}
                                        className="border rounded px-2 py-1"
                                    />
                                    <input
                                        type="checkbox"
                                        checked={task.is_completed}
                                        onChange={(e) => handleInputChange(e, index, 'is_completed')}
                                        className="border rounded px-5 py-5"
                                    />
                                    <div>
                                    <button onClick={handleAddTask} className="bg-green-500 text-white px-2 py-2 rounded mr-2">Agregar línea</button>
                                        <button onClick={() => handleSaveTask(index)} className="bg-green-500 text-white px-2 py-2 rounded mr-2">Guardar</button>
                                        <button onClick={() => handleDeleteTask(index)} className="bg-red-500 text-white px-2 py-2 rounded">Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
