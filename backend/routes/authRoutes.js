const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation.js");
const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt"); //npm i bcrypt
const jwt = require("jsonwebtoken"); //npm i jsonwebtoken
const generateEmbedding = require("../utils/embedding.js");

/* Both means same
app.use("/test", middleWare, (req,res)=>{});
authRouter.use("/test", middleWare, (req,res)=>{});
*/

authRouter.post("/signup", async (req, res) => {
  //Each APIs must follow this steps(1,2) as without this unhandled data can be inserted to the database
  //  and any one can read the data without Encryption
  //1.)Validation of Data
  //2.)Encrypt the password

  try {
    //Validation
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password (npm i bcrypt)
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //Creating new instance(collection) of the User Model
    //const user= new User(req.body); (it takes everything "xyz": "pagal" also)
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const kyaBe = await savedUser.getJWT();

    res.cookie("token", kyaBe, {
      expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
       secure: true,
       sameSite: "none",
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

authRouter.post("/login2", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailId id not present in DB");
    }
    const isPasswordVaild = await bcrypt.compare(password, user.password);
    //OR
    //const isPasswordValid= await user.validatePassword(password);

    if (isPasswordVaild) {
      //Create a JWT Token, but first do-(npm i jsonwebtoken)
      //We can create token by our own also, but JWT gives the best and secure token
      const valueOk = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "1d",
      });

      //OR
      //const token= await user.getJWT();
      //console.log(token);

      //Add the token to cookie and send the response back to the user
      //You can see it in cookies below url bar in Postman UI
      //This cookie will expire in 8hrs
      console.log("we are here at cokies");
      res.cookie("token", valueOk, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });


      res.json({ message: "Login Succesfull:", data: user });
    } else {
      throw new Error("Password id not correct");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout2", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Sucessfull!!");
});


authRouter.get("/search", async (req, res) => {
  try {
    const search = req.query.name;

    if (!search) {
      return res.json([]);
    }

    const trimmedSearch = search.trim().toLowerCase();

    const weakWords = ["i", "want", "need", "a", "an", "the", "with", "for"];

    const meaningfulWords = trimmedSearch
      .toLowerCase()
      .split(" ")
      .filter((word) => !weakWords.includes(word));

    if (meaningfulWords.length === 0) {
      return res.json([]);
    }

    // Check if query looks like a sentence / AI search
    const isSemanticQuery =
       trimmedSearch.split(" ").length > 2;

    // 1. If normal name search, use regex first
    if (!isSemanticQuery) {
      const normalUsers = await User.find({
        $or: [
          {
            firstName: {
              $regex: trimmedSearch,
              $options: "i",
            },
          },
          {
            lastName: {
              $regex: trimmedSearch,
              $options: "i",
            },
          },
        ],
      }).limit(5);

      if (normalUsers.length > 0) {
        return res.json(normalUsers);
      }
    }

    // 2. If sentence-like query OR normal search found nothing, use AI semantic search
    const queryEmbedding = await generateEmbedding(trimmedSearch);



    const semanticUsers = await User.aggregate([
      {
        $vectorSearch: {
          index: "userVectorIndex",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 10,
        },
      },
      {
        $addFields: {
          score: { $meta: "vectorSearchScore" },
        },
      },
      {
        $match: {
          score: { $gte: 0.82 },
        },
      },
      {
        $limit: 5,
      },
    ]);


    res.json(semanticUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = authRouter;
