import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


const initialState = {
  title: '',
  isOpenedModal: false,
};

class PopupEditPostForm extends React.Component{
  state = initialState;

  static propTypes = {
    activePost: PropTypes.object,
    onUpdatePost: PropTypes.func
  };

  componentWillReceiveProps = (nextProps) => {
    // компонент получает новые props. Этод метод не вызывается в момент первого render'a
    if(nextProps.activePost) {
      this.setState(nextProps.activePost);
      this.setState({isOpenedModal:nextProps.isOpenedModal});
    }
  };

  handleRequestClose = () => {
    this.setState({
      isOpenedModal: false
    });
  };

  handlePost = (event) => {
    event.preventDefault();

    const {onUpdatePost} = this.props;
    const post = {
      title : this.state.title
    };
    onUpdatePost(post);
    this.setState(initialState);
  };

  handleChangeInput = (field) => (event) => {
    const value = event.target.value;
    this.setState({
      [field]: value
    });
  };

  render() {
    let {title, isOpenedModal} = this.state;

    return (
      <div>
        <Dialog open={isOpenedModal} onRequestClose={this.handleRequestClose}>
          <DialogTitle> Edit Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Post Content:
            </DialogContentText>
            <TextField
              autoFocus
              value={title}
              onChange={this.handleChangeInput('title')}
              placeholder="title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button  onClick={this.handlePost} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default PopupEditPostForm;