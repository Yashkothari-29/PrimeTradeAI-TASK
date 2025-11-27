import React, { useState, useEffect } from 'react';
import api from '../api';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'pending' });
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/tasks?search=${search}&status=${filter}`);
            setTasks(res.data.tasks);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search, filter]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentTask) {
                await api.put(`/tasks/${currentTask._id}`, formData);
            } else {
                await api.post('/tasks', formData);
            }
            setIsModalOpen(false);
            fetchTasks();
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const openModal = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setFormData({ title: task.title, description: task.description, status: task.status });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setCurrentTask(null);
        setFormData({ title: '', description: '', status: 'pending' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Tasks</h1>
                <Button onClick={() => openModal()} className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Task
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative w-full md:w-48">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <Loader size="large" className="mt-12" />
            ) : tasks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <Card key={task._id} className="hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 truncate pr-4">{task.title}</h3>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {task.status.replace('-', ' ')}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-6 line-clamp-3 h-12">{task.description}</p>
                            <div className="flex justify-end space-x-2">
                                <Button variant="ghost" onClick={() => openModal(task)} className="!p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" onClick={() => handleDelete(task._id)} className="!p-2 text-red-600 hover:text-red-800 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentTask ? 'Edit Task' : 'Create New Task'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-24 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">{currentTask ? 'Update Task' : 'Create Task'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Dashboard;
