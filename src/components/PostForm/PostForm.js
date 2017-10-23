import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
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

  constructor(props){
    super(props);
  }

  handlePost = (event) => {
    event.preventDefault();

    const {activePost, addPost, onUpdatePost} = this.props;
    const post = {
      title : this.state.title
    };

    (activePost) ? onUpdatePost(post) : addPost(post);

    this.setState(initialState);

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
          <FormControl>
            <InputLabel htmlFor="name-simple">Post Title</InputLabel>
            <Input
              required
              value={title}
              onChange={this.handleChangeInput('title')}
              placeholder="Type title"/>
          </FormControl>
          <Button fab color="primary" aria-label="add"  onClick={this.handlePost}>
            <AddIcon />
          </Button>
        </form>
      </Paper>
    )
  }
}


export default PostForm;
