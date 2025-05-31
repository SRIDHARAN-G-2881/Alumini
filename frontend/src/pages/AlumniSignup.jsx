import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi'; 
import { BACKEND_URL } from '../url';

export default function AlumniSignup() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateField = (id, value) => {
    let error = '';

    switch (id) {
        case 'name':
            if (!/^[a-zA-Z\s]+$/.test(value)){
                error = 'Name should contain only letters and spaces.';
            }
            break;
        case 'email':
            if (!/^\S+@\S+\.\S+$/.test(value)) {
                error = 'Please enter a valid email address.';
            }
            break;
        case 'password':
            if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                error = 'Password must be at least 8 characters long, include at least one letter, one number, one special symbol, and no spaces.';
            }
            break;
        case 'studentID':
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                error = 'Student ID should contain only letters and numbers.';
            }
            break;
        case 'contact':
            if (!/^\d+$/.test(value)){
                error = 'Contact should contain only numbers.';
            }
            break;
        case 'graduationYear':
            if (!/^\d{4}$/.test(value) || value < 1900 || value < new Date().getFullYear()) {
                error = 'Enter a valid graduation year.';
            }
            break;
        case 'linkedinUrl':
            if (!/^https:\/\/(www\.)?linkedin\.com\/(in\/|company\/)?[A-Za-z0-9-_.]+\/?$/.test(value)) {
                ;
            }
            break;
        case 'company':
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                error = 'Company name should contain only letters and spaces.';
            }
            break;
            case 'startDate':
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
            
                // Check if the selected date is greater than or equal to today
                if (selectedDate >= today) {
                    error = 'Start date must be in the past.';
                }
                break;
            
        default:
            break;
    }

    return error;
};

    
    

    const handleChange = (e) => {
        const { id, value } = e.target;
        const error = validateField(id, value);

        setFormData({
            ...formData,
            [id]: value.trim(),
        });

        setErrors({
            ...errors,
            [id]: error,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            const res = await fetch(`${BACKEND_URL}/server/studentauth/alumni-signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await res.json();

            if (data.success === false) {
                setErrors({ form: data.message });
                setLoading(false);
                return;
            }

            setLoading(false);

            if (res.ok) {
                navigate('/alumni-login');
            }
        } catch (error) {
            setErrors({ form: error.message });
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='user name' />
                            <TextInput type='text' placeholder='Name' id='name' onChange={handleChange} />
                            {errors.name && <Alert color='failure'>{errors.name}</Alert>}
                        </div>
                        <div>
                            <Label value='User email' />
                            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
                            {errors.email && <Alert color='failure'>{errors.email}</Alert>}
                        </div>
                        <div>
                            <Label value='User password' />
                            <div className='relative'>
                                <TextInput
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    id='password'
                                    onChange={handleChange}
                                />
                                <button
                                    type='button'
                                    className='absolute right-2 top-2 text-gray-500'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </button>
                            </div>
                            {errors.password && <Alert color='failure'>{errors.password}</Alert>}
                        </div>
                        <div>
                            <Label value='User student ID' />
                            <TextInput type='text' placeholder='Student ID' id='studentID' onChange={handleChange} />
                            {errors.studentID && <Alert color='failure'>{errors.studentID}</Alert>}
                        </div>
                        <div>
                            <Label value='User contact' />
                            <TextInput type='number' placeholder='Contact' id='contact' onChange={handleChange} />
                            {errors.contact && <Alert color='failure'>{errors.contact}</Alert>}
                        </div>
                        <div>
                            <Label value='User graduation year' />
                            <TextInput type='number' placeholder='Graduation Year' id='graduationYear' onChange={handleChange} />
                            {errors.graduationYear && <Alert color='failure'>{errors.graduationYear}</Alert>}
                        </div>
                        <div>
                            <Label value='User company' />
                            <TextInput type='text' placeholder='Company' id='company' onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='User start date' />
                            <TextInput type='date' placeholder='Start Date' id='startDate' onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='User role' />
                            <TextInput type='text' placeholder='Role' id='role' onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='User LinkedIn URL' />
                            <TextInput type='text' placeholder='LinkedIn URL' id='linkedinUrl' onChange={handleChange} />
                            {errors.linkedinUrl && <Alert color='failure'>{errors.linkedinUrl}</Alert>}
                        </div>
                        <Button type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/alumni-login' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {errors.form && <Alert className='mt-5' color='failure'>{errors.form}</Alert>}
                </div>
            </div>
        </div>
    );
}
