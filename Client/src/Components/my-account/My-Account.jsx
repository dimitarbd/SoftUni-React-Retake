import { Link } from "react-router-dom";
import { useAuthcontext } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getOffersByUserId } from "../../api/offers-api";

export default function MyAccount() {
   const { email, userId } = useAuthcontext();
   const [offers, setOffers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchOffers = async () => {
         try {
            console.log('Fetching offers for userId:', userId);
            const userOffers = await getOffersByUserId(userId);
            console.log('Received offers:', userOffers);
            setOffers(userOffers);
         } catch (err) {
            console.error('Error loading offers:', err);
            setError('Failed to load your offers');
         } finally {
            setLoading(false);
         }
      };

      if (userId) {
         fetchOffers();
      }
   }, [userId]);

   const renderRating = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(
            <li key={i} className={i <= rating ? "" : "silver-color"}>
               <i className="ion-android-star"></i>
            </li>
         );
      }
      return stars;
   };
   
   return (
    <>
    {/* <!-- Begin Uren's Breadcrumb Area --> */}
    <div className="breadcrumb-area">
        <div className="container">
            <div className="breadcrumb-content">
                <h2>Other</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li className="active">My Account</li>
                </ul>
            </div>
        </div>
    </div>
    {/* Uren's Breadcrumb Area End Here */}
    {/* Begin Uren's Page Content Area */}
    <main className="page-content">
        {/* Begin Uren's Account Page Area */}
        <div className="account-page-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="nav myaccount-tab-trigger" id="account-page-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="account-dashboard-tab" data-toggle="tab" href="#account-dashboard" role="tab" aria-controls="account-dashboard" aria-selected="true">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="account-offers-tab" data-toggle="tab" href="#account-offers" role="tab" aria-controls="account-offers" aria-selected="false">My Offers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="account-logout-tab" href="login-register.html" role="tab" aria-selected="false">Logout</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="tab-content myaccount-tab-content" id="account-page-tab-content">
                            <div className="tab-pane fade show active" id="account-dashboard" role="tabpanel" aria-labelledby="account-dashboard-tab">
                                <div className="myaccount-dashboard">
                                    <p>Hello <b>{email}</b> (<a href="login-register.html">Sign
                                            out</a>)</p>
                                    <p>From your account dashboard you can view your created offers.</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="account-offers" role="tabpanel" aria-labelledby="account-offers-tab">
                                <div className="myaccount-offers">
                                    <h4 className="small-title">MY OFFERS</h4>
                                    {loading ? (
                                        <p>Loading your offers...</p>
                                    ) : error ? (
                                        <p className="text-danger">{error}</p>
                                    ) : !offers || offers.length === 0 ? (
                                        <p>You haven't created any offers yet.</p>
                                    ) : (
                                        <div className="shop-product-wrap grid gridview-3 img-hover-effect_area row">
                                            {offers.map(offer => (
                                                <div key={offer._id} className="col-lg-4">
                                                    <div className="product-slide_item">
                                                        <div className="inner-slide">
                                                            <div className="single-product">
                                                                <div className="product-img">
                                                                    <Link to={`/catalog/${offer._id}/details`}>
                                                                        <img className="primary-img" src={offer.imageUrl} alt="Uren's Product Image" />
                                                                    </Link>
                                                                </div>
                                                                <div className="product-content">
                                                                    <div className="product-desc_info">
                                                                        <div className="rating-box">
                                                                            <ul>
                                                                                {renderRating(offer.rating)}
                                                                            </ul>
                                                                        </div>
                                                                        <h6><Link className="product-name" to={`/catalog/${offer._id}/details`}>{offer.name}</Link></h6>
                                                                        <div className="price-box">
                                                                            <span className="new-price">${Number(offer.price).toFixed(2)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Uren's Account Page Area End Here */}
    </main>
    {/* Uren's Page Content Area End Here */}
    </>
   );
}