import 'date-fns';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const DateView = () => {
return (<div>
    <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue=""
        InputLabelProps={{
        shrink: true,
        }}
    />
</div>)
}
export default DateView;

