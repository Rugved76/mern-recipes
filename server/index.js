import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./src/routes/user.js";
import { recipesRouter } from "./src/routes/recipes.js";

const app = express();
const DB_URL = 'mongodb+srv://rugvedwagh02:rugved76@clusternew.xrsceyc.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json());
// // const allowedOrigins = [
// //   'https://blogmernfront.onrender.com',
// //   'https://blogmernfront.onrender.com/auth',
// //   'https://recipeserver-odjx.onrender.com'
// // ];

// // Use the CORS middleware with allowed origin links
// // app.use(cors({
// //   origin: allowedOrigins,
// //   credentials: true,
// // }));

// app.use(cors({ credentials: true, origin: `https://blogmernfront.onrender.com/recipes`,`https://blogmernfront.onrender.com/auth/login`,`https://blogmernfront.onrender.com/auth/register` }));

// const allowedOrigins = ['https://blogmernfront.onrender.com/recipes',
//                         'https://blogmernfront.onrender.com/auth/login',
//                         'https://blogmernfront.onrender.com/auth/register',
//                         'https://blogmernfront.onrender.com/auth',
//                         'https://recipeserver-odjx.onrender.com',
//                         'https://recipebackend-x1g8.onrender.com/auth/login',
//                         'https://recipebackend-x1g8.onrender.com/auth/register',
//                         'https://recipebackend-x1g8.onrender.com/auth'
//                        ];

// // CORS middleware with custom options
// app.use(cors({
//   origin: (origin, callback) => {
//     // Check if the origin is allowed or allow requests from localhost (for development)
//     if (!origin || allowedOrigins.includes(origin) || origin.includes('http://localhost')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));
const CLIENT_URL = 'http://localhost:3000'
// const CLIENT_URL = 'https://blogmernfront.onrender.com'
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('Connected to the database...')
}).catch((e) => {
  console.log('Failed to connect to the database...')
});

app.listen(3001, () => console.log(`\nServer running on port 3001...`));
