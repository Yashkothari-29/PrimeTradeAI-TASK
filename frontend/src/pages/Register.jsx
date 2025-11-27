import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { CheckSquare } from 'lucide-react';

const Register = ({ setAuth }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            setAuth(true);
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message ||
                (err.response?.data?.errors && err.response.data.errors[0]?.msg) ||
                'Registration failed';
            setError(msg);
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
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-indigo-500">
                        Sign in
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
                            label="Full Name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
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
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                        />

                        <div>
                            <Button type="submit" className="w-full" loading={loading}>
                                Register
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Register;
