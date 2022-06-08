import { useNavigate } from "react-router-dom";
import not  from "../styles/404.svg";
import React from "react";



function Notfound() {
  const history = useNavigate();
  const goBack = () => {
      history(-1)
  }

    return(
        <section className=" bg-light d-flex justify-content-center align-items-center vh100 text-center">
            <div>
              <h1>Not Found </h1>
              <img src={not} alt="Not Found Page"/>
          
              <br/>
              <p>page is not available.</p>
              
                <div className="flex-row">
                  <button onClick={goBack} 
                 className=" btn btn-primary">Go Back </button>
              </div>
            </div>
         
        </section>
    )
}
export default Notfound;