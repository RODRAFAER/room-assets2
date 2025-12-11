import { StatCards } from "../components/catalogAuditorious/StatCards/StatCards";
import { BodyHeader } from "../components/catalogAuditorious/BodyHeader";
import { BodyFilters } from "../components/catalogAuditorious/BodyFilters";
import { RoomsTable } from '../components/catalogAuditorious/RoomsTable/RoomsTable';
import { QuickActions } from "../components/catalogAuditorious/QuickActions";
import { LastUpdates } from "../components/catalogAuditorious/LastUpdates";
import { Equipment } from "../components/catalogAuditorious/Equipment";
import { RoomsSchema } from "../components/catalogAuditorious/RoomsSchema";

const handleAction = (action: string) => console.log(`Action: ${action}`);

export function AuditoriumCataloguePage() {
  return (
    <>
      <BodyHeader
        onExport={() => handleAction('Export')}
        onImport={() => handleAction('Import')}
        onAddAuditorium={() => handleAction('Add auditorium')} 
      />
      <StatCards/>
      <BodyFilters/>
      <RoomsTable />
      <QuickActions />
      <LastUpdates />
      <Equipment />
      <RoomsSchema />

    </>
  );
}