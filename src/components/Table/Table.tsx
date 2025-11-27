import type { ReactElement, ReactNode } from "react";
import { isValidElement, memo } from "react";
import { Link } from "~/components/Link";
import { trackEvent } from "~utils/analytics";
import * as styles from "./Table.css";

type TableCell =
	| string
	| number
	| ReactElement
	| null
	| undefined
	| {
			value: string | number | null | undefined;
			className?: string;
			href?: string;
			isLink?: boolean;
			linkProps?: {
				track?: boolean;
				trackLabel?: string;
				trackCategory?: string;
				trackParams?: Record<string, unknown>;
				variant?: "inherit" | "default" | "blue" | "navy" | "yellow";
				underline?: "none" | "hover" | "always";
				size?: "inherit" | "small" | "medium" | "large";
				weight?: "normal" | "medium" | "bold";
			};
	  };

type Props = {
	thead: string[];
	colSpan?: number;
	tbody: Array<Array<TableCell>>;
	tfoot?: string[];
	// Analytics props
	track?: boolean;
	trackLabel?: string;
	trackCategory?: string;
	onSort?: (columnIndex: number) => void;
	sortableColumns?: number[]; // Array of column indices that are sortable
};

const TableComponent: React.FC<Props> = ({
	thead,
	tbody,
	tfoot,
	colSpan = 0,
	track = false,
	trackLabel,
	trackCategory,
	onSort,
	sortableColumns = [],
}) => {
	const handleSort = (columnIndex: number) => {
		if (onSort && sortableColumns.includes(columnIndex)) {
			if (track) {
				trackEvent("table_sort", {
					event_category: trackCategory || "table_interaction",
					table_name: trackLabel || "data_table",
					sort_column_index: columnIndex,
					sort_column_name: thead[columnIndex],
				});
			}
			onSort(columnIndex);
		}
	};

	const renderCellContent = (cell: TableCell): ReactNode => {
		// Handle null/undefined
		if (cell === null || cell === undefined) {
			return null;
		}

		// Handle object with value and className
		if (typeof cell === "object" && !isValidElement(cell) && "value" in cell) {
			const { value, href, isLink, linkProps } = cell;

			// Return null/undefined as-is
			if (value === null || value === undefined) {
				return null;
			}

			// If it's configured as a link, render using Link component
			if (isLink && href && typeof value === "string") {
				return (
					<Link
						href={href}
						className={cell.className}
						track={linkProps?.track}
						trackLabel={linkProps?.trackLabel}
						trackCategory={linkProps?.trackCategory}
						trackParams={linkProps?.trackParams}
						variant={linkProps?.variant}
						underline={linkProps?.underline}
						size={linkProps?.size}
						weight={linkProps?.weight}
					>
						{value}
					</Link>
				);
			}

			// Check if value is a valid React element and return it directly
			if (isValidElement(value)) {
				return value;
			}

			// Return primitive values (string, number)
			return value;
		}

		// Check if cell itself is a valid React element and return it directly
		if (isValidElement(cell)) {
			return cell;
		}

		// Return primitive values (string or number)
		return cell;
	};

	const getCellClassName = (cell: TableCell, baseClassName: string): string => {
		if (
			cell &&
			typeof cell === "object" &&
			!isValidElement(cell) &&
			"className" in cell &&
			cell.className
		) {
			return `${baseClassName} ${cell.className}`;
		}
		return baseClassName;
	};

	const generateRowKey = (row: Array<TableCell>, rowIndex: number): string => {
		const firstCell = row[0];

		if (typeof firstCell === "string" || typeof firstCell === "number") {
			return `${firstCell}-${rowIndex}`;
		}

		if (
			firstCell &&
			typeof firstCell === "object" &&
			!isValidElement(firstCell) &&
			"value" in firstCell
		) {
			const { value } = firstCell;
			if (typeof value === "string" || typeof value === "number") {
				return `${value}-${rowIndex}`;
			}
		}

		return `row-${rowIndex}`;
	};

	// Guard against invalid data
	if (!thead || !Array.isArray(thead)) {
		return null;
	}

	if (!tbody || !Array.isArray(tbody)) {
		return null;
	}

	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr>
					{thead.map((header, index) => {
						const isSortable = sortableColumns.includes(index);
						return (
							<th
								key={header}
								colSpan={colSpan || undefined}
								className={styles.th}
								onClick={isSortable ? () => handleSort(index) : undefined}
								style={{
									cursor: isSortable ? "pointer" : "default",
									userSelect: isSortable ? "none" : "auto",
								}}
								role={isSortable ? "button" : undefined}
								tabIndex={isSortable ? 0 : undefined}
								aria-label={isSortable ? `Sort by ${header}` : undefined}
							>
								{header}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{tbody.length === 0 ? (
					<tr>
						<td
							colSpan={thead.length}
							className={styles.td}
							style={{ textAlign: "center", padding: "2rem" }}
						>
							No data available
						</td>
					</tr>
				) : (
					tbody.map((row, rowIndex) => {
						const uniqueRowKey = generateRowKey(row, rowIndex);

						return (
							<tr key={uniqueRowKey} className={styles.tr}>
								{row.map((cell, cellIndex) => {
									const cellKey = `${uniqueRowKey}-cell-${cellIndex}`;
									const content = renderCellContent(cell);
									const cellClassName = getCellClassName(
										cell,
										cellIndex === 0 ? styles.th : styles.td,
									);

									if (cellIndex === 0) {
										return (
											<th key={cellKey} scope="row" className={cellClassName}>
												{content}
											</th>
										);
									} else {
										return (
											<td key={cellKey} className={cellClassName}>
												{content}
											</td>
										);
									}
								})}
							</tr>
						);
					})
				)}
			</tbody>
			{tfoot && (
				<tfoot className={styles.tfoot}>
					<tr>
						{tfoot.map((footer) => (
							<th key={footer} colSpan={colSpan || undefined} className={styles.th}>
								{footer}
							</th>
						))}
					</tr>
				</tfoot>
			)}
		</table>
	);
};

export const Table = memo(TableComponent);
