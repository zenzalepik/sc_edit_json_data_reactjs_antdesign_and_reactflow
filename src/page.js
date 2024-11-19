import OrgChartApp from "./form/OrgChartApp";
import EmployeeTable from "./form/EmployeeTable";

const StrukturOrganisasiPage = () => {
  return (
    <div
      className="flex flex-row"
      style={{ width: "100%", minHeight: "100vh" }}
    >
      <EmployeeTable />
      <OrgChartApp />
    </div>
  );
};

export default StrukturOrganisasiPage;
