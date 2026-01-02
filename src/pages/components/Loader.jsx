import  LoaderContainer from "../../assets/LoaderContainer.svg";
export default function Loader() {
  return (
    <div >
       <img className= "loader" src={LoaderContainer}/>
        <span>Loading...</span>
    </div>
  );
}