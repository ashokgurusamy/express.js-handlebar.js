var express = require("express");
const path = require("path"); //for file path
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
//initializing below
const app = express();

//next is to start the next function

//Initialize the middleware
app.use(logger);

//Hnadlebars middlewar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
//   //double underscore dirname is for the directory, where index.html inside the public folder
// });

//Initializing body parser milddleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //This is to handle url encoded data

//loading static folder
app.use(express.static(path.join(__dirname, "public")));

//Home page route from handlebar
//app.get("/", (req, res) => res.render("index"));

//Member API routes
//So in routes/api folder "api/members" can be called with "/"
app.use("/api/members", require("./routes/api/members"));
//Will use "use" only for including midddleware
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
