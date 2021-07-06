import * as React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';

import { titleCase } from '../../../../../lib';
import { AppStatus } from '../../../../common/models';
import { statusColor } from '../utils';

export const AppStatusPopover: React.FC<{ id: string; status: AppStatus }> = React.memo(
	({ id, status }) => {
		const color = statusColor(status.value);
		const value = status.value === 'inDevelopment' ? 'Draft' : titleCase(status.value);

		return (
			<small>
				<span className={`oc-table__text-wrapper oc-table__indicator ${color}`} />
				<span className="oc-table__text-wrapper oc-table__text-status">
					{!status.reason ? (
						value
					) : (
						<OverlayTrigger
							placement="bottom"
							overlay={
								<Popover id={`app-status-reason-${id}`}>
									<Popover.Title>Status Change Reason</Popover.Title>
									<Popover.Content>{status.reason}</Popover.Content>
								</Popover>
							}
						>
							<span>{value}</span>
						</OverlayTrigger>
					)}
				</span>
			</small>
		);
	},
);
