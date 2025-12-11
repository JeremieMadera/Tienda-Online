import './Contentsection.css';
import { Fa6SolidBoxOpen } from '../../components/Logos/Fa6SolidBoxOpen';
import { FluentPremium12Filled } from '../../components/Logos/FluentPremium12Filled'; 
import {FluentMdl2Market} from'../../components/Logos/FluentMdl2Market';
function Contentsection() {
  return (
    <section className="content-section">
      
      <div className ="Logos-box" ><Fa6SolidBoxOpen/></div>
      <div className="Logos-diamond"><FluentPremium12Filled/></div>
      <div className="Logos-graph"><FluentMdl2Market/></div>


      <div className="discover-design">
        <div className ="text-discover">
          <h2>Discover the best designs</h2>
        </div>
      </div>
      
       
    </section>
  );
}





export default Contentsection;