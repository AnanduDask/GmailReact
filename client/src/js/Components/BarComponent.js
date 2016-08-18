var React=require('react');

var BarComponent=React.createClass({
  render: function(){
    return(
      <div className="inbox-body">
      <div className="mail-option">
      <div className="chk-all">
      <input type="checkbox" className="mail-checkbox mail-group-checkbox"/>
      <div className="btn-group">
      <a data-toggle="dropdown" href="#" className="btn mini all" aria-expanded="false">
      All <i className="fa fa-angle-down "></i>
      </a>
      <ul className="dropdown-menu">
      <li><a href="#"> None</a></li>
      <li><a href="#"> Read</a></li>
      <li><a href="#"> Unread</a></li>
      </ul>
      </div>
      </div>
      <div className="btn-group">
      <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="#" className="btn mini tooltips">
      <i className=" fa fa-refresh"></i>
      </a>
      </div>
      <div className="btn-group hidden-phone">
      <a data-toggle="dropdown" href="#" className="btn mini blue" aria-expanded="false">
      More <i className="fa fa-angle-down "></i>
      </a>
      <ul className="dropdown-menu">
      <li><a href="#"><i className="fa fa-pencil"></i> Mark as Read</a></li>
      <li><a href="#"><i className="fa fa-ban"></i> Spam</a></li>
      <li className="divider"></li>
      <li><a href="#"><i className="fa fa-trash-o"></i> Delete</a></li>
      </ul>
      </div>
      <div className="btn-group">
      <a data-toggle="dropdown" href="#" className="btn mini blue">
      Move to <i className="fa fa-angle-down "></i>
      </a>
      <ul className="dropdown-menu">
      <li><a href="#"><i className="fa fa-pencil"></i> Mark as Read</a></li>
      <li><a href="#"><i className="fa fa-ban"></i> Spam</a></li>
      <li className="divider"></li>
      <li><a href="#"><i className="fa fa-trash-o"></i> Delete</a></li>
      </ul>
      </div>
      <ul className="unstyled inbox-pagination">
      <li><span>1-50 of 234</span></li>
      <li>
      <a className="np-btn" href="#"><i className="fa fa-angle-left  pagination-left"></i></a>
      </li>
      <li>
      <a className="np-btn" href="#"><i className="fa fa-angle-right pagination-right"></i></a>
      </li>
      </ul>
      </div>
      </div>
    )
  }
})
module.exports=BarComponent;
