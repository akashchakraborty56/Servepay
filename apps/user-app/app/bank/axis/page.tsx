    import { Suspense } from "react";
import AxisBankPage from "./components/axis";

export default function () {



  return (
    <Suspense fallback={<div>Loading Axis Bank Page...</div>}>
      <AxisBankPage />
    </Suspense>
  );

}