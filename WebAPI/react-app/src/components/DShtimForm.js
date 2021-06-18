import React, { useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dShtim";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    zona: '',
    qyteti: '',
    tabelat: '',
    tipiVetures: ''
}

const DShtimForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({zona:'Emshir'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('zona' in fieldValues)
            temp.zona = fieldValues.zona ? "" : "This field is required."
        if ('qyteti' in fieldValues)
            temp.qyteti = fieldValues.qyteti ? "" : "This field is required."
        if ('tabelat' in fieldValues)
            temp.tabelat = fieldValues.tabelat ? "" : "This field is required."
        if ('tipiVetures' in fieldValues)
            temp.nrtel = fieldValues.tipiVetures ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createDShtim(values, onSuccess)
            else
                props.updateDShtim(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dShtimList.find(x => x.id === props.currentId)
            })
            setErrors({})
        } // eslint-disable-next-line
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.zona && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Zona e parkimit</InputLabel>
                    <Select
                        name="zona"
                        value={values.zona}
                        onChange={handleInputChange}
                        labelWidth={labelWidth}
                        >
                            <MenuItem value="Dardania">Dardania</MenuItem>
                            <MenuItem value="Lakrishte">Lakrishte</MenuItem>
                            <MenuItem value="Kalabri">Kalabri</MenuItem>
                            <MenuItem value="Kolovica">Kolovica</MenuItem>
                            <MenuItem value="Ulpiana">Ulpiana</MenuItem>
                            <MenuItem value="Bregu i Diellit">Bregu i Diellit</MenuItem>
                        </Select>
                        {errors.zona && <FormHelperText>{errors.zona}</FormHelperText>}
                    </FormControl>
                    
                    <TextField
                        name="qyteti"
                        variant="outlined"
                        label="Qyteti"
                        value={values.qyteti}
                        onChange={handleInputChange}
                        {...(errors.qyteti && { error: true, helperText: errors.qyteti })}
                    />
                     <TextField
                        name="tabelat"
                        variant="outlined"
                        label="Tabelat"
                        value={values.tabelat}
                        onChange={handleInputChange}
                        {...(errors.tabelat && { error: true, helperText: errors.tabelat })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.tipiVetures && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Tipi i vetures</InputLabel>
                        <Select
                            name="tipiVetures"
                            value={values.tipiVetures}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="Heçbek, veturë (Coupe)">Heçbek, veturë (Coupe)</MenuItem>
                            <MenuItem value="SUV (Sport utility vehicle)">SUV (Sport utility vehicle)</MenuItem>
                            <MenuItem value="Kamion (Pickup truck)">Kamion (Pickup truck)</MenuItem>
                            <MenuItem value="MiniBus (Mini Van)">MiniBus (Mini Van)</MenuItem>
                            <MenuItem value="Kabriolet (Cabriolet)">Kabriolet (Cabriolet)</MenuItem>
                            <MenuItem value="Autobus (Bus)">Autobus (Bus)</MenuItem>
                            <MenuItem value="Vetur e vogel (Mini car)">Vetur e vogel (Mini car)</MenuItem>
                            <MenuItem value="Makinë sportive (Roadster)">Makinë sportive (Roadster)</MenuItem>
                        </Select>
                        {errors.tipiVetures && <FormHelperText>{errors.tipiVetures}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Rezervo
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    dShtimList: state.dShtim.list
})

const mapActionToProps = {
    createDShtim: actions.create,
    updateDShtim: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DShtimForm));