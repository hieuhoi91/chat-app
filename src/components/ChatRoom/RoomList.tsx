import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import useFirestore from '../../hook/useFirestore';
import { AuthContext } from '../Context/AuthProvider';
import { IDocument, IUser } from '../../types';
import { useContext, useMemo } from 'react';
import { AppContext } from '../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const ButtonStyled = styled(Button)`
  color: white;
  &&&:hover {
    color: white;
  }
`;

const RoomList = () => {
  const rooms = useContext(AppContext) as IDocument[];

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header="Danh sách các phòng" key={1}>
        {rooms.map(room => (
          <LinkStyled>Room 1</LinkStyled>
        ))}

        <ButtonStyled type="text" icon={<PlusSquareOutlined />}>
          Thêm phòng
        </ButtonStyled>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;
