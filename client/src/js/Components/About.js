var React = require('react');
var {render}= require('react-dom');
var About=React.createClass({
 render:function(){
   return(
<div className="container-fluid">
    <div className="row">
        <div className="col-md-12">
            <div className="jumbotron">
                <h2>
                    Hello, world! Its My Gmail App
                </h2>
                <p>
                    Its nice app
                </p>
                <p>
                    <a className="btn btn-primary btn-large" href="#">Read More</a>
                </p>
            </div>
        </div>
    </div>
</div>
   );
 }
});
module.exports=About;
