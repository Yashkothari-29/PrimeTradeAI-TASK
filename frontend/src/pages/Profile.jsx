import React, { useState, useEffect } from 'react';
import api from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Loader from '../components/Loader';

const Profile = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile/me');
                setFormData({ name: res.data.user.name, email: res.data.user.email });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            await api.put('/profile', formData);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader size="large" className="mt-12" />;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {message.text && (
                        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <div className="flex justify-end">
                        <Button type="submit" loading={saving}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Profile;
