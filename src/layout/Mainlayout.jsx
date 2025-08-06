import { Outlet } from "react-router-dom";
import Navtab from "../components/Navtab";
// export default function Mainlayout() {
//   return (
//     <div className='w-full h-screen relative '>
//         <Outlet />
//         <div className='sticky bottom-0'>
//             <Navtab />
//         </div>

//     </div>
//   )
// }
export function Mainlayout() {
  return (
    <div className="w-full h-screen relative">
      <div className="h-full overflow-auto pb-16">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Navtab />
      </div>
    </div>
  );
}
