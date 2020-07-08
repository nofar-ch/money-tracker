import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const TableView = ({classes, rows, type, deleteItemFn, updateRowsFn}) => {

  if(rows !== undefined && rows != null) {
    return (
      <TableContainer component={Paper} className={classes.container}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
        {
        type === 'income' ?
            <TableRow className={classes.inCategories}> 
            <TableCell>Name</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right"><div className={classes.cursor}>
            <ArrowDownwardIcon onClick={(e) => sortDown(e, type, rows, updateRowsFn)}/>
            <ArrowUpwardIcon onClick={(e) => sortUp(e, type, rows, updateRowsFn)}/></div>Date</TableCell>
            </TableRow>
            : 
            <TableRow className={classes.exCategories}>
            <TableCell>Name</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right"><div className={classes.cursor}>
            <ArrowDownwardIcon onClick={(e) => sortDown(e, type, rows, updateRowsFn)}/>
            <ArrowUpwardIcon onClick={(e) => sortUp(e, type, rows, updateRowsFn)}/></div>Date</TableCell>
            </TableRow>
          }
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.sum}</TableCell>
              <TableCell align="right">{row.date}<DeleteIcon className={classes.cursor} onClick={(e) => deleteItem(e, row, type, deleteItemFn)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     );
        }
  else 
  return (<div></div>);
}
export default withStyles(styles)(TableView);

export const createData = (name, sum) => {
    return {name, sum};
  }

export const deleteItem = (e, item, type, deleteItemFn) => {
    deleteItemFn(e, item, type)
  }

export const sortUp = (e, type, rows, updateRowsFn) => {
    if(rows !== undefined && rows.length > 1) {
       rows.sort(function(a, b) 
       {
         if(a.date < b.date) { return -1 }
         else if(a.date > b.date) { return 1 }
         else return 0;
       })
       updateRowsFn(rows, type);
      }
   
   } 

  export const sortDown = (e, type, rows, updateRowsFn) => {
   if(rows !== undefined && rows.length > 1) {
      rows.sort(function(a, b) 
      {
        if(a.date < b.date) { return 1 }
        else if(a.date > b.date) { return -1 }
        else return 0;
      })
      updateRowsFn(rows, type);
   }
  }
  
  

