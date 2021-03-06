import React from 'react';
import PropTypes from 'prop-types';


// import { ValidatorForm } from 'react-form-validator-core';
// import { TextValidator} from 'react-material-ui-form-validator';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';


let paperStyle = {
  padding: '20px',
};

const initialState = {
  title: ''
};

class PostForm extends React.Component{
  state = initialState;

  static propTypes = {
    activePost: PropTypes.object,
    addPost: PropTypes.func,
    onUpdatePost: PropTypes.func
  };

  static defaultProps = {
    activePost: null
  };

  handlePost = (event) => {
    event.preventDefault();

    const {addPost} = this.props;

    if(this.state.title){
      const post = {
        title : this.state.title
      };
      addPost(post);
      this.setState(initialState);
    }

  };

  handleChangeInput = (field) => (event) => {
    const value = event.target.value;
    this.setState({
      [field]: value
    });
  };

  render() {
    const {title} = this.state;

    return (
      <Paper style={paperStyle} elevation={4}>
        <Typography type="title" component="h3">
          Add a Post to the React Blog
        </Typography>
        <form className="post-edit" ref="postForm" onSubmit={this.handlePost}>
          <hr/>
          <TextField
            required
            value={title}
            onChange={this.handleChangeInput('title')}
            label="Type title"
            margin="normal"
          />
          <Button fab color="primary" aria-label="add"  onClick={this.handlePost}>
            <AddIcon />
          </Button>
        </form>
      </Paper>
    )
  }
}


export default PostForm;
