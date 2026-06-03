import React from "react";
import { useSearchParams } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import SuzhouCompanyDetails from "./SuzhouCompanyDetails";

const DetailsEntry: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    if (id === "2549") {
        return <SuzhouCompanyDetails />;
    }

    // 鑫合易家（默认演示主体）或未传 id
    return <CompanyDetails />;
};

export default DetailsEntry;

