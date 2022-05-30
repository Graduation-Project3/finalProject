import { makeStyles } from '@mui/styles';
import { createTheme, height } from '@mui/system';
const theme = createTheme({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
        },
    },
});
const useStyle = makeStyles(() => {
    return {
        // page styles 
        mainColor: {
            color: ' #8D8DAA'
        },


        //home card styles
        
        cards: {
            marginTop:'2rem',
            top:'0px',
            right:'0px',
            bottom:'0px',
            left:'0px',
            backgroundColor: '#fffff',
        },
        cardContent:{
            backgroundColor: '#F7F5F2',
          },
        card: {
            width: '17rem',
            backgroundColor: '#F7F5F2'
        },
        cardContainer: {
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gridTemplateRows: 'auto ',
            rowGap: '3em',
            justifyContent: 'space-evenly',
        },

        cardButton: {
            margin: '5%',
            textAlign: 'center',
        },




    }
}
);
export default useStyle;