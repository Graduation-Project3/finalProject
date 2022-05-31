
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
    // page styles 
    mainColor: {
      color: ' #8D8DAA'
    },
    cursor: {
      color: ' #8D8DAA',
      "&:hover": {
        cursor: 'pointer'
      }
    },
    //navbar styles
    dis: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridAutoColumns: '1fr',
      backgroundColor: '#F7F5F2',
    },
    searchButton:{
      cursor:"pointer",
    },
    nav: {
      padding: ' 0.9rem 2rem',
      backgroundColor: '#F7F5F2',
      color: ' #8D8DAA',
      height: ' 40px',
      width: 'auto',
    },
    navLogo: {
      gridColumn:'1',
      gridRow:'1',
    },
    navCategories: {
      gridRow: '1',
      gridColumn: '3/6',
      position:'relative',
      
    },
    navSearch: {
      gridColumn:'7/10',
      gridRow:'1',
    },
    addItem:{
      gridColumn:'11',
      gridRow:'1',
    },
    navButton: {
      gridColumn:'12',
      gridRow:'1',
    },
    navItem: {
      float: 'left',
    },
    categoriesText: {
      position: 'absolute',
      top: '0.001px',
      display: 'inline',
    },
    catContainer: {
      position: 'relative',
      top :'7px'
    },
    //slider styles
    cas:{
      height:'26rem'
    },
    slider: {
      height: '23rem',
      display: 'block',
      position: 'static',
    },
    sliderButtons: {
      backgroundColor: 'gray',
      borderRadius: 20,
      padding: '10px',
      margin: '0 20px',
    },
    sliderContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',

    },
    sliderImage: {
      width: '100%',
      minHeight: '100%',
    },
    sliderText: {
      position: 'absolute',
      backgroundColor: '#F56D91',
      width: '20%',
      padding: '1%',
      opacity: '0.7',
      bottom: '10%',
      left: '7%',
      color: 'aliceblue',
      float: 'left',
    },
    sliderButtono: {
     
    },
    //home card styles
    cards: {
      width: '100%',
      padding: ' 3% 0',
      
    },
    card:{
      maxWidth: '17rem',
      margin:'1rem',
      
    },
    cardContent:{
      backgroundColor: '#F7F5F2',
      height:'100%'
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      gridTemplateRows: 'auto ',
      gridAutoRows: '0',
      justifyContent: 'space-evenly',
    },
    loadMore: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      gridTemplateRows: 'auto ',
      gridAutoRows: '0',
      justifyContent: 'space-evenly',
      gridAutoRows: 'auto',
    },
    cardButton: {
      margin: '5%',
      textAlign: 'center',
    },
    arrow: {
      borderRdius: '25px',
      color: '#8D8DAA',
    },
    detailsButton:{
      color:'red'
    },
    //testomonial styles
    testomonial: {
      display: 'block',
      position: 'static',
      backgroundColor: '#F7F5F2',
      height:'10rem'
    },
    testoContent: {
      textAlign: 'center',
      marginTop:'4rem'
    },
    //footer styles
    footer: {
      padding: '2% 10%',
      width: '80%',
      height:'8rem',
      gridTemplateColumns: 'auto auto',
      justifyContent: 'space-evenly',
      backgroundColor: ' #8D8DAA',
      color: '#F7F5F2',
      textAlign:'center'
    },
    aboutUs: {
      width: '50%',
      float:'left',
      textAlign:'center',
    },
    //product page
    productContainer:{
      backgroundColor:'#DFDFDE',
      width:'100%',
    },
    mainBox:{
      height:'430px',
      width:'80%',
      margin:' auto',
      
    },
    imgBox:{
      width:'50%',
      float:'left',
    },
    aucBox:{
      width:'50%',
      float:'left',
      textAlign:'center',
      color:'#8D8DAA'
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
        height:'18rem',
        zIndex :'-2',
      },
      sliderText:{
        zIndex :'1',
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