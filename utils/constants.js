const { post } = require("../routes/posts");

const Constants = {
  POST_NOT_FOUND: (postId) => `Post with id ${postId} not found.`,
  NO_POSTS_FOUND: "No posts found.",
  POST_SAVE_SUCCESS: "Post saved successfully.",
  POST_SAVE_FAILURE: "There was an error saving your post.",
  POST_FETCH_SUCCESS: "Post fetched successfully.",
  ALL_POSTS_FETCH_SUCCESS: "All posts fetched successfully.",
  POST_FETCH_FAILURE: (postId) => `Error fetching post with id ${postId}.`,
  ALL_POSTS_FETCH_FAILURE: `Error fetching all posts.`,
  SERVER_ERROR: "Oops...something went wrong. Please check back at a later time.",
};

module.exports = Constants;
