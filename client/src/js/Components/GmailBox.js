var React=require("react");
var GmailLeft=require('./GmailLeft');
var InboxChild=require('./InboxChild');
var ComposeComponent =require('./ComposeComponent');
var NavbarComponent=require('./NavbarComponent');
var Barcomponent=require('./BarComponent');
var retrievedMailArr=[];
var GmailBox = React.createClass({

getInitialState: function() {
  return {data: [],allData: []};
},

 gmailLogin: function()
 {
   var acToken, tokenType, expiresIn;
   var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
   var VALIDURL    =   'https://www.googleapis.com/oauth2/v4/token?access_token=';
   var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly';
   var CLIENTID    =   '228551563107-8clncn5773sqdvlm7b5prbuvkd86bi7j.apps.googleusercontent.com';
   var REDIRECT    =   'http://localhost:8080';
   var TYPE        =   'token';
   var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
   var win         =   window.open(_url, "windowname1", 'width=800, height=600');
   var pollTimer   =   window.setInterval(function()
   {
       try
       {
           if (win.document.URL.indexOf(REDIRECT) != -1)
           {
               window.clearInterval(pollTimer);
               var url =   win.document.URL;
               acToken =   gup(url, 'access_token');
               tokenType = gup(url, 'token_type');
               expiresIn = gup(url, 'expires_in');
               localStorage.setItem('gToken',acToken);
               localStorage.setItem('gTokenType',tokenType);
               localStorage.setItem('gExprireIn',expiresIn);
               console.log("gToken.."+localStorage.getItem('gToken'));
               console.log("gTokenType.."+localStorage.getItem('gTokenType'));
               console.log("gExprireIn.."+localStorage.getItem('gExprireIn'));
               function gup(url, name) {
                   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                   var regexS = "[\\#&]"+name+"=([^&#]*)";
                   var regex = new RegExp( regexS );
                   var results = regex.exec( url );
                   if( results == null )
                       return "";
                   else
                       return results[1];
               }
               win.close();
           }
       }
       catch(e)
       {
         console.log(e);
       }
   }, 500);
   this.allLabels();
 },

 allLabels: function()
   {
       var accessToken = localStorage.getItem('gToken');
       $.ajax({
        url: 'https://www.googleapis.com/gmail/v1/users/anandudasm1%40gmail.com/labels?key={AIzaSyD04tC7mwXP3FNSZS6rpqzkfdC46yI6Scg}',
        dataType: 'json',
        type: 'GET',
        beforeSend: function (request)
        {
          request.setRequestHeader("Authorization", "Bearer "+accessToken);
        },
        success: function(data)
        {
          this.setState({data:data.labels});
          //console.log(this.state.allLabelsData);
          console.log(data);
          //<GmailLeft data={this.props.data}/>
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(err.toString());
        }.bind(this)
     });
   },

   getItems: function(lbl)
   {
     var that=this;
     var messages=[];
     var accessToken = localStorage.getItem('gToken');

     $.ajax({
       url: 'https://www.googleapis.com/gmail/v1/users/anandudasm1%40gmail.com/messages?labelIds='+lbl.lableId+'&maxResults=10&key={AIzaSyD04tC7mwXP3FNSZS6rpqzkfdC46yI6Scg}',
       dataType: 'json',
       type: 'GET',
       beforeSend: function (request)
       {
         request.setRequestHeader("Authorization", "Bearer "+accessToken);
       },
       success: function(data)
       {
         //console.log('list of message',data);
         data.messages.forEach(function(message){
           $.ajax({
             url:'https://www.googleapis.com/gmail/v1/users/anandudasm1%40gmail.com/messages/'+message.id+'?fields=payload%2Fheaders&key={AIzaSyD04tC7mwXP3FNSZS6rpqzkfdC46yI6Scg}',
             dataType: 'json',
             type: 'GET',
             beforeSend: function (request)
             {
               request.setRequestHeader("Authorization", "Bearer "+accessToken);
             },
             success: function(data)
             {
               //console.log(JSON.stringify(data));

               var dataArr = Object.keys(data).map(function(k) { return data[k] });
               var mailDataArr=dataArr[0].headers;
               //  console.log(JSON.stringify(mailDataArr);
               var fromArray = mailDataArr.filter(function(item) { return item.name === 'From';});
               var subjectArray = mailDataArr.filter(function(item) { return item.name === 'Subject';});
               var dateArray = mailDataArr.filter(function(item) { return item.name === 'Date';});
               var aggregatedArray=fromArray.concat(subjectArray).concat(dateArray);
               retrievedMailArr.push(aggregatedArray);
               console.log(JSON.stringify(retrievedMailArr));

               that.setState({allData:retrievedMailArr});
             }
             .bind(this),
             error: function (xhr, status, err) {
               console.error(this.props.url, status, err.toString());
             }.bind(this)

           });
         });
         retrievedMailArr=[];

       }.bind(this),
       error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
     });


   },
   componentDidMount: function(){
     this.getItems({lableId:'InboxChild'});
   },


 render: function() {


  return(
     <div>
     <NavbarComponent/>
     <Barcomponent/>

     <div className="menubar" id="menus">
     <button id="authorize-button" onClick={this.gmailLogin} className="btn btn-primary pull-right">Login</button>
     <ComposeComponent/>
     <GmailLeft submitLabelId={this.getItems} data={this.state.data}/>
     </div>

     <div>

       <InboxChild allData={this.state.allData}/>

     </div>


</div>
 );
}
});
module.exports=GmailBox;
