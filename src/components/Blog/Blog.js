import React, { Component } from 'react';

import AddPostForm from '../../components/PostForm/PostForm';
import SimplePost from '../../components/SimplePost/SimplePost';

import EditTestPostForm from '../../EditTestPostForm';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class Blog extends React.Component{

  state = {
    posts : {},
    isOpenedModal: false,
    activePost: null,
    activePostKey: null
  };

  constructor(props){
    super(props);
  }

  addPost = (post) => {
    const {posts} = this.state;
    let timeStamp = new Date().getTime();

    posts['post-' + timeStamp] = post;
    this.setState({
      posts // posts:posts
    })
  };

  updatePost = (updatedPost) => {
    let {posts, activePostKey} = this.state;

    if(activePostKey) {  // проверка чтоб не добавлялся с key = null
      posts[activePostKey] = updatedPost;
    }

    this.setState({
      activePost: null,
      activePostKey: null,
      posts // posts:posts
    })
  };

  handleDeletePost = (key) => {
    const {posts} = this.state;
    delete posts[key];

    this.setState({
      posts
    });
  };

  handleEditPost = (key) => {
    const {posts} = this.state;
    const activePost = posts[key];

    this.setState({
      activePostKey: key,
      activePost
    });
  };

  renderPost = (key) => {
    const postData = this.state.posts[key];

    return <SimplePost
      key={key}
      index={key}
      title={postData.title}
      details={this.state.posts[key]}
      onDelete={this.handleDeletePost}
      onEdit={this.handleEditPost}
      enableDelete={true}
      enableEdit={true}
      />
  }

  render() {

    const {posts, activePost} = this.state;

    return (
      <Grid container justify="center" spacing={0}>
        <Grid item xs={6}>
          <Typography type="title"  component="h1" color="inherit" style={{marginBottom:'20px'}}>
            Blog
          </Typography>
          <Grid container justify="center" spacing={24}>
            {Object.keys(posts).map(this.renderPost)}
          </Grid>
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12}>
              <EditTestPostForm
                activePost={activePost}
                onUpdatePost={this.updatePost}/>
              <AddPostForm addPost={this.addPost}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Blog;
