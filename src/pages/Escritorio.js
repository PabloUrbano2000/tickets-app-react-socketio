import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { useHideMenu } from "../hooks/useHideMenu";

const { Title, Text } = Typography;

export const Escritorio = () => {
  const [usuario] = React.useState(getUsuarioStorage());
  const { socket } = React.useContext(SocketContext);
  const [ticket, setTicket] = React.useState(null);
  const history = useHistory();

  useHideMenu(false);

  const salir = () => {
    localStorage.clear();

    history.replace("/ingresar");
  };

  const siguienteTicket = () => {
    socket.emit("siguiente-ticket-trabajar", usuario, (ticket) => {
      setTicket(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    return <Redirect to="/ingresar" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">5</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={salir}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket ? (
        <Row>
          <Col>
            <Text>Está atendiendo el ticket número: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button onClick={siguienteTicket} type="primary" shape="round">
            <RightOutlined /> Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
