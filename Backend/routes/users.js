// routes/users.js

const router = require("express").Router();

const User = require("../models/User");

const auth = require("../middleware/auth");

const { syncSchema } = require("../validations/userValidation");



router.post("/sync", auth , async (req, res) => {
  console.log("================================");
  console.log("SYNC REQUEST RECEIVED");
  console.log(req.body);

  const parsed = syncSchema.safeParse(req.body)
  if(!parsed.success){
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: parsed.error.errors,
    })
  }
  try {
    console.log("Auth payload:", req.auth.sub);
    const {
      email,
      firstName,
      lastName,
      profileImageUrl,
    } = req.body;


    let user = await User.findOne({
      clerkId: req.auth.sub,
    });
    
    if(!user){
      user = await User.create({
        clerkId:req.auth.sub,
        email,
        firstName,
        lastName,
      })
    }

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User synced successfully",
      user,
    })


  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;