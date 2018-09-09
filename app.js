//INITIALIZATION
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose = require("mongoose");

  
//APP CONFIG    
mongoose.connect("mongodb://localhost/earthquake_help");    
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


//MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);


//RESTful CONFIG
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/escape", function(req, res){
    res.render("edu/escape");
});

app.get("/prevent", function(req, res){
    res.render("edu/prevent");
});

app.get("/reconstruct", function(req, res){
    res.render("edu/reconstruct");
});

app.get("/about", function(req, res){
    res.render("edu/about");
});

app.get("/map", function(req, res){
   res.render("map/mapbox"); 
});

//BLOG
app.get("/blog", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("blog/index", {blogs: blogs});  
        }
    });
});

app.get("/blog/new", function(req, res){
    res.render("blog/new");
});

app.post("/blog", function(req, res){
    //get data from form, add it to campgrounds array
    var title = req.body.title;
    var author = req.body.author;
    var image = req.body.image;
    var content = req.body.content;
    var date = req.body.date;
    var newBlog = {title:title, author:author, image:image, content:content, date: date};
    //create a new camp to DB
    Blog.create(newBlog, function(err, newblog){
        if (err){
            res.render("blog/new");
        }else{
            res.redirect("/blog");
        }
    });
});

app.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id, function(err, showblog){
        if(err){
             res.redirct("/blog");
         }else{
             res.render("blog/show", {blog:showblog});
         }
    });
}); 
   
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("PENNAPP start");
});