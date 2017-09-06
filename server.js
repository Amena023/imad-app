var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user :'amenaarif1996',
    database : 'amenaarif1996',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret : 'someRandomSecretValue',
    cookie : { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

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
                ${date.toDateString()}
            </div>
       
        <div>
            ${content}
        </div>
    
        <hr/>
        <br>
        <div>
    <div class="footer">
                       
      <h4>Comments</h4>
              <div id="comment_form">
               User Name: <input type="text" name="usrname">
                          <br>
                            <textarea rows="4" cols="50" name="comment" form="usrform">
                             Enter text here...</textarea>
                          <input type="submit">
              </div>
             
                         
              
              <div id="comments">
              
                <center>Loading comments...</center>
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
                    <ul id="commentlist"></ul>
     </div>   
      
    </body>    
            
    </div>
     
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

 app.get('/articles/:articleName', function (req,res){
    //articleName==article-one
    //articles[articleName]=={} content object for article-one
        pool.query("SELECT *FROM article WHERE title= $1", [req.params.articleName],function(err,result) {
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


