/*
    ***** BEGIN LICENSE BLOCK *****

    Copyright © 2020 Corporation for Digital Scholarship
                     Vienna, Virginia, USA
                     https://digitalscholar.org

    This file is part of Zotero.

    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.

    ***** END LICENSE BLOCK *****
*/

'use strict';

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function CreateParent({ loading, item, toggleAccept }) {
	// With React 18, this is required for the window's dialog to be properly sized
	const ref = useRef();
	useEffect(() => {
		// Wait for Fluent to inject translated strings before resizing the dialog (fixes #5365).
		const observer = new MutationObserver(() => window.sizeToContent());
		observer.observe(ref.current, { childList: true, subtree: true });
		return () => {
			observer.disconnect();
		};
	}, []);

	// When the input has/does not have characters toggle the accept button on the dialog
	const handleInput = (e) => {
		if (e.target.value.trim() !== '') {
			toggleAccept(true);
		}
		else {
			toggleAccept(false);
		}
	};

	return (
		<div className="create-parent-container" ref={ ref }>
			<div className="title">
				{ item.attachmentFilename }
			</div>
			<p className="intro" data-l10n-id="create-parent-intro"/>
			<div className="body">
				<input
					id="parent-item-identifier"
					size="50"
					autoFocus={true}
					disabled={loading}
					onChange={handleInput}
				/>
				<div
					mode="undetermined"
					className={cx('downloadProgress', { hidden: !loading })}
				>
					<div className="progress-bar"></div>
				</div>
			</div>
		</div>
	);
}


CreateParent.propTypes = {
	loading: PropTypes.bool,
	item: PropTypes.object,
	toggleAccept: PropTypes.func
};

Zotero.CreateParent = memo(CreateParent);


Zotero.CreateParent.render = (root, props) => {
	root.render(<CreateParent { ...props } />);
};
