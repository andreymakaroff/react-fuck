import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AddPostForm from './AddPostForm';
import EditTestPostForm from './EditTestPostForm';
// import editPostForm from './editPostForm';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Grid from 'material-ui/Grid';

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
    let postId = post.id;
    this.state.posts['post-' + postId] = post;
    this.setState({ posts : this.state.posts });
  }
  deletePost(id) {
    delete this.state.posts['post-' + id];
    this.setState({ posts : this.state.posts });
  }
  editPost(id) {
    console.log(id);

    // delete this.state.posts['post-' + id];
    // this.setState({ posts : this.state.posts });
  }

  renderPost(key){
    return <NewPost
      key={key}
      index={key}
      details={this.state.posts[key]}
      deletePost={this.deletePost.bind(this)}
      editPost={this.editPost.bind(this)}/>
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" color="inherit">
              My fucking posts
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center" spacing={24}>
          <Grid item xs={6}>
            <Typography type="title"  component="h1" color="inherit" style={{marginBottom:'20px'}}>
              Blog
            </Typography>
            <Grid container justify="center" spacing={24}>
              {Object.keys(this.state.posts).map(this.renderPost.bind(this))}
            </Grid>
            <Grid container justify="center" spacing={24}>
              <Grid item xs={12}>
                <EditTestPostForm />
                <AddPostForm addPost={this.addPost.bind(this)}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}


class NewPost extends React.Component{
  deleteClickPost() {
    let id = this.props.details.id;
    this.props.deletePost(id);
  }
  editClickPost() {
    let id = this.props.details.id;
    this.props.editPost(id);
  }
  render() {
    var details = this.props.details;
    return (
      <Grid item xs={6}>
        <Paper style={{padding:'20px'}} elevation={4}>
          <Typography type="title" component="h4">
            {details.title}
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <IconButton
                aria-label="Delete"
                onClick={this.deleteClickPost.bind(this)}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="accent"
                onClick={this.editClickPost.bind(this)}
                aria-label="edit">
                <ModeEditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}  style={{textAlign:'right'}}>
              <small>{h.getTime()}</small>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

