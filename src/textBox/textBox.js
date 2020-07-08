import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/core/styles';
import {Button, TextField} from '@material-ui/core';
import DateView from '../date/date'

class TextBox extends React.Component {

    constructor() {
        super();
        this.state = ({textInput: null, numberInput: null, date: null});
    }

    typingText = (e) => {
        this.setState({textInput: e.target.value});
    }

    typingNumber = (e) => {
        this.setState({numberInput: e.target.value});
    }

    addRow = (e, type) => {
        var textInput = this.state.textInput;
        var numberInput = this.state.numberInput
        if(this.validInput(textInput, numberInput)) {
            var row = {
                name: textInput,
                sum: numberInput,
                date: document.getElementById("date").value
            }
            this.props.addRowFn(row, type);
        }
    }

    validInput = (textInput, numberInput) => textInput != null
                  && textInput.replace(/\s/g, '').length   // check if the text is't contains just spaces
                  && numberInput != null && numberInput > 0;
    
    render() {
        const {classes} = this.props;
  return (
        <div className={classes.main}>
            <form noValidate autoComplete="off">
            <TextField className={classes.field} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => this.typingText(e)}/>
            <TextField className={classes.field} id="outlined-number" label="Sum" type="number" InputLabelProps={{shrink: true,}} variant="outlined" onChange={(e) => this.typingNumber(e)}/>
            <div className={classes.field}><DateView /></div>
            </form>
            <div className={classes.btn}><Button variant="contained" color="primary"
            onClick={(e) => this.addRow(e, 'income')}>income</Button></div>
            <div className={classes.btn}><Button variant="contained" color="primary"
            onClick={(e) => this.addRow(e, 'expense')}>expense</Button></div>
            </div>
        )
  } 
}

export default withStyles(styles)(TextBox);








