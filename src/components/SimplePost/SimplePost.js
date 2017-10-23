import React, { Component } from 'react';
import PropTypes from 'prop-types';

import prettyDate from '../../lib/helpers/prettyDate';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Typography from 'material-ui/Typography';


class SimplePost extends React.Component{
  static propTypes = {
    title: PropTypes.string.isRequired,
    enableDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    index: PropTypes.string,
    enableEdit: PropTypes.bool,
    onEdit: PropTypes.func,
  };

  static defaultProps = {
    enableDelete: false,
    enableEdit: false
  };

  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };

  handleEdit = () => {
    this.props.onEdit(this.props.index);
  };

  render() {

    const {title, enableDelete, enableEdit, date} = this.props;

    return (
      <Grid item xs={6}>
        <Paper style={{padding:'20px'}} elevation={4}>
          <Typography type="title" component="h4">
            {title}
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              {
                enableDelete &&
                <IconButton
                  aria-label="Delete"
                  onClick={this.handleDelete}>
                  <DeleteIcon/>
                </IconButton>
              }
              {
                enableEdit &&
                <IconButton
                  color="accent"
                  onClick={this.handleEdit}
                  aria-label="edit">
                  <ModeEditIcon/>
                </IconButton>
              }
            </Grid>
            <Grid item xs={6}  style={{textAlign:'right'}}>
              <small>{prettyDate.getTime()}</small>
            </Grid>
          </Grid>
        </Paper>

      </Grid>
    )
  }
}


export default SimplePost;
