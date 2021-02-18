import React from 'react'
import TextField from '@material-ui/core/TextField'

const Input=(props)=>{
    const{name,label,type,onChange,InputProps,helperText}=props
    return(
        <div>
            <TextField
              autoComplete="off"
              label={label}
              name={name}
              type={type}
              onChange={onChange}
              variant="standard"
              InputProps={InputProps}
              helperText={helperText}
              size="small" 
             required
            />
        </div>
    )
}

export default Input