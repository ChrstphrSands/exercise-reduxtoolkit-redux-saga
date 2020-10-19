import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
} from '@material-ui/core';
import { DeleteOutlineOutlined, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { deleteTaskRequest, putTask } from "../../tasksSlice";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

const TasksList = ({ tasks }) => {    
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleEdit = (task) => {
        dispatch(putTask(task))
    };
    
    return (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell component="th" scope="row">{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell align="right">
                      <div className={classes.buttonActions}>
                        <Tooltip title="Delete" onClick={() => dispatch(deleteTaskRequest(task.id))}>
                          <DeleteOutlineOutlined />
                        </Tooltip>
                        <Tooltip title="Edit" onClick={() => handleEdit(task)}>
                          <Edit />
                        </Tooltip>
                      </div>
                    </TableCell>               
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      );
    };

export default TasksList;
