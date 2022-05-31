import { makeStyles } from '@mui/styles';

const useStyle = makeStyles( () => {
    return {
    typo: {
        color: '#008EAF',
        fontFamily: '"Helvetica Neue"'
    },
    link: {
        color: '#8D8DAA',
        textDecoration: 'none'
        ,
        "&:hover": {
            color: "#008EAF",
        }
    },
    page_login:
    {
        display: 'grid',
        margin: '12% auto ',
        width: '40%',
        
    },
    content_login : 
    {
    backgroundColor: "white",
    width: '100%',
    textAlign: 'center',
    padding: '10px 0',
    border: 'solid 2px black',
    borderRadius:' 25px'  
},
form : {
    width: '50%',
    margin:' 0 auto'
    
},
img :{
    width:' 100%',
    height: '100%'
},

}
}
);
export default useStyle;