import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useCategory } from '../../contexts/CategoryContext';

import $ from 'jquery';
import 'slick-carousel/slick/slick';


export default function Slider() {
   const { setSelectedCategory } = useCategory();

   useEffect(() => {
     // First remove any existing slick initialization to prevent duplicates
     if ($('.main-slider').hasClass('slick-initialized')) {
       $('.main-slider').slick('unslick');
     }
     
     // Initialize slick slider with standard configuration
     $('.main-slider').slick({
       autoplay: true,
       autoplaySpeed: 5000,
       speed: 1000,
       dots: true,
       fade: true,
       arrows: true, // Keep arrows enabled
     });

     // Use direct DOM manipulation to remove duplicate arrows and hide text labels
     setTimeout(() => {
       // Handle next arrows - keep only the first one
       const nextArrows = document.querySelectorAll('.main-slider .slick-next');
       if (nextArrows.length > 1) {
         // Keep the first one, remove the rest
         for (let i = 1; i < nextArrows.length; i++) {
           if (nextArrows[i] && nextArrows[i].parentNode) {
             nextArrows[i].parentNode.removeChild(nextArrows[i]);
           }
         }
       }
       
       // Handle prev arrows - keep only the first one
       const prevArrows = document.querySelectorAll('.main-slider .slick-prev');
       if (prevArrows.length > 1) {
         // Keep the first one, remove the rest
         for (let i = 1; i < prevArrows.length; i++) {
           if (prevArrows[i] && prevArrows[i].parentNode) {
             prevArrows[i].parentNode.removeChild(prevArrows[i]);
           }
         }
       }
       
       // Handle duplicate dots - keep only the first set
       const dotsContainers = document.querySelectorAll('.main-slider .slick-dots');
       if (dotsContainers.length > 1) {
         // Keep the first one, remove the rest
         for (let i = 1; i < dotsContainers.length; i++) {
           if (dotsContainers[i] && dotsContainers[i].parentNode) {
             dotsContainers[i].parentNode.removeChild(dotsContainers[i]);
           }
         }
       }
       
       // Ensure proper styling for the remaining arrows and hide text labels
       const remainingNextArrow = document.querySelector('.main-slider .slick-next');
       const remainingPrevArrow = document.querySelector('.main-slider .slick-prev');
       
       if (remainingNextArrow) {
         remainingNextArrow.style.zIndex = '9';
         remainingNextArrow.style.right = '15px';
         remainingNextArrow.style.fontSize = '0'; // Hide text
         remainingNextArrow.style.lineHeight = '0'; // Hide text
         remainingNextArrow.style.position = 'absolute'; // Ensure position is absolute
         remainingNextArrow.style.transform = 'none'; // Ensure no transform
         
         // Replace the icon with a more site-appropriate one
         if (remainingNextArrow.querySelector('i.fa')) {
           remainingNextArrow.querySelector('i.fa').remove();
         }
         const icon = document.createElement('i');
         icon.className = 'ion-ios-arrow-forward';
         icon.style.fontSize = '24px';
         icon.style.lineHeight = '1';
         icon.style.display = 'block';
         remainingNextArrow.appendChild(icon);
       }
       
       if (remainingPrevArrow) {
         remainingPrevArrow.style.zIndex = '9';
         remainingPrevArrow.style.left = '15px';
         remainingPrevArrow.style.fontSize = '0'; // Hide text
         remainingPrevArrow.style.lineHeight = '0'; // Hide text
         remainingPrevArrow.style.position = 'absolute'; // Ensure position is absolute
         remainingPrevArrow.style.transform = 'none'; // Ensure no transform
         
         // Replace the icon with a more site-appropriate one
         if (remainingPrevArrow.querySelector('i.fa')) {
           remainingPrevArrow.querySelector('i.fa').remove();
         }
         const icon = document.createElement('i');
         icon.className = 'ion-ios-arrow-back';
         icon.style.fontSize = '24px'; 
         icon.style.lineHeight = '1';
         icon.style.display = 'block';
         remainingPrevArrow.appendChild(icon);
       }
       
       // Add a style element to handle additional styling
       const style = document.createElement('style');
       style.textContent = `
         /* Hide "Previous" and "Next" text but keep arrows */
         .main-slider .slick-arrow::before {
           display: none !important;
         }
         
         /* Ensure button appearance is correct */
         .main-slider .slick-arrow {
           width: 44px !important;
           height: 44px !important;
           display: flex !important;
           align-items: center !important;
           justify-content: center !important;
           background-color: #242424 !important;
           border-radius: 0 !important;
           box-shadow: none !important;
           transition: background-color 0.3s ease !important;
           transform: none !important;
           top: 50% !important;
           margin-top: -22px !important;
         }
         
         .main-slider .slick-arrow:hover {
           background-color: #eb3e32 !important;
           transform: none !important;
         }
         
         /* Ensure icons are visible */
         .main-slider .slick-arrow i {
           color: white !important;
           font-size: 22px !important;
         }

         /* Style for slider dots */
         .main-slider .slick-dots {
           bottom: 20px !important;
           z-index: 9 !important;
         }
         
         .main-slider .slick-dots li {
           margin: 0 5px !important;
         }
         
         .main-slider .slick-dots li button:before {
           color: white !important;
           opacity: 0.5 !important;
           font-size: 12px !important;
           width: 12px !important;
           height: 12px !important;
           line-height: 12px !important;
           border-radius: 50% !important;
           background: white !important;
         }
         
         .main-slider .slick-dots li.slick-active button:before {
           color: white !important;
           opacity: 1 !important;
           background: white !important;
         }
       `;
       document.head.appendChild(style);
       
     }, 100); 

     return () => {
       const customStyle = document.querySelector('style[data-slick-custom]');
       if (customStyle) {
         customStyle.parentNode.removeChild(customStyle);
       }
       
       if ($('.main-slider').hasClass('slick-initialized')) {
         $('.main-slider').slick('unslick');
       }
     };
   }, []);

   const handleCategoryClick = (category) => {
     setSelectedCategory(category);
   };

return (
 <div className="uren-slider_area uren-slider_area-2">
 <div className="container-fluid">
    <div className="row">
        <div className="col-xl-9 col-lg-8">
             <div className="main-slider slider-navigation_style-2">
                {/* <!-- Begin Single Slide Area --> */}
                <div className="single-slide animation-style-01 bg-3">
                    <div className="slider-content">
                       <span>New thinking new possibilities</span>
                       <h3>Body &amp; Exterior</h3>
                       <h4>Starting at <span>$99.00</span></h4>
                       <div className="uren-btn-ps_left slide-btn">
                          <Link className="uren-btn" to="/catalog" onClick={() => handleCategoryClick('Body and Exterior')}>Read More</Link>
                       </div>
                    </div>
                </div>
                {/* <!-- Single Slide Area End Here --> */}
                {/* <!-- Begin Single Slide Area --> */}
                <div className="single-slide animation-style-02 bg-4">
                    <div className="slider-content slider-content-2">
                       <span className="primary-text_color">Car, Truck, CUV &amp; SUV</span>
                       <h3>Exhaust System</h3>
                       <h4>Sale up to 20% off</h4>
                       <div className="uren-btn-ps_left slide-btn">
                         <Link className="uren-btn" to="/catalog" onClick={() => handleCategoryClick('Exhaust System')}>Read More</Link>
                       </div>
                    </div>
                </div>
             </div>
        </div>
        <div className="col-xl-3 col-lg-4 d-flex flex-column justify-content-between">
             <div className="row banner-wrap">
                <div className="col-lg-12 col-md-6 mb-3">
                    <div className="slider-banner banner-item img-hover_effect" style={{ height: 'auto', marginTop: '0px' }}>
                       <Link to="/catalog" onClick={() => handleCategoryClick('Wheels and Tires')}>
                          <img className="img-full" src="/images/banner/2-1.jpg" alt="Uren's Banner" style={{ width: '200%', height: '200%', objectFit: 'contain' }} />
                       </Link>
                    </div>
                </div>
                <div className="col-lg-12 col-md-6">
                    <div className="slider-banner-2 banner-item img-hover_effect" style={{ height: 'auto', marginTop: '-10px' }}>
                       <Link to="/catalog"onClick={() => handleCategoryClick('Interior and Comfort')}>
                          <img className="img-full" src="/images/banner/2-2.jpg" alt="Uren's Banner" style={{ width: '200%', height: '300%', objectFit: 'contain' }} />
                       </Link>
                    </div>
                </div>
             </div>
        </div>
    </div>
 </div>
</div>
);
}