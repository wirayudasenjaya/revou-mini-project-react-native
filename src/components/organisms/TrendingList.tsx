import {useCallback, useEffect, useState} from 'react';

import fetch from '../../utils/fetch';
import Feed from './Feed';
import {PostProps} from '../../utils/types';

export default function TrendingList({navigation}: any) {
  const [data, setData] = useState<Array<PostProps>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getData = useCallback((pageParams: number) => {
    fetch.getSocial(
      `/v2/feed?sort_by=engagement&page=${pageParams}&perpage=10`,
      {
        success: response => {
          setData(prev => [...prev, ...response.data.data]);
          setLoading(false);
        },
        error: error => {
          console.log(error);
        },
      },
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData(1);
    setRefreshing(false);
  }, [getData]);

  useEffect(() => {
    getData(page);
  }, [page, getData]);

  const onEndReach = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Feed
      loading={loading}
      data={data}
      onRefresh={onRefresh}
      refreshing={refreshing}
      navigation={navigation}
      onEndReach={onEndReach}
    />
  );
}
