import HDFCBankPage from "./components/hdfc";
import { Suspense } from "react";

export default function () {
    return (
        <Suspense fallback={<div>Redirecting ...</div>}>
            <HDFCBankPage></HDFCBankPage>
        </Suspense>
    )
}