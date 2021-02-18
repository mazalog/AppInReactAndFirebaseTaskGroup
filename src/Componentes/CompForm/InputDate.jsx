import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {

  const{label,name,value,onChange}=props

  //const [selectedDate, setSelectedDate] = React.useState(new Date());

  const convertToDefEventPara = (name, value) => ({
    target: {
        name, value
    }
})

 

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          format="dd/MM/yyyy"
          label={label}
          name={name}
          value={value}
          onChange={date =>onChange(convertToDefEventPara(name,date))}
          size="small" 
          required
        />
    </MuiPickersUtilsProvider>
  );
}