import React from "react";
import ShoeCard from "../components/ShoeCard";
import { v4 as uuid } from "uuid";

function ShoesPage({ shoes }) {
  console.log(shoes);
  return (
    <div>
      ShoesPage
      <div className="shoes-container">
        {shoes.map((shoe) => {
          return (
            <ShoeCard
              key={uuid()}
              {...shoe}
              // shoes={shoes}
              // dispatchShoes={dispatchShoes}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ShoesPage;

// import { Link } from "react-router-dom";

// function Products() {
//   return (
//     <div>
//       <h1>Products page</h1>
//       <ul>
//         <li>
//           <Link to="/products/p1">book</Link>
//         </li>
//         <li>
//           <Link to="/products/p2">car</Link>
//         </li>
//         <li>
//           <Link to="/products/p3">online course</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }
