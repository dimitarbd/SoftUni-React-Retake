import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthcontext } from '../../contexts/AuthContext';
import { useCategory } from '../../contexts/CategoryContext';
import { useSearch } from '../../contexts/SearchContext';

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

export default function Header() {
    const { isAuthenticated } = useAuthcontext();
    const { setSelectedCategory } = useCategory();
    const { setSearchQuery } = useSearch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [mobileSearchValue, setMobileSearchValue] = useState('');

    useEffect(() => {
        const categoryHeading = document.querySelector('.category-heading');
        const categoryMenuList = document.getElementById('cate-toggle');

        if (categoryHeading && categoryMenuList) {
            categoryHeading.addEventListener('click', () => {
                if (categoryMenuList.style.display === 'none' || !categoryMenuList.style.display) {
                    categoryMenuList.style.display = 'block';
                } else {
                    categoryMenuList.style.display = 'none';
                }
            });
        }

        // Cleanup event listener
        return () => {
            if (categoryHeading) {
                categoryHeading.removeEventListener('click');
            }
        };
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate('/catalog');
        
        // Hide the categories-toggle element
        const categoryMenuList = document.getElementById('cate-toggle');
        if (categoryMenuList) {
            categoryMenuList.style.display = 'none';
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchValue);
        navigate('/catalog');
    };

    const handleMobileSearch = (e) => {
        e.preventDefault();
        setSearchQuery(mobileSearchValue);
        navigate('/catalog');
    };

    return (
        <header className="header-main_area header-main_area-2 bg--black">
            <div className="header-middle_area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-2 col-md-3 col-sm-5">
                            <div className="header-logo_area">
                                <Link to="/">
                                    <img src="/images/menu/logo/1.png" alt="Uren's Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 d-none d-lg-block">
                            <div className="hm-form_area">
                                <form onSubmit={handleSearch} className="hm-searchbox">
                                    <input 
                                        type="text" 
                                        placeholder="Enter your search key ..." 
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                    <button className="header-search_btn" type="submit">
                                        <i className="ion-ios-search-strong"><span>Search</span></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-9 col-sm-7">
                            <div className="header-right_area">
                                <ul>
                                    <li className="mobile-menu_wrap d-flex d-lg-none">
                                        <Link to="#mobileMenu" className="mobile-menu_btn toolbar-btn color--white">
                                            <i className="ion-navicon"></i>
                                        </Link>
                                    </li>                                    
                                    <li className="contact-us_wrap" style={{ marginLeft: 'auto' }}>
                                        <span style={{ color: 'white', fontSize: '1.5em' }}><i className="ion-android-call"></i>+123 321 345</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-top_area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="custom-category_col col-12">
                            <div className="category-menu">
                                <div className="category-heading">
                                    <h2 className="categories-toggle">
                                        <span>Shop By</span>
                                        <span>Category</span>
                                    </h2>
                                </div>
                                <div id="cate-toggle" className="category-menu-list" style={{ display: 'none' }}>
                                    <ul>
                                        {categories.map(category => (
                                            <li key={category}>
                                                <Link 
                                                    to="#" 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCategoryClick(category);
                                                    }}
                                                >
                                                    {category}
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="rx-child"><Link to="#">Uncategorized</Link></li>
                                        <li className="rx-child"><Link to="#">Appliances</Link></li>
                                        <li className="rx-parent">
                                            <Link className="rx-show">Collapse</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="custom-menu_col col-12 d-none d-lg-block">
                            <div className="main-menu_area position-relative">
                                <nav className="main-nav">
                                    <ul>
                                        <li className="dropdown-holder active"><Link to="/">Home</Link>
                                        </li>
                                        <li className="megamenu-holder "><Link to="/catalog">Catalog</Link>
                                        </li>
                                        {isAuthenticated && <li><Link to="/catalog/import" >Create Offer</Link></li>}
                                        {isAuthenticated && <li><Link to="/logout" >Logout</Link></li>}
                                        {!isAuthenticated && <li><Link to="/login" >Login</Link></li>}
                                        {!isAuthenticated && <li><Link to="/register" >Register</Link></li>}
                                        <li className=""><Link to="/about">About Us</Link></li>
                                        <li className=""><Link to="/contact">Contact</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {isAuthenticated && (<div className="custom-setting_col col-12 d-none d-lg-block">
                            <div className="ht-right_area">
                                <div className="ht-menu">
                                    <ul>
                                        <li><Link to="/my-account"><span className="fa fa-user"></span> <span>My Account</span></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>)}
                        <div className="custom-search_col d-none d-md-block d-lg-none">
                            <div className="hm-form_area">
                                <form onSubmit={handleMobileSearch} className="hm-searchbox">
                                    <input 
                                        type="text" 
                                        placeholder="Enter your search key ..." 
                                        value={mobileSearchValue}
                                        onChange={(e) => setMobileSearchValue(e.target.value)}
                                    />
                                    <button className="header-search_btn" type="submit">
                                        <i className="ion-ios-search-strong"><span>Search</span></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-top_area header-sticky bg--black">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7 d-lg-block d-none">
                            <div className="main-menu_area position-relative">
                                <nav className="main-nav">
                                    <ul>
                                        <li className="dropdown-holder active"><Link to="/">Home</Link>
                                        </li>
                                        <li className="megamenu-holder ">
                                            <Link to="/catalog">Catalog</Link>
                                        </li>
                                        {isAuthenticated && <li><Link to="/catalog/import" >Create Offer</Link></li>}
                                        {isAuthenticated && <li><Link to="/logout" >Logout</Link></li>}
                                        {!isAuthenticated && <li><Link to="/login" >Login</Link></li>}
                                        {!isAuthenticated && <li><Link to="/register" >Register</Link></li>}
                                        <li className=""><Link to="/about">About Us</Link></li>
                                        <li className=""><Link to="/contact">Contact</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-sm-3 d-block d-lg-none">
                            <div className="header-logo_area header-sticky_logo">
                                <Link to="index.html">
                                    <img src="/images/menu/logo/1.png" alt="Uren's Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 col-sm-9">
                            <div className="header-right_area">
                                <ul>
                                    <li className="mobile-menu_wrap d-flex d-lg-none">
                                        <Link to="#mobileMenu" className="mobile-menu_btn toolbar-btn color--white">
                                            <i className="ion-navicon"></i>
                                        </Link>
                                    </li>                                    
                                    <li className="contact-us_wrap" style={{ marginLeft: 'auto' }}>
                                        <span style={{ color: 'white', fontSize: '1.5em' }}><i className="ion-android-call"></i>+123 321 345</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            <div className="mobile-menu_wrapper" id="mobileMenu">
                <div className="offcanvas-menu-inner">
                    <div className="container">
                        <Link to="#" className="btn-close" onClick={(e) => e.preventDefault()}><i className="ion-android-close"></i></Link>
                        <div className="offcanvas-inner_search">
                            <form onSubmit={handleMobileSearch} className="inner-searchbox">
                                <input 
                                    type="text" 
                                    placeholder="Search for item..." 
                                    value={mobileSearchValue}
                                    onChange={(e) => setMobileSearchValue(e.target.value)}
                                />
                                <button className="search_btn" type="submit"><i className="ion-ios-search-strong"></i></button>
                            </form>
                        </div>
                        <nav className="offcanvas-navigation">
                            <ul className="mobile-menu">
                                <li className="menu-item-has-children active"><Link to="/"><span
                                    className="mm-text">Home</span></Link>
                                </li>
                                <li className="menu-item-has-children">
                                    <Link to="shop-left-sidebar.html" onClick={(e) => e.preventDefault()}>
                                        <span className="mm-text">Shop</span>
                                    </Link>                                    
                                </li>                                                          
                            </ul>
                        </nav>                        
                    </div>
                </div>
            </div>
        </header>
    );
}