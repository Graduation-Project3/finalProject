
    import { makeStyles } from '@mui/styles';
import { color, createTheme, height } from '@mui/system';
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
    
    //product page
    productContainer:{
      
      width:'90%',
      marginLeft:'auto',
      marginRight:'auto',

      
    },
    mainBox:{
      backgroundColor:'#DFDFDE',
      height:'381px',
      width:'80%',
      margin:' auto',
      border: '2px solid #DFDFDE',
  borderRadius: '15px',
      
    },
    imgBox:{
      width:'55%',
      float:'left',
    },
    aucBox:{
      width:'40%',
      float:'left',
      textAlign:'center',
      color:'#8D8DAA',
      borderLeft:' 2px solid black',
      paddingLeft:'40px'
    },
    prodImg:{
      width:'100%',
      height:'20rem'
    },
    prodDesc:{
      display:'block',
      margin:'1rem 0'
    },
    select: {
      "& .MuiOutlinedInput-input": {
        color: "#8D8DAA"
      },
      "& .MuiInputLabel-root": {
        color: "#8D8DAA"
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#8D8DAA"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "red"
      },
      "&:hover .MuiInputLabel-root": {
        color: "#8D8DAA"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#8D8DAA"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#8D8DAA"
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#8D8DAA"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#8D8DAA"
      }
    },
    //responsive 
    [theme.breakpoints.down('tablet')]: { // eslint-disable-line no-useless-computed-key
      navLogo: {
        gridColumn:'1/4',
      },
      navCategories:{
        gridColumn:'5/8',
      },
      navSearch:{
        display:'none'
      },
      navButton:{
        gridColumn:'10/13'
      },
      slider: {
        height: '20rem',
      },
      sliderImage:{
        height:'18rem'
      },
      cardContainer: {
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-evenly',
      },
      loadMore: {
        gridTemplateColumns: 'auto auto ',
        gridAutoRows: 'auto',
        justifyContent: 'space-evenly',
        gridAutoRows: 'auto',

      },
      card:{
        maxWidth: '10rem'
      },
      testomonial: {
        height:'7rem'
      },
      testoContent: {
        marginTop:'2rem'
      },
    },
  }
}
);
export default useStyle;