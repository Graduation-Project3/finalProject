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
                top:'0px',
                right:'0px',
                bottom:'0px',
                left:'0px',
                //   padding: ' 3% 0',
                backgroundColor: '#F7F5F2',
            },
            card: {
                maxWidth: '17rem',
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