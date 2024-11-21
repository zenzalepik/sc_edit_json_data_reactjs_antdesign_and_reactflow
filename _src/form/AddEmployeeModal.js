import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { nodes as initialNodes } from '../data/nodes-edges'; // Pastikan path-nya benar

const AddEmployeeModal = ({ onAddEmployee }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Menyimpan status modal
  const [form] = Form.useForm(); // Form instance untuk menangani input data
  
  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Fungsi untuk menambahkan karyawan baru
  const handleAddEmployee = (values) => {
    const newEmployeeId = (Math.random() * 10000).toString(); // ID baru berdasarkan random
    const newEmployeeNode = {
      id: newEmployeeId,
      data: {
        name: values.name,
        position: values.position,
      },
      position: { x: 100, y: 200 }, // Tempatkan di posisi default
      type: 'custom',
    };

    const newEdge = values.leader
      ? {
          id: `e${values.leader}-${newEmployeeId}`,
          source: values.leader,
          target: newEmployeeId,
          type: 'smoothstep',
        }
      : null;

    // Kirim data karyawan ke parent component
    onAddEmployee(newEmployeeNode, newEdge);
    closeModal(); // Tutup modal setelah karyawan ditambahkan
  };

  return (
    <div>
      {/* Button untuk membuka modal */}
      <Button type="primary" onClick={openModal} style={{ marginBottom: 20 }}>
        Add Employee
      </Button>

      {/* Modal dengan Form */}
      <Modal
        title="Add New Employee"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null} // Tidak menggunakan footer default
      >
        <Form form={form} onFinish={handleAddEmployee} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please input the position!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Leader"
            name="leader"
            rules={[{ required: true, message: 'Please select a leader!' }]}
          >
            <Select placeholder="Select Leader">
              {/* Daftar pimpinan yang bisa dipilih */}
              {initialNodes.map((node) => (
                <Select.Option key={node.id} value={node.id}>
                  {node.data.name} ({node.data.position})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={closeModal} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEmployeeModal;
