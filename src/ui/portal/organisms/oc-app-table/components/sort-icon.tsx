import * as React from 'react';

import ArrowDownIcon from '../../../../../assets/img/select-down.svg';
import ArrowUpIcon from '../../../../../assets/img/select-up.svg';
import { SortIconProps } from '../types';

export const SortIcon: React.FC<SortIconProps> = React.memo(
	({ isAscending, ascendingSortIcon, descendingSortIcon }) => {
		if (isAscending) {
			if (!ascendingSortIcon) return <ArrowDownIcon />;

			if (ascendingSortIcon) {
				if (typeof ascendingSortIcon === 'string') {
					return <img src={ascendingSortIcon} className="oc-table__icon-down" alt="Sort by" />;
				}
				return ascendingSortIcon;
			}
		}

		if (!descendingSortIcon) return <ArrowUpIcon />;

		if (descendingSortIcon) {
			if (typeof descendingSortIcon === 'string') {
				return <img src={descendingSortIcon} className="oc-table__icon-down" alt="Sort by" />;
			}
			return descendingSortIcon;
		}

		return null;
	},
);
