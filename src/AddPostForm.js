import React, { Component } from 'react';

import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';


let paperStyle = {
  padding: '20px',
};

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
    // add the post to the App State
    this.props.addPost(post);
    this.refs.postForm.reset();
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper style={paperStyle} elevation={4}>
        <Typography type="title" component="h3">
          Add a Post to the React Blog
        </Typography>
        <form className="post-edit" ref="postForm" onSubmit={this.createPost.bind(this)}>
          <hr/>
          <FormControl>
            <InputLabel htmlFor="name-simple">Post Title</InputLabel>
            <Input required inputRef={(ref) => this.title = ref} placeholder="Type title"/>
          </FormControl>
          <Button fab color="primary" aria-label="add"  onClick={this.createPost.bind(this)}>
            <AddIcon />
          </Button>
        </form>
      </Paper>
    )
  }
}


export default AddPostForm;
