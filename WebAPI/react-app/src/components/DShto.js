import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dShtim";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DShtimForm from "./DShtimForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DShto = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDShto() // eslint-disable-next-line
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDShtim(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DShtimForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Zona</TableCell>
                                    <TableCell>Qyteti</TableCell>
                                    <TableCell>Tabelat</TableCell>
                                    <TableCell>Tipi i vetures</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dShtimList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.zona}</TableCell>
                                            <TableCell>{record.qyteti}</TableCell>
                                            <TableCell>{record.tabelat}</TableCell>
                                            <TableCell>{record.tipiVetures}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dShtimList: state.dShtim.list
})

const mapActionToProps = {
    fetchAllDShto: actions.fetchAll,
    deleteDShtim: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DShto));