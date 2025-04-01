// import { useState, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { useGetOnePart } from "../../hooks/useParts";
import { useForm } from "../../hooks/useForm";
import { useCreateComment, useGetAllComments } from "../../hooks/useComments";
import { useAuthcontext } from "../../contexts/AuthContext";

const initialValues = {
    text: '',
    rating: 1,
    currentDate: ''
};


export default function PartDetails() {
    const { partId } = useParams();
    const [comments, setComments] = useGetAllComments(partId);
    const createComment = useCreateComment();
    const [part] = useGetOnePart(partId);
    const { isAuthenticated } = useAuthcontext();
    const {
        changeHandler,
        submitHandler,
        values,
    } = useForm(initialValues, async ({text, rating}) => {
        try {
            const currentDate = new Date().toLocaleDateString('en-GB').split('/').map((part, index) => index === 2 ? part.slice(-2) : part).join('/');
            const newComment = await createComment(partId, text, rating, currentDate); 
            console.log('New Comment:', newComment);
            // Assuming createComment returns the created comment
            // Update the comments state with the new comment

            setComments(oldComments => [...oldComments, newComment]);

        } catch (error) {
            console.error("Error creating comment:", error);
        }
        // const newComment = createComment(partId, values.email, values.comment, values.rating, currentDate);

        // setPart((prevState) => ({
        //     ...prevState,
        //     comments: {
        //         ...prevState.comments,
        //         [newComment._id]: newComment
        //     }
        // }));

        // setValues(initialValues);
    }
    );


    // const [part, setPart] = useGetOnePart(partId);
    // const [email, setEmail] = useState('');
    // const [comment, setComment] = useState('');
    // const [rating, setRating] = useState(1);

    // const CommentSubmitHandler = async (e) => {
    //     e.preventDefault();

    //     const currentDate = new Date().toLocaleDateString('en-GB').split('/').map((part, index) => index === 2 ? part.slice(-2) : part).join('/');

    //     const newComment = await commentsApi.create(partId, email, comment, rating, currentDate);

    //     setPart((prevState) => ({
    //         ...prevState,
    //         comments: {
    //             ...prevState.comments,
    //             [newComment._id]: newComment
    //         }
    //     }));

    //     setEmail('');
    //     setComment('');
    //     setRating(1);
    // }

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

    console.log('Comments:', comments);

    return (
        <>
            {/* <!-- Begin Uren's Breadcrumb Area --> */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2>Product Details</h2>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Single Product</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <!-- Uren's Breadcrumb Area End Here --> */}

            {/* <!-- Begin Uren's Single Product Area --> */}
            <div className="sp-area">
                <div className="container-fluid">
                    <div className="sp-nav">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="sp-img_area">
                                    <div className="sp-img_slider slick-img-slider uren-slick-slider" data-slick-options='{
                                "slidesToShow": 1,
                                "arrows": false,
                                "fade": true,
                                "draggable": false,
                                "swipe": false,
                                "asNavFor": ".sp-img_slider-nav"
                                }'>
                                        <div className="single-slide red zoom">
                                            <img src={part.imageUrl} alt="Uren's Product Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="sp-content">
                                    <div className="sp-heading">
                                        <h5><a href="#">{part.title}</a></h5>
                                    </div>
                                    <div className="rating-box">
                                        <ul>
                                            {renderRating(part.rating)}
                                        </ul>
                                    </div>
                                    <div className="sp-essential_stuff">
                                        <ul>
                                            <li>Brands <button className="btn-link">{part.brand}</button></li>
                                            <li>Stock: <button className="btn-link">{part.quantity} pieces</button></li>
                                            <li>Price: <button className="btn-link">${Number(part.price).toFixed(2)}</button></li>
                                            <li>Year: <button className="btn-link">{part.year}</button></li>
                                        </ul>
                                    </div>
                                    <div className="quantity">
                                        <label>Quantity</label>
                                        <div className="cart-plus-minus">
                                            <input className="cart-plus-minus-box" defaultValue="1" type="text" />
                                            <div className="dec qtybutton"><i className="fa fa-angle-down"></i></div>
                                            <div className="inc qtybutton"><i className="fa fa-angle-up"></i></div>
                                        </div>
                                    </div>
                                    <div className="qty-btn_area">
                                        <ul>
                                            <li><a className="qty-cart_btn" href="cart.html">Add To Cart</a></li>
                                            {isAuthenticated &&
                                                <li><Link className="qty-edit_btn uren-btn_dark d-flex align-items-center" to={`/catalog/${partId}/edit`}>
                                                    <i className="fa fa-edit" style={{ marginRight: '5px' }}></i> <span>Edit Part</span>
                                                </Link></li>
                                            }
                                            <li><a className="qty-wishlist_btn" href="wishlist.html" data-toggle="tooltip" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></a>
                                            </li>
                                            <li><a className="qty-compare_btn" href="compare.html" data-toggle="tooltip" title="Compare This Product"><i className="ion-ios-shuffle-strong"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="uren-tag-line">
                                        <h6>Category:</h6>
                                        <a href="#" onClick={(e) => e.preventDefault()}>{part.category}</a>
                                    </div>
                                    <div className="uren-social_link">
                                        <ul>
                                            <li className="facebook">
                                                <a href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook">
                                                    <i className="fab fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li className="twitter">
                                                <a href="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                                                    <i className="fab fa-twitter-square"></i>
                                                </a>
                                            </li>
                                            <li className="youtube">
                                                <a href="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                                                    <i className="fab fa-youtube"></i>
                                                </a>
                                            </li>
                                            <li className="google-plus">
                                                <a href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus">
                                                    <i className="fab fa-google-plus"></i>
                                                </a>
                                            </li>
                                            <li className="instagram">
                                                <a href="https://rss.com/" data-toggle="tooltip" target="_blank" title="Instagram">
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Uren's Single Product Area End Here */}

            {/* Begin Uren's Single Product Tab Area */}
            <div className="sp-product-tab_area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="sp-product-tab_nav">
                                <div className="product-tab">
                                    <ul className="nav product-menu">
                                        <li><a className="active" data-toggle="tab" href="#description"><span>Description</span></a>
                                        </li>
                                        <li><a data-toggle="tab" href="#reviews"><span>Reviews ({comments.length})</span></a></li>
                                    </ul>
                                </div>
                                <div className="tab-content uren-tab_content">
                                    <div id="description" className="tab-pane active show" role="tabpanel">
                                        <div className="product-description">
                                            <span>{part.description}</span>
                                        </div>
                                    </div>
                                    <div id="reviews" className="tab-pane" role="tabpanel">
                                        <div className="tab-pane active" id="tab-review">
                                            <form className="form-horizontal" id="form-review" onSubmit={submitHandler}>
                                                <div id="review">
                                                    <table className="table table-striped table-bordered">
                                                        {comments.map(comment => (
                                                            <tbody key={comment._id}>
                                                                <tr>
                                                                    <td style={{ width: '50%' }}><strong>{comment.author.email}</strong></td>
                                                                    <td className="text-right">{comment.currentDate}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2">
                                                                        <p>{comment.text}</p>
                                                                        <div className="rating-box">
                                                                            <ul>
                                                                                {renderRating(comment.rating)}
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ))
                                                        }
                                                        {comments.length === 0 &&
                                                            <tbody>
                                                                <tr>
                                                                    <td colSpan="2">There are no reviews for this product.</td>
                                                                </tr>
                                                            </tbody>
                                                        }
                                                    </table>
                                                </div>
                                                {isAuthenticated && (
                                                    <div className="review-box">
                                                        <h2>Write a review</h2>
                                                        <div className="form-group required">
                                                        </div>
                                                        <div className="form-group required second-child">
                                                            <div className="col-sm-12 p-0">
                                                                <label className="control-label">
                                                                    Share your opinion
                                                                </label>

                                                                <textarea
                                                                    className="review-textarea"
                                                                    type="text"
                                                                    name="text"
                                                                    id="text"
                                                                    onChange={changeHandler}
                                                                    value={values.text}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="form-group last-child required">
                                                            <div className="col-sm-12 p-0">
                                                                <div className="your-opinion">
                                                                    <label>Your Rating</label>
                                                                    <span>
                                                                        <select
                                                                            className="star-rating"
                                                                            type="rating"
                                                                            name="rating"
                                                                            id="rating"
                                                                            onChange={changeHandler}
                                                                            value={values.rating}
                                                                        >
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                        </select>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="uren-btn-ps_right">
                                                                <button className="uren-btn-2">Continue</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {!isAuthenticated && (
                                                    <div className="review-box">
                                                        <h6>To leave a review, please <Link to="/login">log in</Link></h6>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Uren's Single Product Tab Area End Here --> */}

        </>
    );
}
