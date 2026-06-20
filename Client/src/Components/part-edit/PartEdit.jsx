import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import partsAPI from '../../api/parts-api';
import { AuthContext } from '../../contexts/AuthContext';

export default function PartEdit() {
    const { partId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchPart = async () => {
            try {
                const partData = await partsAPI.getOne(partId);
                if (!partData.specifications) {
                    partData.specifications = {
                        title: '',
                        price: '',
                        description: '',
                        imageUrl: '',
                        category: '',
                        quantity: '',
                        brand: '',
                        model: '',
                        year: '',
                        rating: '',
                    };
                }
                setFormData(partData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching part:', error);
                navigate('/catalog');
            }
        };

        fetchPart();
    }, [isAuthenticated, navigate, partId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await partsAPI.update(partId, formData);
            navigate(`/catalog/${partId}/details`);
        } catch (error) {
            console.error('Error updating part:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    if (isLoading || !formData) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                <p className="mt-3">Loading part data...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Begin Breadcrumb Area */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2>Edit Part</h2>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/catalog">Catalog</Link></li>
                            <li className="active">Edit Part</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Breadcrumb Area End */}

            {/* Begin Edit Form Area */}
            <div className="uren-login-register_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="login-title">
                                    <h3>Part Information</h3>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box">
                                            <label htmlFor="name" className="mb-1">Part Name <span className="required">*</span></label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title || ''}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter part name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box">
                                            <label htmlFor="price" className="mb-1">Price <span className="required">*</span></label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={formData.price || ''}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter price"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-box">
                                            <label htmlFor="description" className="mb-1">Description <span className="required">*</span></label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description || ''}
                                                onChange={handleChange}
                                                rows="4"
                                                required
                                                placeholder="Enter detailed description"
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box">
                                            <label htmlFor="imageUrl" className="mb-1">Image URL <span className="required">*</span></label>
                                            <input
                                                type="url"
                                                id="imageUrl"
                                                name="imageUrl"
                                                value={formData.imageUrl || ''}
                                                onChange={handleChange}
                                                required
                                                placeholder="http://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box">
                                            <label htmlFor="stock" className="mb-1">Stock Quantity <span className="required">*</span></label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                value={formData.quantity || ''}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter quantity in stock"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-box">
                                            <label htmlFor="category" className="mb-1">Category <span className="required">*</span></label>
                                            <select
                                                className="nice-select w-100"
                                                id="category"
                                                name="category"
                                                value={formData.category || ''}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                <option value="Engine and Drivetrain">Engine and Drivetrain</option>
                                                <option value="Suspension and Steering">Suspension and Steering</option>
                                                <option value="Braking System">Braking System</option>
                                                <option value="Electrical System">Electrical System</option>
                                                <option value="Exhaust System">Exhaust System</option>
                                                <option value="Cooling System">Cooling System</option>
                                                <option value="Body and Exterior">Body and Exterior</option>
                                                <option value="Interior and Comfort">Interior and Comfort</option>
                                                <option value="Wheels and Tires">Wheels and Tires</option>
                                                <option value="Fuel System">Fuel System</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="login-title mt-5">
                                    <h3>Specifications</h3>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box">
                                            <label htmlFor="specifications.brand" className="mb-1">Brand <span className="required">*</span></label>
                                            <input
                                                type="text"
                                                id="brand"
                                                name="brand"
                                                value={formData.brand || ''}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter brand"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box">
                                            <label htmlFor="specifications.year" className="mb-1">Year <span className="required">*</span></label>
                                            <input
                                                type="number"
                                                id="year"
                                                name="year"
                                                value={formData.year}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const currentYear = new Date().getFullYear();
                                                    if (value < 1900 || value > currentYear) {
                                                        setError(`Year must be between 1900 and ${currentYear}`);
                                                    } else {
                                                        setError('');
                                                    }
                                                    handleChange(e);
                                                }}
                                                required
                                                placeholder="Enter year (e.g., 2022)"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box">
                                            <label htmlFor="rating" className="mb-1">Rating <span className="required">*</span></label>
                                            <input
                                                type="number"
                                                id="rating"
                                                name="rating"
                                                value={formData.rating}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value < 1 || value > 5) {
                                                        setError('Rating must be between 1 and 5');
                                                    } else {
                                                        setError('');
                                                    }
                                                    handleChange(e);
                                                }}
                                                required
                                                placeholder="Enter rating (between 1 and 5)"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <div className="button-box d-flex justify-content-between">
                                            <Link to={`/catalog/${partId}/details`} className="uren-btn uren-btn_dark">
                                                <span>Cancel</span>
                                            </Link>
                                            <button type="submit" className="uren-btn" disabled={isLoading}>
                                                {isLoading? (
                                                    <span>
                                                        <div className="spinner-border spinner-border-sm text-light" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>                                                        
                                                    </span>
                                                ) : (
                                                    <span>Save Changes</span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Form Area End */}
        </>
    );
}