// src/components/EmployeeTable.js
import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Form, Select } from "antd";
// import { nodes as initialNodes, edges as initialEdges } from "../data/nodes-edges";
import { getLayoutedElements } from './Layout';  // Pastikan impor ini benar

function EmployeeTable({ nodes, edges, setNodes, setEdges, onAddEmployee }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeader, setNewLeader] = useState("");
  const [form] = Form.useForm();

  // Fungsi untuk membuka modal dan set karyawan yang dipilih
  const openModal = (employeeId) => {
    const employee = nodes.find((node) => node.id === employeeId);
    setSelectedEmployee(employee);
    setIsModalOpen(true);

    // Cari pimpinan dari edges yang sesuai
    const leaderEdge = edges.find((edge) => edge.target === employeeId);
    if (leaderEdge) {
      const leader = nodes.find((node) => node.id === leaderEdge.source);
      setNewLeader(leader ? leader.data.name : "");
    } else {
      setNewLeader("");
    }

    // Set nilai pada form saat modal dibuka
    form.setFieldsValue({
      name: employee.data.name,
      position: employee.data.position,
      leader: leaderEdge
        ? leaderEdge.source
          ? nodes.find((node) => node.id === leaderEdge.source)?.data.name
          : ""
        : "",
    });
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewLeader("");
    form.resetFields();
  };

  // Fungsi untuk mengupdate pimpinan
  const updateLeader = (values) => {
    if (!selectedEmployee || !values.leader) return;

    const newLeaderId = nodes.find(
      (node) => node.data.name === values.leader
    )?.id;

    if (newLeaderId) {
      const newEdges = [...edges]; // Salin edges ke array baru
      const existingEdge = newEdges.find(
        (edge) => edge.target === selectedEmployee.id
      );
      if (existingEdge) {
        existingEdge.source = newLeaderId;
      } else {
        newEdges.push({
          id: `e${newLeaderId}-${selectedEmployee.id}`,
          source: newLeaderId,
          target: selectedEmployee.id,
        });
      }
      setEdges(newEdges); // Update state edges dengan array baru

      // Setelah update, terapkan layout otomatis
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, newEdges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }

    updateEmployee(values);
    closeModal();
  };

  const updateEmployee = (values) => {
    if (!selectedEmployee) return;

    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedEmployee.id) {
        return {
          ...node,
          data: {
            ...node.data,
            name: values.name,
            position: values.position,
          },
        };
      }
      return node;
    });

    setNodes(updatedNodes); // Update state nodes dengan array baru
  };

  // Fungsi untuk menghapus employee
  const deleteEmployee = (employeeId) => {
    // Hapus node yang sesuai
    const updatedNodes = nodes.filter((node) => node.id !== employeeId);

    // Hapus edges yang terkait dengan employee yang akan dihapus
    const updatedEdges = edges.filter(
      (edge) => edge.source !== employeeId && edge.target !== employeeId
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

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
        <>
          <Button type="primary" onClick={() => openModal(record.id)}>
            Update Leader
          </Button>
          <Button type="danger" onClick={() => deleteEmployee(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Hook useEffect untuk menyetel form value setelah modal terbuka
  useEffect(() => {
    if (isModalOpen && selectedEmployee) {
      form.setFieldsValue({
        leader: newLeader, // Set nilai leader pada form
      });
    }
  }, [isModalOpen, newLeader, form, selectedEmployee]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Table</h1>
      <Table
        columns={columns}
        dataSource={nodes}
        rowKey="id"
        pagination={false}
      />

      {/* Modal Update Leader */}
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
                .filter((n) => n.id !== selectedEmployee?.id) // Menghindari memilih diri sendiri
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
