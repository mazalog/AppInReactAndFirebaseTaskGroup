import React,{useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useFirebaseApp,useFirestore } from "reactfire";
import "firebase/firestore";
import { Box } from "@material-ui/core";
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import ListaGrupos from "./ListaGrupos";
import Grupo from './Grupo'
import GroupIcon from '@material-ui/icons/Group';
import Tarea from "./Tarea";
import UnirmeGrupo from "./UnirmeGrupo";
import GrupoCom from './GrupoCom'
import TareaCom from './TareaCom'


const Grupos = () => {

  const firebase = useFirebaseApp()
  const db = useFirestore();
  const cerrarsesion = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location="/"
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [contenido,setcontenido]=useState(0)

  const [items,setitems]=useState([])

  const mostrargrupos=()=>{
    setcontenido(0)
    }
    const vergrupo=(item)=>{
      setitems(item)
      setcontenido(1)
  }
  const [padres,setpadres]=useState([])
  const mostrarsubtareas=(item,padre)=>{
    setitems(item)
    setpadres(padre)
    setcontenido(2)
  }
  const unirmegrupo=()=>{
    setcontenido(3)
  }
  const vergrupocompartido=(item)=>{
    setitems(item)
    setcontenido(4)
  }
  const mostrarsubtareascom=(item,padre)=>{
    setitems(item)
    setpadres(padre)
    setcontenido(5)
  }
  const vergrupocom=(item)=>{
    setitems(item)
    setcontenido(4)
}



  const determinarcontenido=()=>{  
    switch (contenido) {
      case 0:
        return <ListaGrupos db={db} vergrupo={vergrupo} ></ListaGrupos>
      case 1:
        return <Grupo items={items} mostrarsubtareas={mostrarsubtareas}></Grupo>
      case 2:
        return <Tarea items={items} padre={padres} vergrupo={vergrupo}></Tarea>
      case 3:
        return <UnirmeGrupo vergrupocompartido={vergrupocompartido}></UnirmeGrupo>
      case 4:
        return <GrupoCom items={items} mostrarsubtareascom={mostrarsubtareascom}></GrupoCom>
      case 5:
        return <TareaCom items={items} padre={padres} vergrupocom={vergrupocom}></TareaCom>
      default:
        return <p>Cargando</p>
    }
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid container justify="flex-end" item xs={12}>
        <Tooltip title="Ver grupos">
            <IconButton aria-label="Grupos" color="primary" onClick={()=>mostrargrupos()}>
               <GroupIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Grupos compartidos">
            <IconButton aria-label="Grupos compartidos" onClick={()=>unirmegrupo()}>
               <ScreenShareIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Cerrar sesion">
            <IconButton
              aria-label="cerrar sesion"
              color="secondary"
              onClick={() => cerrarsesion()}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Box
      marginTop={3}
      >
        <Grid item xs={12}>
          {determinarcontenido()}
        </Grid>
      </Box>
    </div>
  );
};

export default Grupos;
