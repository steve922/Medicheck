import React, { useState, useEffect } from 'react';
import { Timeline, Button, Progress, Card, Spin, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const PostMarket = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setProgress(0);
    const eventSource = new EventSource('/api/refresh-stream'); // Assuming a streaming endpoint for progress

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.percent);
      if (data.percent === 100) {
        eventSource.close();
        setRefreshing(false);
        // Refetch events
        fetch('/api/events')
          .then((res) => res.json())
          .then(setEvents);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setRefreshing(false);
    };
  };

  const getTagColor = (type) => {
    switch (type) {
      case 'violation':
        return 'red';
      case 'announcement':
        return 'blue';
      case 'fetch':
        return 'green';
      default:
        return 'default';
    }
  };

  return (
    <Spin spinning={loading}>
      <Card
        title="Post-Market Monitoring"
        extra={
          <Button
            type="primary"
            onClick={handleRefresh}
            loading={refreshing}
          >
            Refresh Now
          </Button>
        }
      >
        {refreshing && <Progress percent={progress} />}
        <Timeline mode="alternate">
          {events.map((event) => (
            <Timeline.Item
              key={event.id}
              dot={<ClockCircleOutlined />}
              color={getTagColor(event.type)}
            >
              <p>
                <strong>{event.date}</strong> - <Tag color={getTagColor(event.type)}>{event.type}</Tag> [{event.country}]
              </p>
              <p>{event.summary}</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </Spin>
  );
};

export default PostMarket;
