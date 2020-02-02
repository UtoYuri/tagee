import * as React from 'react';
import _ from 'lodash';

import styles from './WaterfallsFlow.less';

interface Props {
  columns?: number;
  gutter?: number;
  children: JSX.Element[];
}

const WaterfallsFlow = function(props: Props) {
  const { columns, gutter, children } = props;

  return (
    <div className={styles.waterfalls} style={{ columnCount: columns || 5, columnGap: `${gutter || 10}px` }}>
      {
        children && children.map((element: JSX.Element, index: number) => (
          <div className={styles.item} key={`item-${index}`}>{element}</div>
        ))
      }
    </div>
  );
}

export default WaterfallsFlow;
