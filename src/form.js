import React, { Component } from 'react';


class AddPostForm extends React.Component{
  constructor(props){
    super(props);
  }

  createPost(event) {
    event.preventDefault();
    // take the data from the form and create an object
    let timestamp = (new Date()).getTime();
    console.log(this);
    let post = {
      id : timestamp,
      title : this.title.value,
      // name : this.refs.name.value,
      // desc : this.refs.desc.value,
      // image : this.refs.image.value
    }
    console.log(post)
    // add the post to the App State
    this.props.addPost(post);
    // this.refs.postForm.reset();
  }
  render() {
    return (
      <div className="callout secondary form-area">
        <h5>Add a Post to the React Blog</h5>
        <form className="post-edit" ref="postForm" onSubmit={this.createPost.bind(this)}>
          <label>Post Title
            <input type="text" ref={(ref) => this.title = ref} placeholder="Post Title" required/>
          </label>
          <button type="submit" className="button">Add Post</button>
        </form>
      </div>
    )
  }
}



export default AddPostForm;
