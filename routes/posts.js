const express = require("express");
const PostModel = require("../models/Post");
const { POST_SAVE_SUCCESS } = require("../utils/constants");
const Constants = require("../utils/constants");
const { generateId, generateSlug, createApiResponse } = require("../utils/utils");

const router = express.Router();

router.get("/:id/view", async (req, res) => {
  const postId = req.params.id;

  // First check if post exists with slug
  let post = await PostModel.findOne({ slug: postId }).exec();

  // If not post is found with slug check using postId
  if (!post) {
    post = await PostModel.findOne({ postId }).exec();
  }

  if (post) {
    res.status(200).json(createApiResponse(post, true, Constants.POST_FETCH_SUCCESS));
  } else {
    res.status(404).json(createApiResponse(post, false, Constants.POST_NOT_FOUND(postId)));
  }
});

router.get("/view/all", async (req, res) => {
  let post = await PostModel.find().exec();

  if (post) {
    res.status(200).json(createApiResponse(post, true, Constants.ALL_POSTS_FETCH_SUCCESS));
  } else {
    res.status(404).json(createApiResponse(null, false, Constants.NO_POSTS_FOUND));
  }
});

router.post("/save", async (req, res) => {
  const body = req.body;
  const currentTimestamp = Date.now();
  
  try {
    const post = new PostModel({
      postId: generateId(),
      title: body.title,
      body: body.body,
      author: body.author,
      createdAt: currentTimestamp,
      lastModified: currentTimestamp,
      slug: generateSlug(body.title),
    });
    const savedPost = await post.save();
    res.status(200).json(createApiResponse(savedPost, true, Constants.POST_SAVE_SUCCESS));
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json(createApiResponse(null, false, Constants.POST_SAVE_FAILURE));
      return;
    }
    res.status(500).json(createApiResponse(null, false, Constants.SERVER_ERROR));
  }
});

router.put("/:id/edit", async (req, res) => {
  const postId = req.params.id;
  const filter = { postId };
  const body = req.body;

  const updatedPost = {
    ...body,
    lastModified: Date.now(),
  };

  if (body.title) {
    updatedPost.slug = generateSlug(body.title);
  }

  let post = await PostModel.findOneAndUpdate(filter, updatedPost, { new: true }).exec();

  if (post) {
    res.status(200).json(createApiResponse(post, true, Constants.POST_SAVE_SUCCESS));
  } else {
    res.status(404).json(createApiResponse(null, false, Constants.POST_NOT_FOUND(postId)));
  }
});

router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const filter = { postId };
  const post = await PostModel.findOneAndDelete(filter).exec();

  if (post) {
    res.status(200).json(createApiResponse(post, true, Constants.POST_SAVE_SUCCESS));
  } else {
    res.status(404).json(createApiResponse(post, false, Constants.POST_NOT_FOUND(postId)));
  }
});

module.exports = router;
