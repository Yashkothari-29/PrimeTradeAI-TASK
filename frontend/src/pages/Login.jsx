import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { CheckSquare } from 'lucide-react';

const Login = ({ setAuth }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setAuth(true);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center text-primary">
                    <CheckSquare className="h-12 w-12" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/register" className="font-medium text-primary hover:text-indigo-500">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card>
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Input
                            label="Email address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />

                        <div>
                            <Button type="submit" className="w-full" loading={loading}>
                                Sign in
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
