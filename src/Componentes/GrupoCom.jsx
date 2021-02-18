import React,{useState,useEffect} from "react";
import {Grid,Box} from "@material-ui/core/";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import FormAgregarTarea from './FormAgregarTarea'
import Button from '@material-ui/core/Button'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import 'firebase/firestore'
import {useFirestore} from 'reactfire'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Alert from '@material-ui/lab/Alert'
import ModaMiembros from './ModalMiembros'





const Grupo = (props) => {

    const [addtarea,setaddtarea]=useState(false)
    const abriraddtarea=()=>{
     setaddtarea(true)
    }
    const cerraraddtarea=()=>{
     setaddtarea(false)
    }
    
    const tareainicial={tarea:"",recurso:"",fechatarea:new Date}
    const [tarea,settarea]=useState(tareainicial)
    const handleInputChange=(event)=>{
    settarea({
      ...tarea,[event.target.name]:event.target.value
    })
    }
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
    const db=useFirestore()
    const onSubmit=(event)=>{
      event.preventDefault()
      event.target.reset()
        db.collection(props.items.direccion+"/tareas")
        .add({
          tarea:tarea.tarea,
          recurso:tarea.recurso,
          fechaentrega:tarea.fechatarea
        })
        .then(function(docRef){
          console.log('Documento subido')
        })
        .catch(function(error){
          console.log('ocurrio un error')
        })
    }
    
    const [tareas,settareas]=useState([])

    const [miembros, setmiembros] = useState([]);
    const mostrarmiembros = () => {
        db.collection(props.items.direccion+"/miembros").onSnapshot(
          (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            setmiembros(docs);
            console.log(miembros)
          }
        );
    };

    const mostrartareas=()=>{
          db.collection(props.items.direccion+"/tareas")
          .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
          })
          settareas(docs)
        })
    }
    useEffect(() => {
      mostrarmiembros()
      mostrartareas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const  fechaentrega=(fecha)=> {
      var dia = fecha.getDate(),
        mes = fecha.getMonth(),
        año = fecha.getFullYear();
      var meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Otubre",
        "Noviembre",
        "Diciembre",
      ];
      var pdia = dia,
        pmes = meses[mes],
        paño = año;
      return pdia + " de " + pmes + " del " + paño; 
    }
  

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button variant="outlined" color="default" startIcon={<PeopleOutlineIcon/>}>
               {props.items.grupo}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" size="small" color="primary" onClick={()=>handleClickOpen()}>
                Ver miembros
          </Button>
        </Grid>
        <Grid container justify="flex-start" item xs={6}>
          <p>
            <b>Tareas</b>
          </p>
        </Grid>
        <Grid container justify="flex-end" item xs={6}>
          <Tooltip title="Agregar una tarea">
            <IconButton aria-label="Agregar una tarea" color="primary" onClick={()=>abriraddtarea()}>
              <PlaylistAddIcon></PlaylistAddIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {
        addtarea?(
          <FormAgregarTarea tarea={tarea} cerraraddtarea={cerraraddtarea} handleInputChange={handleInputChange} onSubmit={onSubmit}/>
        ):(
         <p></p>
        )
      }
      {
        tareas.length!==0?(

          <List>
          {
            tareas.map((item,index)=>
            <ListItem key={index} onClick={()=>props.mostrarsubtareascom(item,props.items)} button>
                  <ListItemText primary={item.tarea} secondary={("Entrega: "+fechaentrega(item.fechaentrega.toDate()))}></ListItemText>
            </ListItem>
            )
          }     
          </List>

        ):(
          <Box
          marginTop={2}
          >
          <Alert severity="warning">
            Aun no hay tareas en este grupo.<strong></strong>
          </Alert>
          </Box>
        )
      }
      <ModaMiembros
      open={open}
      handleClose={handleClose}
      mostrarmiembros={mostrarmiembros}
      miembros={miembros}
      >
      </ModaMiembros>

    </div>
  );
};

export default Grupo;
