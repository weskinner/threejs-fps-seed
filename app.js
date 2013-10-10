var bogart = require('bogart');

var router = bogart.router();
router.get('/', function(req) { 
  return bogart.redirect("/index.html"); 
});

var app = bogart.app();
app.use(bogart.batteries); // A batteries included JSGI stack including streaming request body parsing, session, flash, and much more.
app.use(router); // Our router

app.start();