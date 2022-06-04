import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';

const useStyle = makeStyles(() => {
    return {
        typo: {
            color: '#000000',
            fontFamily: '"Helvetica Neue"'
        },
        link: {
            color: '#000000',
            textDecoration: 'none'
            ,
            "&:hover": {
                color: "#000000",
            }
        },
        page_login:
        {
            marginTop: '5%',
            marginLeft:'43%',
            display: 'grid',
            width: '35%',
            
        },
        content_login:
        {
            backgroundColor: "white",
            width: '100%',
            textAlign: 'center',
            padding: '10px 0',
            border: 'solid 2px black',
            borderRadius: ' 10px',
            height:'110%',
            marginTop:'auto',
            marginLeft:'50px'
        },
        form: {
            width: '50%',
           marginRight:'auto',
           marginLeft:'auto',
           marginTop:'10%',
           marginBottom:'auto'
            

        },
        img: {
            width: ' 100%',
            height: '100%'
        },

    }
}
);
export default useStyle;