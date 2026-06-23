import dayjs from "@calcom/dayjs";
import { getQueryParam } from "@calcom/features/bookings/Booker/utils/query-param";
import { Alert } from "@calcom/ui/components/alert";

// Fork addition (capture client portal): when the portal forwards a selected
// package's validity window as `startDate`/`endDate` query params, the booker
// clamps its calendar to that range (see useTimesForSchedule.ts). This banner
// explains *why* the dates are limited so the client doesn't think availability
// is broken. Renders nothing when neither param is present, so it's inert for
// every normal booking.
const fmt = (ymd: string | null | undefined) => {
  if (!ymd) return "";
  const d = dayjs(ymd); // ISO YYYY-MM-DD parses natively
  return d.isValid() ? d.format("MMM D, YYYY") : "";
};

export const PackageDateBanner = () => {
  const start = fmt(getQueryParam("startDate"));
  const end = fmt(getQueryParam("endDate"));
  if (!start && !end) return null;

  const range = start && end ? `${start} – ${end}` : end ? `up to ${end}` : `from ${start}`;

  return (
    <div className="mb-4">
      <Alert
        severity="info"
        message={
          <>
            Dates are limited to your selected package ({range}). Need a different date? Go back and choose
            “Book &amp; pay separately”.
          </>
        }
      />
    </div>
  );
};

export default PackageDateBanner;
