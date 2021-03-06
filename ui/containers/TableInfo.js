import React, { useState } from 'react';
import useSWR from 'swr';
import Fuse from 'fuse.js';

import * as kubectl from '../kubectl';
import PageHeader from '../components/PageHeader';
import ProgressBar from '../components/ProgressBar';

export default function TableInfo({ title, namespace, command, children }) {
  const [search, setSearch] = useState('');
  const { data: response, revalidate, isValidating } = useSWR(
    [namespace, command],
    kubectl.exec,
    { suspense: true }
  );

  const { data } = response || {};

  // TODO validate error

  let fuse = new Fuse(data.items, {
    keys: ['metadata.name']
  });
  return (
    <div>
      {isValidating && <ProgressBar />}
      <PageHeader
        title={title}
        showSearch={true}
        search={search}
        onSearch={text => setSearch(text)}
        onRefresh={() => revalidate()}
      />
      {children(search ? fuse.search(search, { limit: 10 }) : data.items)}
    </div>
  );
}
