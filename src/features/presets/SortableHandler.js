import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import Icon from '~/common/Icon';

const Handler = () => (
  <div className="sortable-handler">
    <Icon type="menu" />
  </div>
);

export default SortableHandle(Handler);