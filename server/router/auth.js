import express from "express"
import UserDetails from "../model/userDetails.js";
const router = express.Router();
import bcrypt from "bcryptjs"

router.get("/",(req,res)=>{
    res.send("Hiiiii")
})

router.post("/register",async(req,res)=>{
    let {userName,email,password,confirmPassword} = req.body;
    if(!userName || !email  || !password || !confirmPassword)
    {
        res.status(400).json({message:"Please fill the required details"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try
    {
        const userExist =await UserDetails.findOne({email:email});
        if(userExist)
        {
            console.log(userExist);
            return res.status(422).json({message:"User alredy Exists"})
        }
        if(password !== confirmPassword)
        {
            return res.status(422).json({message:"Password Mismatch"})
        }
        const user = new UserDetails({
            userName:userName,
            email:email,
            password:hashedPassword,
            confirmPassword:hashedPassword,
        });

        await user.save();
        res.send("Posted")
    }
    catch(e)
    {
        res.status(500).json({message:e.message})
    }

})


router.post("/login",async(req,res)=>{

    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json({message:"Invalid Login Credentials"})
    }
    try
    {
        
        const userExist = await UserDetails.findOne({email:email});
        if(!userExist)
        {
           return res.status(400).json({message:"User not exists"})
        }
    
        // const matchedPass = (userExist.password === password);
        const matchedPass = await bcrypt.compare(password,userExist.password);
        console.log(matchedPass)
        // const token = await userExist.generateAuthenticationToken();
        // console.log(token);
        // //storing the token in cookie
        // const storeToken = await res.cookie("jwtToken",token,{
        //     expires: new Date(Date.now()+3600000),
        //     httpOnly:true
        // });
        

        // matchedPass ? res.status(200).json({jwtToken:token}) : res.status(400).send("Invalid Password")
        if(matchedPass)
            res.status(200).send(userExist)
        else
            res.status(403).send("Please check the login credentials")
    }
    catch(e)
    {
        console.log(e);
    }
})

//update an user 
router.put("/:id",async(req,res)=>{
    const {id} = req.params;
    // const {userId,password} = req.body;
    if(req.body.userId === id || req.body.isAdmin)
    {
        if(req.body.password)
        {
            try
            {
                const salt=await bcrypt.genSalt(10);              
                req.body.password = await bcrypt.hash(req.body.password,salt);
                
                // res.status(200).json({message:"Password Updated"})
            }
            catch (err) {
                return res.status(500).send(err);
              }
        }
        try
        {
            const user =await UserDetails.findByIdAndUpdate(id,{$set:req.body})
            res.status(200).json("Account has been updated");
        }
        catch (err) {
            return res.status(500).json(err);
          }
    }
    else {
        return res.status(403).json("You can update only your account!");
      }
})


//delete a user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await UserDetails.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });


  //get user data
router.get("/:id",async(req,res)=>{
    try
    {
        const user = await UserDetails.findById(req.params.id);
        // const {password,...other} = user._doc;
        console.log(user);
        res.status(200).send(user);
    }
    catch(e)
    {
        res.status(500).json({message:e})
    }
})

//follow a user
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId !== req.params.id)
    {
        try
        {
            const user = await UserDetails.findById(req.params.id);
            const currentUser = await UserDetails.findById(req.body.userId)
            if(user.followers.includes(req.body.userId))
            {
                res.status(403).json("You are already following this person")
            }
            else
            {
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("User has been followed")
            }
        }
        catch(e)
        {
            res.status(500).json(e)
        }
    }
    else
    {
        res.status(403).send("You can't follow yourself")
    }
})


//unfollow a user
router.put("/:id/unfollow",async(req,res)=>{
    console.log(req.body.userId !== req.params.id)
    if(req.body.userId !== req.params.id)
    {
        console.log("hi")
        try
        {
           
            const user = await UserDetails.findById(req.params.id);
            const currentUser = await UserDetails.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId))
            {
                res.status(403).json("You are not following this person")
            }
            else
            {
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("User has been unfollowed")
            }
        }
        catch(e)
        {
            res.status(500).json(e)
        }
    }
    else
    {
        res.status(403).send("You can't unfollow yourself")
    }
})



//get friends of user
router.get("/friends/:userId",async(req,res)=>{
    try
    {
        const user =await UserDetails.findById(req.params.userId);
        
        const friends = await Promise.all(
            user.followings.map(friendId=>{
                return UserDetails.findById(friendId)
            })
        )
        
        let friendList = [];
        friends.map(friend=>{
            return friendList.push({_id:friend._id,userName:friend.userName,profileImg:friend.profileImg})
        })
        // console.log(friendList)
        res.status(200).send(friendList)
    }
    catch(e)
    {
        res.status(500).json(e)
    }
})


//get  all users
router.get("/users/all",async(req,res)=>{
    try
    {
        const allUsers = await UserDetails.find()
        // const allUserNames = await Promise.all(allUsers.map(eachUser=>eachUser.userName))
        res.status(200).send(allUsers)
    }
    catch(e)
    {
        res.status(500).send(e)
        console.log(e)
    }
})

export default router;