const express = require('express');
const cors =require("cors");
const multer=require('multer');
const path=require('path');
require('./db/config');
const User=require('./db/model/User');
const Course=require("./db/model/AddCourse");
const Schedulelec=require('./db/model/Schedulelec');
const app=express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req,res)=>{
  try {
    // checks if user doesnt enter any data:
    const {name,email,password}=req.body;
    if(!name || !email || !password){
      return res.status(400).send({ error: "All fields are required!"});
       }

    // checks if user exist:
    const userExist= await User.findOne({email});
    if(userExist){
      return res.status(400).send({ error: "User already exists with this email" });
    }

    // if user doesnt exist:
    const user=new User({ name, email, password });
    const result=await user.save();
    res.status(201).send(result);
    
  } catch (error) {
    res.status(500).send({ error: "Something went wrong", details: error.message });
  }
});

// update instructor:
app.put("/updateInstructor/:id",async(req,res)=>{
  try {
   const {name,email,password}=req.body;
    const update={name,email,password}

    const updatedInstructor=await User.findByIdAndUpdate(req.params.id,
      update,
      {new:true});
    if (!updatedInstructor){
            return res.status(404).json({message:"Instructor not found"});
              }        
    res.json(updatedInstructor);
  } 
  catch (error) {
    console.error(error);
      res.status(500).json({ message: 'Error adding course' });
  } 

});

app.get("/getInstructorbyId/:id",async(req,res)=>{
  try {
    const findInstructor=await Course.findById(req.params.id);
    res.send(findInstructor);
  } catch (error) {
    console.log(error)
  }
})

app.delete("/deleteInstructor/:id",async(req,res)=>{
  try {
    const deleteInstructor=await Course.findByIdAndDelete(req.params.id);
  if(!deleteInstructor){
    return res.status(404).json({message:"Error"})
  }
  res.status(200).json({message:'Instructor deleted successfully'})
  } catch (error) {
    console.error('Delete error:', err);
        res.status(500).json({ message: 'Error deleting course' });
  }
})

// app.get("/login", async (req,res)=>{
//   console.log(req.body);
//   if(req.body.name && req.body.password){
//   let user= await User.findOne(req.body);
//    if(user){
//       res.send(user)
//     }
//     else{
//       res.send({result:"No user found"})
//     }
//   }
//   else{
//     res.send({result:"No user found"})
//   }
// });


app.post("/login", async (req, res) => {
  
  if (req.body.name && req.body.password) {
    let user = await User.findOne({ name: req.body.name, password: req.body.password });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ result: "No user found" });
    }
  } else {
    res.status(400).send({ result: "Incomplete login credentials"});
  }
});
//get login data:
app.get("/getlogin",async(req,res)=>{
  try {
    const users= await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
  }
})

app.get("/users", async (req, res) => {
  try {
    // Retrieve all users but only select the `name` field
    const users = await User.find({}, 'name'); // second argument specifies to fetch only the `name` field
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong", details: error.message });
  }
});

app.get("/users/:instructor", async (req, res) => {
  try {
    // Retrieve all users but only select the `name` field
    const instructorname=req.params.instructor;
    const users = await Schedulelec.find({instructor:instructorname}); // second argument specifies to fetch only the `name` field
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong", details: error.message });
  }
});


const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null,'assets/Images')
  },
  filename:(req,file,cb)=>{
    cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})

const upload =multer({
  storage:storage
})

app.use(express.static('assets'));


//add courses:
app.post("/addcourse",upload.single('image'),async(req,res)=>{
// console.log(req.body);
// console.log(req.file);
try{
  const {name,level,description}=req.body;
  // const imageUrl = req.file
  //     ? `${req.protocol}://${req.get('host')}/Images/${filename}`
  //     : '';
  //  console.log(imageUrl)
  const course=new Course({
    name,
    level,
    description,
    image:req.file.filename
  });

  const savedCourse=await course.save();
  res.json(savedCourse);
}
catch(error){
  console.error(error);
        res.status(500).json({ message: 'Error adding course' });
}
});
//

