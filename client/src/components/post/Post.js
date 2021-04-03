import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import {Link} from 'react-router-dom'
import PostItem from '../posts/PostItem'
import Spinner from "../layout/Spinner";
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { loading, post }, match }) => {
useEffect(()=>{
  getPost(match.params.id)
},[getPost])

  return loading || post===null?(<Spinner></Spinner>) :( <Fragment>
      <Link to="/posts" className="btn btn-dark">Retour</Link>
      <PostItem  post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id}></CommentForm>
      <div className="comments">

      {post.comments.map(comment=>(<CommentItem  key={comment._id} comment={comment} postId={post._id}></CommentItem>))}

      </div>
    
      </Fragment>)


};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post:PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
