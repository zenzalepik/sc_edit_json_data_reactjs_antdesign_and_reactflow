// EmployeeTableComponent.js
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { nodes, edges } from "../nodes-edges";

const EmployeeTableComponent = ({ form, openModal }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newLeader, setNewLeader] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: ["data", "name"],
      key: "name",
    },
    {
      title: "Position",
      dataIndex: ["data", "position"],
      key: "position",
    },
    {
      title: "Leader",
      key: "leader",
      render: (_, record) => {
        const leaderEdge = edges.find((edge) => edge.target === record.id);
        const leader = leaderEdge
          ? nodes.find((n) => n.id === leaderEdge.source)
          : null;
        return leader ? leader.data.name : "None";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => openModal(record.id)}>
          Update Leader
        </Button>
      ),
    },
  ];

  // Handle opening the modal and setting the selected employee
  const openModalHandler = (employeeId) => {
    const employee = nodes.find((node) => node.id === employeeId);
    setSelectedEmployee(employee);
    const leaderEdge = edges.find((edge) => edge.target === employeeId);
    if (leaderEdge) {
      const leader = nodes.find((node) => node.id === leaderEdge.source);
      setNewLeader(leader ? leader.data.name : "");
    } else {
      setNewLeader("");
    }

    form.setFieldsValue({
      name: employee.data.name,
      position: employee.data.position,
      leader: newLeader,
    });
  };

  useEffect(() => {
    if (selectedEmployee) {
      form.setFieldsValue({
        leader: newLeader, // Set leader value in form when modal opens
      });
    }
  }, [selectedEmployee, form, newLeader]);

  return (
    <Table
      columns={columns}
      dataSource={nodes}
      rowKey="id"
      pagination={false}
      onRow={(record) => ({
        onClick: () => openModalHandler(record.id),
      })}
    />
  );
};

export default EmployeeTableComponent;
