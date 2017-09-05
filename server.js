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
    </body>
        <hr/>
        <br>
        <div>
    <div class="footer">
                       
        <p>Post your comment below:</p>
                            <form method="post">
                              <input type="text" id="comment" placeholder="comment" />
                               <input type="submit" value="comment" id="post-btn"/>
                               
                            </form>
                    <ul id="commentlist"></ul>
     </div>   
      
        
            
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

function hash (input, salt) {
    //how do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512 , 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}



app.get('/hash/:input',function (req , res) {
 var  hashedString = hash(req.params.input, 'this-is-a-random-string');
 res.send(hashedString);
   
   
    
});

app.post('/register/create-user' , function(req,res) {
    
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1 , $2)', [username, dbString] , function(err,result) {
         if(err) {
                res.status(500).send(err.toString());
       }
       else {
           res.send('User Sucessfully created:' +username);
       }
        
    });
});




app.get('/check-login' , function (req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
        res.send('u r logged in ' + req.session.auth.userId.toString());
    } else {
        res.send('u r not logged-in');
    }
});
app.get('/logout' , function (req, res) {
    delete req.session.auth;
    res.send('Logged out');
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

var comments = [];
app.get('/submit-comment', function(req,res) {
    var comment = req.query.comment;
    comments.push(comment);
//JSON 
    res.send(JSON.stringify(comments));
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

app.get('/login',function(req,res) {
    function LoginTemplate() {
        var loginhtml = `
        <html>
        <head>
        <h3>Login</h3> </head>
         <div>
                       <input type="text" id="username" placeholder="username"/>
                       <br>
                       <br>
                       <input type="password" id="password" placeholder="password" />
                       <input type="submit" id="submit_btn" />
                       <br>
                    </div>
         `;           
    }
 
});
/*app.post('/login', function(req, res) {
     var username = req.body.username;
    var password = req.body.password;
    
    
  pool.query('SELECT  * FROM users WHERE id=$1',[id], function (err,result) {
        
                    
         if(err) {
                res.status(500).send(err.toString());
       } else {
           if (result.rows.length === 0) {
                res.send('Username password incorrect !!');
           } else {
           //match the password    
           
           var dbString = result.rows[0].password;
           var salt = dbString.spilt('$')[2];
           var hashPassword = hash(password, salt);
           if (hashedPassword === dbString ) {
               
               //set session
               req.session.auth = {userid: result.rows[0].id};
               //set cookie with a session id
               //inrnally on server side it maps the session id to an object
               // {auth :{userid}};
                    res.send('Credentials correct');
           } else {
           res.send('Username password incorrect !!');
           }
       }
    }   
        });
});
*/




app.get('/articles/:articleName/comments', function (req,res){
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
