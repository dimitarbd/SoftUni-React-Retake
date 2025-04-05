import { Link } from 'react-router-dom';
import { useGetAllParts } from '../../hooks/useParts';
import { useState, useMemo } from 'react';

import PartCatalogItem from './part-catalog-item/PartCatalogItem';

const ITEMS_PER_PAGE = 6;

const categories = [
    'Engine and Drivetrain',
    'Suspension and Steering',
    'Braking System',
    'Electrical System',
    'Exhaust System',
    'Cooling System',
    'Body and Exterior',
    'Interior and Comfort',
    'Wheels and Tires',
    'Fuel System'
];

export default function PartCatalog() {
    const [parts] = useGetAllParts();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredParts = useMemo(() => {
        if (!selectedCategory) return parts;
        return parts.filter(part => part.category === selectedCategory);
    }, [parts, selectedCategory]);

    const getCategoryCount = (category) => {
        return parts.filter(part => part.category === category).length;
    };

    // Calculate pagination
    const totalPages = Math.ceil(filteredParts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedParts = filteredParts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={currentPage === i ? 'active' : ''}>
                    <Link to="#" onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i);
                    }}>{i}</Link>
                </li>
            );
        }
        return pages;
    };

    return (
        <>
            {/* <!-- Begin Uren's Breadcrumb Area --> */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2>Shop</h2>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Catalog</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <!-- Uren's Breadcrumb Area End Here --> */}

            {/* <!-- Begin Uren's Shop Left Sidebar Area --> */}
            <div className="shop-content_wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-5 order-2 order-lg-1 order-md-1">
                            <div className="uren-sidebar-catagories_area">
                                <div className="category-module uren-sidebar_categories">
                                    <div className="category-module_heading">
                                        <h5>Categories</h5>
                                    </div>
                                    <div className="module-body">
                                        <ul className="module-list_item">
                                            <li>
                                                <Link 
                                                    to="#" 
                                                    onClick={() => {
                                                        setSelectedCategory('');
                                                        setCurrentPage(1);
                                                    }}
                                                    className={!selectedCategory ? 'active' : ''}
                                                >
                                                    All Categories <span>({parts.length})</span>
                                                </Link>
                                                {categories.map(category => (
                                                    <Link 
                                                        key={category}
                                                        to="#" 
                                                        onClick={() => {
                                                            setSelectedCategory(category);
                                                            setCurrentPage(1);
                                                        }}
                                                        className={selectedCategory === category ? 'active' : ''}
                                                    >
                                                        {category} <span>({getCategoryCount(category)})</span>
                                                    </Link>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>                           
                        </div>
                        <div className="col-lg-9 col-md-7 order-1 order-lg-2 order-md-2">
                            <div className="shop-toolbar">
                                <div className="product-view-mode">
                                    <Link className="grid-1" data-target="gridview-1" data-toggle="tooltip" data-placement="top" title="1">1</Link>
                                    <Link className="grid-2" data-target="gridview-2" data-toggle="tooltip" data-placement="top" title="2">2</Link>
                                    <Link className="active grid-3" data-target="gridview-3" data-toggle="tooltip" data-placement="top" title="3">3</Link>
                                    <Link className="grid-4" data-target="gridview-4" data-toggle="tooltip" data-placement="top" title="4">4</Link>
                                    <Link className="grid-5" data-target="gridview-5" data-toggle="tooltip" data-placement="top" title="5">5</Link>
                                    <Link className="list" data-target="listview" data-toggle="tooltip" data-placement="top" title="List"><i className="fa fa-th-list"></i></Link>
                                </div>
                                <div className="product-item-selection_area">
                                    <div className="product-short">
                                        <label className="select-label">Sort By:</label>
                                        <select className="myniceselect nice-select">
                                            <option value="1">Default</option>
                                            <option value="2">Name, A to Z</option>
                                            <option value="3">Name, Z to A</option>
                                            <option value="4">Price, low to high</option>
                                            <option value="5">Price, high to low</option>
                                            <option value="5">Rating (Highest)</option>
                                            <option value="5">Rating (Lowest)</option>
                                            <option value="5">Model (A - Z)</option>
                                            <option value="5">Model (Z - A)</option>
                                        </select>
                                    </div>
                                    <div className="product-showing">
                                        <label className="select-label">Show:</label>
                                        <select className="myniceselect short-select nice-select">
                                            <option value="1">15</option>
                                            <option value="1">1</option>
                                            <option value="1">2</option>
                                            <option value="1">3</option>
                                            <option value="1">4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-product-wrap grid gridview-3 img-hover-effect_area row">
                                {paginatedParts.length > 0
                                    ? paginatedParts.map(part => <PartCatalogItem key={part._id} {...part} />)
                                    : <p>No parts found in this category.</p>
                                }
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="uren-paginatoin-area">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <ul className="uren-pagination-box primary-color">
                                                    {renderPagination()}
                                                    {currentPage < totalPages && (
                                                        <li>
                                                            <Link 
                                                                className="Next" 
                                                                to="#" 
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handlePageChange(currentPage + 1);
                                                                }}
                                                            >
                                                                Next
                                                            </Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Uren's Shop Left Sidebar Area End Here --> */}
        </>
    )
};