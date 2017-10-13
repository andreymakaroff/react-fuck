import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AddPostForm from './form';


//helper functions
var h =  {
  rando : function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  getTime : function() {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var d = new Date();
    var mon = month[d.getMonth()];
    var day = d.getDate();
    var year = d.getFullYear();
    var dateAll = mon + " " + day + ", " + year;

    return dateAll;
  },
  getTaggedName : function() {
    var adjectives = ['trusted', 'secure', 'hot', 'new', 'interesting', 'best practice', 'exciting'];

    var nouns = ['es6', 'browserify', 'webpack', 'gulp', 'reactDOM', 'devTools'];

    return this.rando(adjectives) + ' ' + this.rando(nouns);
  }
}


let posts = {};
// App
class App extends React.Component{

  constructor (props) {
   super(props);
   this.state = {
     posts: {},
   }
  }
  addPost(post) {
    var postId = post.id;
    this.state.posts['post-' + postId] = post;
    this.setState({ posts : this.state.posts });
  }
  deletePost(id) {
    delete this.state.posts['post-' + id];
    this.setState({ posts : this.state.posts });
  }

  renderPost(key){
    return <NewPost key={key} index={key} details={this.state.posts[key]}  deletePost={this.deletePost.bind(this)} />
  }
  render() {
    var imgOne = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Balaton_Hungary_Landscape.jpg/1024px-Balaton_Hungary_Landscape.jpg";
    var imgTwo ="https://c2.staticflickr.com/8/7432/9087815445_1a14743549_b.jpg";
    var imgThree ="https://c2.staticflickr.com/6/5738/23929500196_b6a1ce1dfb_b.jpg";
    var imgFour ="https://pixabay.com/static/uploads/photo/2015/09/14/19/15/aerial-landscape-939963_960_720.jpg";
    var dummyPost = "Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus.";
    return (
      <div>
        <div className="row medium-8 large-7 columns">
          <div className="list-of-posts">
            {Object.keys(this.state.posts).map(this.renderPost.bind(this))}
          </div>
          <AddPostForm addPost={this.addPost.bind(this)}/>
        </div>
      </div>
    )
  }
}



/*
  NewPost
  <NewPost />
*/
class NewPost extends React.Component{
  deleteClickPost() {
    let id = this.props.details.id;
    this.props.deletePost(id);
  }
  render() {
    var details = this.props.details;
    return (
      <div className="blog-post">
        <h3 className="ptitle">{details.title}<small>{h.getTime()}</small></h3>
        <img className="thumbnail" src={details.image} alt={details.name}/>
        <p>{details.desc}</p>
        <div className="callout callout-post">
          <ul className="menu simple">
            <li><a href="#" onClick={this.deleteClickPost.bind(this)}>Delete</a></li>
            <li><a href="#">Author: {details.name}</a></li>
            <li><a href="#">Comments: 0</a></li>
            <li><a href="#">Tags: {h.getTaggedName()}</a></li>
          </ul>
        </div>
      </div>
    )
  }
}


// Nav component
class Nav extends React.Component{
  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">React Blog</li>
            <li><a href="#">One</a></li>
            <li><a href="#">Two</a></li>
            <li><a href="#">Three</a></li>
          </ul>
        </div>
      </div>
    )
  }
}


// Banner component
class Banner extends React.Component{

  render () {
    return (
      <div>
        <Nav />
        <div className="big-banner">
          <div className="callout large primary">
            <div className="row column text-center">
              <h1>React Blog</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


// Blog Post

class Post extends React.Component{
  tryClick () {
    alert('just trying out click events lalala');
  }
  render () {
    var com = "Comments";
    return (
      <div className="blog-post">
        <h3 className="ptitle">{this.props.ptitle}<small>{this.props.date}</small></h3>
        <img className="thumbnail" src={this.props.pimg} />
        <p>{this.props.postbody}</p>
        <div className="callout callout-post">
          <ul className="menu simple">
            {/*<li><a href="#" onClick={this.deleteClickPost}>delete</a></li>*/}
            <li><a href="#" onClick={this.tryClick}>Author: {this.props.author}</a></li>
            <li><a href="#">{com}: {this.props.comments}</a></li>
            <li><a href="#">Tags: {h.getTaggedName()}</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

//instead of ReactDOM like in the video:


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//polyfill for key
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

//header scroll stuff
window.onscroll = function(e) {
  var nav = document.getElementsByClassName("top-bar")[0],
    banner = document.getElementsByClassName("big-banner")[0],
    range = 70,
    scrollTop = document.body.scrollTop;

  if (scrollTop > range) {
    nav.classList.add("scrollNav");
    banner.classList.add("blurred");
  }
  else {
    nav.classList.remove("scrollNav");
    banner.classList.remove("blurred");
  }
};

