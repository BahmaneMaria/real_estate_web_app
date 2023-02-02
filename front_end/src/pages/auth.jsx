import Footer from "../Componenets/Footer"
import MySection from "../Componenets/MySection"
import NavBar from "../Componenets/NavBarHome"


import Axios from "axios";
function auth() {
 

      const handleClick = (e) => {
        e.preventDefault();
        Axios.get(`http://127.0.0.1:5000/login`, {
          headers: {
            "Access-Control-Allow-Origin": "* ",
            "Access-Control-Allow-Headers": "Content-Type", },}).then((res) => {window.location.assign(res.data.auth_url);})
    };

    return (
    <body className='bg-[#fcfcfc]'>    
    <NavBar/>
    <main style={{ justifyContent: 'center',  boxShadow: '1px 2px 6px #D1D1D2'}} className='rounded-lg items-center  justify-between bg-[#ffffff] ml-20 mr-20 mt-5'>
      
    <MySection style={{ justifyContent: 'center'}} auth={handleClick}/>
    </main>
    <Footer/> </body>






    );
}
export default auth;