//get course data:
app.get("/getcourse",async(req,res)=>{
  try {
    const course= await Course.find({});
    res.send(course);
  } catch (error) {
    console.log(error);
  }
})

//get course by id:
app.get("/getcourse/:id",async(req,res)=>{
   
    try {
      const findCourse=await Course.findById(req.params.id);
      res.send(findCourse);
    } catch (error) {
      console.log(error);
    }
})

//update course:
app.put("/updatecourse/:id",upload.single('image'),async(req,res)=>{
console.log(req.body);
console.log(req.file);
try{
  const {name,level,description}=req.body;
  const update={
    name,level,description
  }
  
  if(req.file) update.image=req.file.filename;

  const updatedcourse=await Course.findByIdAndUpdate(
    req.params.id,
  update,
{new:true}
);
if (!updatedcourse){
  return res.status(404).json({message:"Course not found"});
}

res.json(updatedcourse);
}
catch(error){
  console.error(error);
        res.status(500).json({ message: 'Error adding course' });
}
});

//delete course by id:
app.delete("/deletecourse/:id",async(req,res)=>{
  try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // // Delete the image file from the file system
        // if (course.image) {
        //     const imagePath = path.join(__dirname, '..', 'Images', course.image); // adjust if your path is different
        //     if (fs.existsSync(imagePath)) {
        //         fs.unlinkSync(imagePath);
        //     }
        // }

       // await Course.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Error deleting course' });
    }

})

//lec schedule api:
app.post('/schedulelec',async(req,res)=>{
  try{
    let schedulelec=new Schedulelec(req.body);
    if(!schedulelec.instructor||!schedulelec.date||!schedulelec.course||!schedulelec.lec||!schedulelec.location){
      return res.status(404).send({ message: "All fields are required!" });
    }
    let sameDate=await Schedulelec.findOne({instructor:schedulelec.instructor, date:schedulelec.date});
    if(sameDate){
      res.status(404).send({message:"Select diff date for instructor lec"})
    }
    else{
      let result=await schedulelec.save();
      res.status(200).send(result);  
    }
      }
catch(error){
  res.status(500).send({ error: "Something went wrong", details: error.message });
}  
})

app.get("/getschedulelec/:course",async(req,res)=>{
     try{
    const course = req.params.course; // Get course from URL
    const lec = await Schedulelec.find({ course: course });
    // const lec=await Schedulelec.findOne({course:req.body.course});
     if(lec) {
      res.send(lec);
    }
     else{
      res.status(404).send({ result: "No course found" });
     }
     }catch(error){
      console.log(error);
     }
})

app.put("/updatelec/:id",async(req,res)=>{
  try {
    const update={instructor,date,course,lec,location}

    const updateLec=await Schedulelec.findByIdAndUpdate(req.params.id,update,{new:true});
    if(!updateLec){
      return res.status(404).json({message:"Lecture not found"})
    }
    res.json(updateLec);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Error'})
  }
})

app.delete("/deletelec/:id",async(req,res)=>{
  try {
    const deleteLec=await Schedulelec.findByIdAndDelete(req.params.id);
    if(!deleteLec){
            return res.status(404).json({ message: 'Lecture not found' });

    }
    res.status(200).json({message:'Lecture deleted successfully'})
  } catch (error) {
    console.error('Delete error:', err);
        res.status(500).json({ message: 'Error deleting course' });
  }
})

//get lec by id:
app.get("/getLec/:id",async(req,res)=>{
   
    try {
      const findLec=await Schedulelec.findById(req.params.id);
      res.send(findLec);
    } catch (error) {
      console.log(error);
    }
})

app.get("/",(req,res)=>{
  res.send("App is working!!");
});

app.listen(5000);
