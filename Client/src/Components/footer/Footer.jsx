import { Link } from 'react-router-dom'

export default function Footer() {
   return (
    <div className="uren-footer_area">
       <div className="footer-middle_area">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4">
                    <div className="footer-widgets_info">
                        <div className="footer-widgets_logo">
                            <Link to="#">
                                <img src="/images/menu/logo/1.png" alt="Uren's Footer Logo"/>
                            </Link>
                        </div>
                        <div className="widget-short_desc">
                            <p>We are a team of designers and developers that create high quality HTML Template &
                                Woocommerce, Shopify Theme.
                            </p>
                        </div>
                        <div className="widgets-essential_stuff">
                            <ul>
                                <li className="uren-address"><span>Address:</span> The Barn,
                                    Ullenhall, Henley
                                    in
                                    Arden B578 5CC, England</li>
                                <li className="uren-phone"><span>Call
                                Us:</span> <Link to="tel://+123123321345">+123 321 345</Link>
                                </li>
                                <li className="uren-email"><span>Email:</span> <Link to="mailto://info@yourdomain.com">info@yourdomain.com</Link></li>
                            </ul>
                        </div>
                        <div className="uren-social_link">
                            <ul>
                                <li className="facebook">
                                    <Link to="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook">
                                        <i className="fab fa-facebook"></i>
                                    </Link>
                                </li>
                                <li className="twitter">
                                    <Link to="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                                        <i className="fab fa-twitter-square"></i>
                                    </Link>
                                </li>
                                <li className="google-plus">
                                    <Link to="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus">
                                        <i className="fab fa-google-plus"></i>
                                    </Link>
                                </li>
                                <li className="instagram">
                                    <Link to="https://rss.com/" data-toggle="tooltip" target="_blank" title="Instagram">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                   
                </div>
            </div>
        </div>
    </div>    
</div>
   );
}