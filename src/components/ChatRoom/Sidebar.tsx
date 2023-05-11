import { Col, Row } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  background-color: #3f0e40;
  color: white;
  height: 100vh;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </StyledSidebar>
  );
};

export default Sidebar;
