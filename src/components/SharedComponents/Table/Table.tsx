import styles from "./Table.module.css";
import type { Experiment } from "@/features/experiments/types";
import type { Booking } from "@/features/bookings/types";
import { formatDateTime, formatTime } from "@/utils/utils";

// type BookingsForTable = {
//     time: { start: booking.startTime, end: booking.endTime },
//     laboratory: booking.labId, // надо сделать labName
//     purpose: booking.purpose,
//     access: booking.id,
//     status: booking.status,
// }

const statusLabels: Record<string, string> = {
  EXPERIMENT_STATUS_PLANNED: "Planned",
  EXPERIMENT_STATUS_PAST: "Past",
  // 'EXPERIMENT_STATUS_PLANNED': 'Plannded',
};

const getExperimentStatusLabel = (status: string): string =>
  statusLabels[status] ?? status;

type BaseProp = {
  headRow: string[];
};

type ExperimentsTableProps = BaseProp & {
  variant: "experiments";
  body: Experiment[];
};

type BookingsTabelProps = BaseProp & {
  variant: "bookings";
  body: Booking[];
};

type TableProps = ExperimentsTableProps | BookingsTabelProps;

const Table = ({ headRow, variant, body }: TableProps) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableHeadRow}>
          {headRow.map((header) => (
            <th className={styles.tableHeadCell}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {variant === "bookings"
          ? body.map((booking) => (
              <tr key={booking.id} className={styles.tableBodyRow}>
                <td
                  className={styles.tableBodyCell}
                >{`${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}`}</td>
                <td className={styles.tableBodyCell}>{booking.id}</td>
                <td className={styles.tableBodyCell}>{booking.purpose}</td>
                <td className={styles.tableBodyCell}>{booking.accessNote}</td>
                <td className={styles.tableBodyCell}>{booking.status}</td>
              </tr>
            ))
          : body.map((exp) => (
              <tr key={exp.id} className={styles.tableBodyRow}>
                <td className={styles.tableBodyCell}>{exp.title}</td>
                <td className={styles.tableBodyCell}>{exp.labId}</td>
                <td className={styles.tableBodyCell}>
                  {getExperimentStatusLabel(exp.status)}
                </td>
                <td className={styles.tableBodyCell}>{exp.visibility}</td>
                <td className={styles.tableBodyCell}>{exp.ownerUsername}</td>
                <td className={styles.tableBodyCell}>{exp.sampleCount}</td>
                <td className={styles.tableBodyCell}>
                  {formatDateTime(exp.updatedAt)}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
