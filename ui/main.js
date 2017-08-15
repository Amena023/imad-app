//counter code
var button=document.getElementById('counter');
button.onclick = function() {
    var counter = 0;
    //make a re to counter endpoint
    //capture the response and store in a variable
    
    //render the var in the correct span
    counter = counter + 1;
    var span = document.getElementById ('count');
    span.innerhtml = counter.toString();
};