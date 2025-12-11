import { BodyHeaderBooking } from '../components/bookingManagement/BodyHeaderBooking';
import { StatCardsBooking } from '@/components/bookingManagement/StatCardsBooking';
import { BookingsFilters } from '@/components/bookingManagement/BookingFilters';
import { QuickActionsBooking } from '@/components/bookingManagement/QuickActionsBooking';
import { LastUpdatesBooking } from '@/components/bookingManagement/LastUpdatesBooking/LastUpdatesBooking';
import { BookingEmploymentGrid } from '@/components/bookingManagement/BookingEmploymentGrid';
import { WorkloadStats } from '@/components/bookingManagement/WorkloadStats';
import { UpcomingEvents } from '@/components/bookingManagement/UpcomingEvents/UpcomingEvents';

const handleAction = (action: string) => console.log(`Action: ${action}`);

export function BookingManagementPage() {
  return (
    <>
      <BodyHeaderBooking
          onExport={() => handleAction('Export')}
          onImport={() => handleAction('Import')}
          onAddAuditorium={() => handleAction('Add auditorium')} 
      />
      <StatCardsBooking />
      <BookingsFilters />
      <BookingEmploymentGrid />
      <QuickActionsBooking />
      <LastUpdatesBooking /> 
      <WorkloadStats />
      <UpcomingEvents />
    </>
  );
}