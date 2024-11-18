// src/components/EmployeeTable.js
// EmployeeTable.js
import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { nodes, edges } from "../nodes-edges";
import EmployeeTableComponent from "./EmployeeTableComponent";

function EmployeeTable() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeader, setNewLeader] = useState("");
  const [form] = Form.useForm();

  const openModal = (employeeId) => {
    const employee = nodes.find((node) => node.id === employeeId);
    setSelectedEmployee(employee);
    setIsModalOpen(true);

    // Find the leader of the selected employee
    const leaderEdge = edges.find((edge) => edge.target === employeeId);
    if (leaderEdge) {
      const leader = nodes.find((node) => node.id === leaderEdge.source);
      setNewLeader(leader ? leader.data.name : "");
    } else {
      setNewLeader("");
    }

    // Set values on the form when the modal opens
    form.setFieldsValue({
      name: employee.data.name,
      position: employee.data.position,
      leader: newLeader,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewLeader("");
    form.resetFields();
  };

  const updateLeader = (values) => {
    if (!selectedEmployee || !values.leader) return;

    const newLeaderId = nodes.find(
      (node) => node.data.name === values.leader
    )?.id;
    if (newLeaderId) {
      const existingEdge = edges.find(
        (edge) => edge.target === selectedEmployee.id
      );
      if (existingEdge) {
        existingEdge.source = newLeaderId;
      } else {
        edges.push({
          id: `e${newLeaderId}-${selectedEmployee.id}`,
          source: newLeaderId,
          target: selectedEmployee.id,
        });
      }
    }

    updateEmployee(values);

    closeModal();
  };

  const updateEmployee = (values) => {
    if (!selectedEmployee) return;

    selectedEmployee.data.name = values.name;
    selectedEmployee.data.position = values.position;

    const newLeaderId = nodes.find((node) => node.data.name === values.leader)?.id;
    if (newLeaderId) {
      const existingEdge = edges.find((edge) => edge.target === selectedEmployee.id);
      if (existingEdge) {
        existingEdge.source = newLeaderId;
      } else {
        edges.push({
          id: `e${newLeaderId}-${selectedEmployee.id}`,
          source: newLeaderId,
          target: selectedEmployee.id,
        });
      }
    }

    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Table</h1>

      {/* Employee table component */}
      <EmployeeTableComponent form={form} openModal={openModal} />

      {/* Modal for updating leader */}
      <Modal
        title="Update Leader"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} onFinish={updateLeader}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please input the position" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="New Leader"
            name="leader"
            rules={[{ required: true, message: "Please select a new leader" }]}
          >
            <Select
              value={newLeader}
              onChange={setNewLeader}
              placeholder="Select a leader"
            >
              {nodes
                .filter((n) => n.id !== selectedEmployee?.id) // Avoid self-selection
                .map((node) => (
                  <Select.Option key={node.id} value={node.data.name}>
                    {node.data.name} ({node.data.position})
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end">
            <Button onClick={closeModal} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployeeTable;
