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

    // 北京智慧易 id=1001 或未传 id 的情况）
    return <CompanyDetails />;
};

export default DetailsEntry;

