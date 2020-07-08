import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/core';
import TextBox from '../textBox/textBox';
import TableView from '../tableView/tableView';
import logoMoney from './subscription.png';

class Dashboard extends React.Component {
    
    constructor() {
        super();
        this.state = ({inRows: [], exRows: [], total: 0})
    }

    componentDidMount() {
        if (localStorage.getItem('inRowData'))
            this.setState({inRows: JSON.parse(localStorage.getItem('inRowData'))})
        
        if (localStorage.getItem('exRowData'))
            this.setState({exRows: JSON.parse(localStorage.getItem('exRowData'))})
        
        if (localStorage.getItem('totalData'))
             this.setState({total: JSON.parse(localStorage.getItem('totalData'))})   
    }

    addRow = (row, type) => {
        if (type === 'income') {
            var inRows = this.state.inRows;
            inRows.push(row);
            this.setState({inRows: inRows, total: this.state.total + parseInt(row.sum)}, () =>
            {
            localStorage.setItem('inRowData', JSON.stringify(inRows))
            localStorage.setItem('totalData', this.state.total)
            })
        }
        else {
            var exRows = this.state.exRows;
            exRows.push(row);
            this.setState({exRows: exRows, total: this.state.total - parseInt(row.sum)}, () => {
            localStorage.setItem('exRowData', JSON.stringify(exRows))
            localStorage.setItem('totalData', this.state.total)
            })
        }
    }

    deleteItem = (e, item, type) => {
        if (type === 'income') {
            var inRows = this.state.inRows;
            var inRowsFilter = inRows.filter(itemi => itemi !== item);
            this.setState({inRows: inRowsFilter}, () => {
            localStorage.setItem('inRowData', JSON.stringify(inRowsFilter));
            })
        }
        else {
            var exRows = this.state.exRows;
            var exRowsFilter = exRows.filter(itemi => itemi !== item);
            this.setState({exRows: exRowsFilter}, () => {
            localStorage.setItem('exRowData', JSON.stringify(exRowsFilter));
            })
        }
    }

    updateRows = (rows, type) => {
        if (type === 'income') 
            this.setState({inRows: rows})
        else if(type === 'expense') {
            this.setState({exRows: rows})
        }
    }


    render() {
        const {classes} = this.props;
       
       return (<div id = "dashboard">
           <h1>My Money Tracker</h1><img src={logoMoney} style={{width: '50px'}}/>
           {
               this.state.total >= 0 ?
               <h1>Total: {this.state.total}</h1>
             : <h1>Total: <div className={classes.total}>{this.state.total}</div></h1>
           }
           <TextBox addRowFn={this.addRow}/>

           <div className={classes.inTable}><TableView rows={this.state.inRows} type='income' 
           deleteItemFn={(e, item, type) => this.deleteItem(e, item, type)} 
           updateRowsFn={(rows, type) => this.updateRows(rows, type)}/></div>
           
           <div className={classes.exTable}><TableView rows={this.state.exRows} type='expense' 
           deleteItemFn={(e, item, type) => this.deleteItem(e, item, type) } 
           updateRowsFn={(rows, type) => this.updateRows(rows, type)}/></div>
         </div>)
  } 
}

export default withStyles(styles)(Dashboard);
