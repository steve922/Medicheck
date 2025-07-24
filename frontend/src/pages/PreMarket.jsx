import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Card, Modal, Spin } from 'antd';
import { Gauge, G2 } from '@ant-design/plots';

const { Option } = Select;

const PreMarket = () => {
  const [riskData, setRiskData] = useState({ score: 0, breakdown: {} });
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/risk?country=${selectedCountry}`)
      .then((res) => res.json())
      .then((data) => {
        setRiskData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCountry]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const { score, breakdown } = riskData;

  const config = {
    percent: score / 100,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
        formatter: () => `${score}`,
      },
      content: {
        offsetY: 36,
        style: {
          fontSize: '24px',
          color: '#4B535E',
        },
        formatter: () => 'Risk Score',
      },
    },
  };

  return (
    <Spin spinning={loading}>
      <Card title="Pre-Market Risk Assessment">
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col>
            <span>Select Country:</span>
            <Select
              defaultValue="US"
              style={{ width: 120, marginLeft: 8 }}
              onChange={setSelectedCountry}
            >
              <Option value="US">USA</Option>
              <Option value="EU">EU</Option>
              <Option value="CN">China</Option>
            </Select>
          </Col>
        </Row>
        <div onClick={showModal} style={{ cursor: 'pointer' }}>
          <Gauge {...config} />
        </div>
        <Modal
          title="Risk Score Breakdown"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {Object.entries(breakdown).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value.value} (Score: {value.score}, Weight: {value.weight})
            </p>
          ))}
        </Modal>
      </Card>
    </Spin>
  );
};

export default PreMarket;
