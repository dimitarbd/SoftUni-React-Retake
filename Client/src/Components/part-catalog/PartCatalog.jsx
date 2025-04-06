import { Link } from 'react-router-dom';
import { useGetAllParts } from '../../hooks/useParts';
import { useState, useMemo, useEffect } from 'react';
import { useCategory } from '../../contexts/CategoryContext';
import { useSearch } from '../../contexts/SearchContext';

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
    const { selectedCategory, setSelectedCategory } = useCategory();
    const { searchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to first page when category or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const filteredParts = useMemo(() => {
        let filtered = parts;
        
        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(part => part.category === selectedCategory);
        }
        
        // Filter by search query (only by title)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(part => 
                part.title.toLowerCase().includes(query)
            );
        }
        
        return filtered;
    }, [parts, selectedCategory, searchQuery]);

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
                                                    onClick={() => setSelectedCategory('')}
                                                    className={!selectedCategory ? 'active' : ''}
                                                >
                                                    All Categories <span>({parts.length})</span>
                                                </Link>
                                                {categories.map(category => (
                                                    <Link 
                                                        key={category}
                                                        to="#" 
                                                        onClick={() => setSelectedCategory(category)}
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
                            <div className="shop-product-wrap grid gridview-3 img-hover-effect_area row">
                                {paginatedParts.length > 0
                                    ? paginatedParts.map(part => <PartCatalogItem key={part._id} {...part} />)
                                    : <h6>No parts found in this category.</h6>
                                }
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="uren-paginatoin-area">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                {paginatedParts.length > 0 && (<ul className="uren-pagination-box primary-color">
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
                                                </ul>)}
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