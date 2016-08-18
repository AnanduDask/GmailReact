var React = require('react');
var {render}= require('react-dom');
var Contact=React.createClass({
 render:function(){
   return(
     <div className="container-fluid">
         <div className="row">
             <div className="col-md-12">
                 <div className="jumbotron">
                     <h2>
                         Contact Us
                     </h2>
                     <p>
                         Banglore
                     </p>
                     <p>
                         <a className="btn btn-primary btn-large" href="#">Contact Us</a>
                     </p>
                 </div>
             </div>
         </div>
     </div>
   )
 }
});
module.exports=Contact;
