
import styles from "./page.module.css";

const recents = [
  {
    "distance": 11,
    "name": "Lotte Mall West Lake Hanoi - Shopping Mall - Lac Long Quan Gate",
    "address": "685 Lac Long Quan, P.Phu Thuong, Q.Tay Ho, Ha Noi, 10000, Vietnam"
  },
  {
    "distance": 8,
    "name": "Yen So Park - Welcome Gate",
    "address": "P.Yen So, Q.Hoang Mai, Ha Noi, 10000, Vietnam"
  }
];

const Booking = () => (
  <div className="d-flex ">
    <div id="sidebar" className="d-flex flex-column flex-shrink-0 p-3 bg-light w-50" >
      <div className="d-flex w-100">
        <div className="m-1" style={{flexGrow: 1}}>
          <input type="text" className="form-control m-1" />
          <input type="text" className="form-control m-1" />
        </div>
        <div className="d-flex flex-column align-items-center m-2">
          <i className="bi bi-plus-circle"></i>
          <p> Add </p>
        </div>
      </div>
      <p className="h5 m-1"> Recent </p>
      <ul className="nav nav-pills flex-column mb-auto">
        {
          recents.map((item, index) => {
            return (
              <li className=" d-flex m-1" key={index}>
                {index ? <hr className="m-0"/> : ""}
                <div className="d-flex flex-column justify-content-center align-items-center m-3">
                  <i className="bi bi-clock-fill text-primary "></i>
                  {item["distance"] + "km"}
                </div>
                <div className="d-flex flex-column m-3">
                  <p className="h6 fw-bold">{item["name"]}</p>
                  <p className="" style={{"fontSize": "12px"}}>{item["address"]}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
    <div>
      Map
    </div>
  </div>
);

export default Booking;
