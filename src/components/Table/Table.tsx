import type { ReactNode } from "react";
import * as styles from "./Table.css";

type TableCell =
	| string
	| ReactNode
	| {
			value: string | ReactNode;
			className?: string;
	  };

type Props = {
	thead: string[];
	colSpan?: number;
	tbody: Array<Array<TableCell>>;
	tfoot?: string[];
};

export const Table: React.FC<Props> = ({ thead, tbody, tfoot, colSpan = 0 }) => {
	return (
		<table className={styles.table}>
			{thead && (
				<thead className={styles.thead}>
					<tr>
						{thead.map((header) => (
							<th
								key={typeof header === "string" ? header : undefined}
								colSpan={colSpan}
								className={styles.th}
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
			)}
			<tbody>
				{tbody.map((row, rowIndex) => {
					// Always guarantee unique row and cell keys
					let rowKey: string | undefined;
					const firstCell = row[0];
					if (
						typeof firstCell === "object" &&
						firstCell &&
						"key" in firstCell &&
						typeof firstCell.key === "string"
					) {
						rowKey = String(firstCell.key);
					} else if (typeof firstCell === "string") {
						rowKey = `${firstCell}`;
					} else if (
						firstCell &&
						typeof firstCell === "object" &&
						"value" in firstCell &&
						typeof firstCell.value === "string"
					) {
						rowKey = `${firstCell.value}`;
					}
					// Always append rowIndex for uniqueness
					const uniqueRowKey = rowKey !== undefined ? `${rowKey}-${rowIndex}` : `${rowIndex}`;
					return (
						<tr key={uniqueRowKey} className={styles.tr}>
							{row.map((cell, cellIndex) => {
								// Always append cellIndex for uniqueness
								const cellKey = `${uniqueRowKey}-cell-${cellIndex}`;
								if (cellIndex === 0) {
									return (
										<th
											key={cellKey}
											scope="row"
											className={`${styles.th} ${
												cell && typeof cell === "object" && "className" in cell && cell.className
													? cell.className
													: ""
											}`}
											{...(typeof cell === "string" && cell.includes("<a")
												? { dangerouslySetInnerHTML: { __html: cell } }
												: {})}
										>
											{cell && typeof cell === "object" && "value" in cell
												? cell.value
												: typeof cell === "string" && !cell.includes("<a")
													? cell
													: null}
										</th>
									);
								} else {
									return (
										<td
											key={cellKey}
											className={`${styles.td} ${
												cell && typeof cell === "object" && "className" in cell && cell.className
													? cell.className
													: ""
											}`}
											{...(typeof cell === "string" && cell.includes("<a")
												? { dangerouslySetInnerHTML: { __html: cell } }
												: {})}
										>
											{cell && typeof cell === "object" && "value" in cell ? cell.value : cell}
										</td>
									);
								}
							})}
						</tr>
					);
				})}
			</tbody>
			{tfoot && (
				<tfoot className={styles.tfoot}>
					<tr>
						{tfoot.map((footer) => (
							<th
								key={typeof footer === "string" ? footer : undefined}
								colSpan={colSpan}
								className={styles.th}
							>
								{footer}
							</th>
						))}
					</tr>
				</tfoot>
			)}
		</table>
	);
};
