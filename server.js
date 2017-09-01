var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user :'amenaarif1996',
    database : 'amenaarif1996',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles={
    'article-one': {
    title: 'Article-One |AMENA ARIF',
    heading: 'Article-One',
    date:'Aug 13 2017',
    content:`<p>  FIRST Article 
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                </p>
                
                
                
                <p>
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...vthis is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                </p>
                
                
                
                <p>
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                </p>
            `
},
    'article-two': { 
    title: 'Article-Two |AMENA ARIF',
    heading: 'Article-Two',
    date:'Aug 13 2017',
    content:`<p>   Second Article
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                </p>
            `
    },  
    'article-three': {
        
    title: 'Article-Three |AMENA ARIF',
    heading: 'Article-Three',
    date:'Aug 13 2017',
    content:`<p>   Third Article
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                    this is amna this is amna this is amna...this is amna this is amna this is amna...this is amna this is amna this is amna...
                </p>
            `
    
    
    }
    };
                

function CreateTemplate(data) {
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
   
    var htmlTemplate =`
    <html>
    <head>
        <title>
        ${title}
        </title>
        <meta name="viewport" content="width=width-device,initial-scale=1"/>
      <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
    
    <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
        <hr/>
            <h3>${heading}</h3>
            <div>
                ${date}
            </div>
       
        <div>
            ${content}
        </div>
        <hr/>
        <br>
        <div>
    <div class="footer">
                       
         <p>Post your comment below:</p>
                            <form method="post">
                               <input type="text" id="comment" placeholder="comment" />
                                <input type="submit" value="Post" id="post-btn"/>
                               
                            </form>
                    <ul id="commentlist"></ul>
     </div>   
        
        
            
    </div>
    </body>
</html>
`;
    return htmlTemplate;
}


var pool = new Pool(config);
app.get('/test-db',function(req,res) {
 pool.query('SELECT *from test',function(err,result) {
   if(err) {
       res.status(500).send(err.toString());
       }
       else {
           res.send(JSON.stringify(result.rows));
       }
 });
});





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req,res) {
     counter = counter + 1;
    res.send(counter.toString());
});



var names = [];
app.get('/submit-name', function(req,res) {
   var name = req.query.name;
   names.push(name);
   //json :js obj notation 
   res.send(JSON.stringify(names));
   
});

var comments =[];
app.get('/post-comment',function (req,res) {
var comment =req.query.comment;
comments.push(comment);
res.send(JSON.stringify(comments));
});


app.get('/articles/:articleName', function (req,res){
    //articleName==article-one
    //articles[articleName]=={} content object for article-one
        pool.query("SELECT *FROM article WHERE title="+ req.params.articleName,function(err,result) {
            if(err) {
                res.status(500).send(err.toString());
            } else { 
                if(result.rows.length===0) {
                    res.status(404).send('article not found!!');
                } else {
                    var articleData =result.rows[0];
                     res.send(CreateTemplate(articleData));
                }
        }
   
});

});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
