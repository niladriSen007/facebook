import express from "express"
import PostDetails from "../model/PostDetails.js";
import UserDetails from "../model/userDetails.js"
const router = express.Router();

//create a post
router.post("/",async(req,res)=>{
    try{
        const newPost = new PostDetails(req.body);
        console.log(newPost)
        const savedPost = await newPost.save(); 
        console.log(savedPost)
        res.status(200).send(savedPost)
    }
    catch(e)
    {
        res.status(500).json(e)
    }
})

//update a post
router.put("/:id",async(req,res)=>{
    try
    {
        // console.log("Hi")
        const post = await PostDetails.findById(req.params.id);
        if(post.userId === req.body.userId)
        {
            const updatedPost = await PostDetails.updateOne({$set:req.body});
            res.status(200).json(updatedPost);
        }
        else
        {
            res.status(403).json("you can update only your post");
        }
    }
    catch(e)
    {
        res.status(500).send(e);
    }
})


	//delete a post

    router.delete("/:id/delete", async (req, res) => {
        try {
          const post = await PostDetails.findById(req.params.id);
          if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
          } else {
            res.status(403).json("you can delete only your post");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      });

//like or dislike a post
router.put("/:id/like",async(req,res)=>{
    try
    {
            const post = await PostDetails.findById(req.params.id);
            // console.log(post.userId)
            // console.log(post)
            if(post.likes.includes(req.body.userId))
            {
                // console.log("Hi")
                await post.updateOne({$pull:{likes:req.body.userId}})
                res.status(200).json("Post has been disliked")
            }
            else
            {
                // console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
                const updatePost = await post.updateOne({$push:{likes:req.body.userId}})
                // console.log(post)
                res.status(200).json("Post has been liked")
            }
        
    }
    catch(e)
    {
        res.status(500).json(e)
    }
})


	//get a post

    router.get("/:id", async (req, res) => {
        try {
          const post = await PostDetails.findById(req.params.id);
          res.status(200).json(post);
        } catch (err) {
          res.status(500).json(err);
        }
      });


//fetch all posts
router.get("/timeline/:userId",async(req,res)=>{
  try
  {

    const user = await UserDetails.findById(req.params.userId);
    const userPosts = await PostDetails.find({userId:user._id})
    const friendsPost = await Promise.all(
      user.followings.map(friendId=>PostDetails.find({userId:friendId}))
    )
    res.status(200).json(userPosts.concat(...friendsPost))
  }
  catch(e)
  {
    res.status(500).json(e)
  }
})    


//get indivitual user post
router.get("/profile/:userId",async(req,res)=>{
  try
  {

    const userPosts = await PostDetails.find({userId:req.params.userId})
    // console.log(req.params.id)
    res.status(200).json(userPosts)
  }
  catch(e)
  {
    res.status(500).json(e)
  }
})  


export default router;