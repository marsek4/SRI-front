import styles from "./Table.module.css";

// type BookingsForTable = {
//     time: { start: booking.startTime, end: booking.endTime },
//     laboratory: booking.labId, // надо сделать labName
//     purpose: booking.purpose,
//     access: booking.id,
//     status: booking.status,
// }

type BaseProp = {
  headRow: string[];
};

type ExperimentsTableProps = BaseProp & {
  variant: "experiments";
  body: string;
};

type BookingsTabelProps = BaseProp & {
  variant: "bookings";
  body: number;
};

type TableProps = ExperimentsTableProps | BookingsTabelProps;

const Table = ({ headRow }: TableProps) => {
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
        {/* {experiments.map((exp) => (
          <tr key={exp.id} className={styles.tableBodyRow}>
            <td className={styles.tableBodyCell}>{exp.title}</td>
            <td className={styles.tableBodyCell}>{exp.labId}</td>
            <td className={styles.tableBodyCell}>
              {getExperimentStatusLabel(exp.status)}
            </td>
            <td className={styles.tableBodyCell}>{exp.visibility}</td>
            <td className={styles.tableBodyCell}>{exp.ownerUsername}</td>
            <td className={styles.tableBodyCell}>{exp.sampleCount}</td>
            <td className={styles.tableBodyCell}>{exp.updatedAt}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default Table;
