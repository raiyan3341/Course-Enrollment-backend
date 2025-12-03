const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Course = require("./models/Course"); 

dotenv.config();

const DEMO_VIDEO_URLS = [
    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", 
    "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    "https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", 
];


const courses = [
  {
    title: "Full Stack Web Development",
    instructor: "John Doe",
    price: 99,
    rating: 4.8,
    duration: "12 weeks",
    category: "Web Development",
    image: "https://static.vecteezy.com/system/resources/previews/000/271/024/non_2x/vector-web-development-web-banner.jpg",
    description: "Learn MERN stack (MongoDB, Express, React, Node.js) and build scalable full-stack web applications.",
    lessons: [
        { title: "Introduction to Full Stack", contentUrl: DEMO_VIDEO_URLS[0], duration: "10 min" },
        { title: "Node.js Basics & Setup", contentUrl: DEMO_VIDEO_URLS[1], duration: "15 min" },
        { title: "React Components Deep Dive", contentUrl: DEMO_VIDEO_URLS[2], duration: "20 min" },
        { title: "State Management with Redux", contentUrl: DEMO_VIDEO_URLS[0], duration: "25 min" },
        { title: "Final Project Planning", contentUrl: DEMO_VIDEO_URLS[1], duration: "5 min" },
    ]
  },
  {
    title: "Cybersecurity Fundamentals",
    instructor: "Sarah Khan",
    price: 120,
    rating: 4.9,
    duration: "10 weeks",
    category: "Cybersecurity",
    image: "https://i.ytimg.com/vi/Gg_cwHFy9h0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDUU2dvWWlYvTgKs54HKESXy8I3pg",
    description: "Master the fundamentals of network security, ethical hacking, and data protection strategies.",
    lessons: [
        { title: "What is Cyber Security?", contentUrl: DEMO_VIDEO_URLS[0], duration: "12 min" },
        { title: "Network Security Protocols", contentUrl: DEMO_VIDEO_URLS[1], duration: "18 min" },
        { title: "Ethical Hacking: Phase 1", contentUrl: DEMO_VIDEO_URLS[2], duration: "25 min" },
    ]
  },
  {
    title: "Data Science with Python",
    instructor: "David Lee",
    price: 149,
    rating: 4.7,
    duration: "16 weeks",
    category: "Data Science",
    image: "https://cdn.pixabay.com/photo/2020/03/19/08/59/data-4947701_1280.jpg",
    description: "In-depth course on data manipulation, analysis, and machine learning using Python.",

    lessons: [
        { title: "Python Setup for Data Science", contentUrl: DEMO_VIDEO_URLS[2], duration: "10 min" },
        { title: "Introduction to Pandas", contentUrl: DEMO_VIDEO_URLS[0], duration: "15 min" },
        { title: "Data Visualization with Matplotlib", contentUrl: DEMO_VIDEO_URLS[1], duration: "20 min" },
    ]
  },
  {
    title: "Digital Marketing Masterclass",
    instructor: "Maria Rodriguez",
    price: 79,
    rating: 4.6,
    duration: "8 weeks",
    category: "Marketing",
    image: "https://static.vecteezy.com/system/resources/previews/004/796/232/non_2x/digital-marketing-agency-concept-illustration-flat-design-free-vector.jpg",
    description: "Learn SEO, SEM, social media marketing, and content creation for digital success.",
    lessons: [
        { title: "The Fundamentals of Digital Marketing", contentUrl: DEMO_VIDEO_URLS[1], duration: "10 min" },
        { title: "SEO Strategy & Keywords", contentUrl: DEMO_VIDEO_URLS[2], duration: "15 min" },
        { title: "Social Media Campaign Setup", contentUrl: DEMO_VIDEO_URLS[0], duration: "20 min" },
    ]
  },

  {
    title: "Professional English Speaking",
    instructor: "Emily Stone",
    price: 60,
    rating: 4.5,
    duration: "6 weeks",
    category: "Language",
    image: "https://images.unsplash.com/photo-1549414902-861c8a06e903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc5MzV8MHwxfGFsbHwxfHx8fHx8fHwxNjQ3MzM5MTc3&ixlib=rb-1.2.1&q=80&w=2000",
    description: "Improve your spoken and written English with interactive sessions and practical exercises.",
    lessons: [
        { title: "Pronunciation Practice", contentUrl: DEMO_VIDEO_URLS[0], duration: "10 min" },
        { title: "Conversation Starters", contentUrl: DEMO_VIDEO_URLS[1], duration: "15 min" },
    ]
  },
  {
    title: "Project Management Professional (PMP)",
    instructor: "William Garcia",
    price: 150,
    rating: 4.9,
    duration: "12 weeks",
    category: "Management",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20221221134031/Top-10-Project-Management-Certifications-2023.png",
    description: "Prepare for PMP certification and learn project planning, execution, and agile methodologies.",
    lessons: [
        { title: "PMP Exam Overview", contentUrl: DEMO_VIDEO_URLS[2], duration: "10 min" },
        { title: "Agile Methodology", contentUrl: DEMO_VIDEO_URLS[0], duration: "15 min" },
    ]
  },
];


const seedDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");


    await Course.deleteMany({});
    console.log("🧹 Existing courses deleted.");

    const formattedCourses = courses.map(course => ({
        title: course.title,
        category: course.category,
        instructor: course.instructor,
        description: course.description,
        price: course.price,
        duration: course.duration,
        thumbnail: course.image, 
        lessons: course.lessons || [] 
    }));
    
  
    const result = await Course.insertMany(formattedCourses);

    console.log(`✅ Database Seeded! Added ${result.length} courses with lesson data.`);
    
    mongoose.connection.close();
    console.log("🚀 Connection closed.");

  } catch (err) {
    console.error(`❌ Error seeding database: ${err.message}`);
    process.exit(1);
  }
};

seedDB();