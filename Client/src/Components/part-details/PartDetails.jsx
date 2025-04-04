import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { useGetOnePart } from "../../hooks/useParts";
import { useForm } from "../../hooks/useForm";
import { useCreateComment, useDeleteComment, useGetAllComments } from "../../hooks/useComments";
import { useAuthcontext } from "../../contexts/AuthContext";
import commentsAPI from "../../api/comments-api";
import partsAPI from "../../api/parts-api";

const initialValues = {
    text: '',
    rating: 1,
    currentDate: ''
};


export default function PartDetails() {
    const { partId } = useParams();
    const [comments, setComments] = useGetAllComments(partId);
    const navigate = useNavigate();

    const createComment = useCreateComment();
    const deleteComment = useDeleteComment();
    const [part] = useGetOnePart(partId);
    const { isAuthenticated, userId } = useAuthcontext();
    const {
        changeHandler,
        submitHandler,
        resetForm, // Destructure resetForm
        values,
    } = useForm(initialValues, async ({ text, rating }) => {
        try {
            const currentDate = new Date()
                .toLocaleDateString('en-GB')
                .split('/')
                .map((part, index) => (index === 2 ? part.slice(-2) : part))
                .join('/');
            // Create the new comment
            const newComment = await createComment(partId, text, rating, currentDate);

            // Fetch the updated comments directly from the API
            const updatedComments = await commentsAPI.getAll(partId);
            setComments(updatedComments);

            // Reset the form values to initial state
            resetForm();
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    });

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
            // Update the comments list after deletion
            const updatedComments = await commentsAPI.getAll(partId);
            setComments(updatedComments);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleEditComment = (commentId, text, rating) => {
        // Implement your edit comment functionality here
        console.log("Edit comment:", commentId, text, rating);
        // This is just a placeholder - you'll need to implement the actual edit logic
    };

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

    const partDeleteHandler = async () => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this part?');
            if (!confirmDelete) {
                return; 
            }
            const response = await partsAPI.del(partId);
            navigate('/catalog');
        } catch (err) {
            console.error('Delete error details:', err);
            // If the error object has a response property (common with axios)
            if (err.response) {
                console.error('Status:', err.response.status);
                console.error('Error data:', err.response.data);
                if (err.response.status === 403) {
                    alert('You are not authorized to delete this part.');
                }
            }
        }
    }

    const isOwner = part._ownerId === userId;

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
                                            {isOwner &&
                                                <li><Link className="qty-edit_btn uren-btn_dark d-flex align-items-center" to={`/catalog/${partId}/edit`}>
                                                    <i className="fa fa-edit" style={{ marginRight: '5px' }}></i> <span>Edit Part</span>
                                                </Link></li>

                                            }
                                            {isOwner &&
                                                <li><a href="#" className="qty-edit_btn uren-btn_dark d-flex align-items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent default anchor behavior
                                                        partDeleteHandler();
                                                    }}>
                                                    <i className="fa fa-trash" style={{ marginRight: '5px' }}></i> <span>Delete</span>
                                                </a></li>

                                            }

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
                                                                        <div className="rating-box d-flex justify-content-between align-items-center">
                                                                            <ul className="d-flex">
                                                                                {renderRating(comment.rating)}
                                                                            </ul>
                                                                            {/* Add Edit and Delete Buttons */}
                                                                            {isAuthenticated && comment.author._id === userId && (
                                                                                <div className="comment-actions d-flex">
                                                                                    <button
                                                                                        className="uren-btn uren-btn_sm uren-btn-bondi_blue"
                                                                                        onClick={() => handleEditComment(comment._id, comment.text, comment.rating)}
                                                                                        style={{ marginRight: '10px' }}
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                    <button
                                                                                        className="uren-btn uren-btn_sm uren-btn_dark"
                                                                                        onClick={() => handleDeleteComment(comment._id)}
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </div>
                                                                            )}
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
