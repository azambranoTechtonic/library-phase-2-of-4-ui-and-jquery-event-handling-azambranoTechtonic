// Lets simply talk through the variations of functions

// There are {insert here} different types of functions we can work with.
// They all have their place in JavaScript

//Expressed functions
//Expressed functions are not hoisted to the DOM, meaning they are not available for use until after
//the function has been set. This is because of dynamic typing. myFunc can techincally be changed to anything
//down the line.

//Example: myFunc() will return us undefined
var myFunc = function(){
  return "Expressed Function";
};
//Example myFunc() will run


//Declared functions
//Declared functions can be called anywhere. When the browser interprets our JS it sees that we have a
//type for what we are declaring - that type is a function

//Example: myDeclaredFunc() will run here
function myDeclaredFunc(){
  return "Declared Function";
};
//Example: myDeclaredFunc() will run here //

//Arrow functions aka fat arrow functions
//Arrow functions are ES6 so be sure your project can support this!
//Undoubtedly one of the more popular features of ES6. These are concise ways of writing functions so there is no
//questions as to why.
// TODO: Add more information around this!!!! Omitted brackets and why??

//an expressed example (ES5)
var arrFunc = function(){
  return "arrow function";
};

//an expressed version of the same function. Brackets are omitted due to an explict return but
//only if there is no block -- more this in a second
var arrFunc = () => "arrow function";


//Variations
//If we have a parameter we can omit the parentheses (optional)
//Example:
var wParam = param => return param + "arrow test";
//Example: or with parentheses
var wParam = (param) => return param + "arrow test";

//Now without a parameter
//Example:
var noParam = () => "arrow test";
//Example: without parentheses
var noParam = _ => "arrow test";

//Now with multiple parameters. This requires parentheses!
//Example:
var multiParams = (x, y) => "multiple params";


//Now lets go over a function with a statement. We require curlies here.
var stateFunc = (dog) => {
  if(dog === 'hungry'){
    return 'Feed the dog'
  }

  return 'Do not feed the dog'
};

//Block Buddy
//If your function is in a block, you must use an explict return statement.
//Example:
var stateFunc = (x,y) => {
  return x + y;
};


//Object literals
//If you are returning an object literal, it needs to be wrapped in parentheses.
//This forces the interpreter to evaluate what is inside the parentheses, and the object literal is returned.
var objLitFunc = x => ({y: x});

//Syntactically anonymous
//Its important to note that arrow functions are anon, which means that they are not named. They are not
//declared functions!

//Cons ---
//Harder to debug
