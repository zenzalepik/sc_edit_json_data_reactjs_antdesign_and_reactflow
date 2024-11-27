import React, { useState } from "react";
import { Button, message, Menu, Dropdown } from "antd"; // Menggunakan Menu dan Dropdown dari Ant Design
import { toPng, toJpeg, toSvg } from "html-to-image"; // Import toSvg untuk file SVG
import { jsPDF } from "jspdf"; // Import jsPDF untuk PDF

const ButtonDownload = ({ reactFlowWrapper }) => {
  const [selectedFormat, setSelectedFormat] = useState("png");

  // Fungsi untuk menangani klik menu (pemilihan format)
  const handleMenuClick = (e) => {
    setSelectedFormat(e.key); // Mengubah format berdasarkan item yang dipilih
    handleDownloadClick(e.key); // Segera mulai proses download setelah format dipilih
  };

  const handleDownloadClick = (format) => {
    const element = document.querySelector('.c_diagram_struktur_organisasi');
    const noDownloadElement = document.querySelector('.c_no_download');

    if (!element) {
      message.error('Elemen dengan kelas "c_diagram_struktur_organisasi" tidak ditemukan');
      return;
    }

    // Menentukan lebar dan tinggi elemen
    const scale = 2; // Skala untuk memperbesar ukuran gambar
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Menambahkan kelas .c_hidden_element untuk menyembunyikan elemen sementara
    if (noDownloadElement) {
      noDownloadElement.classList.add('c_hidden_element');
    }

    setTimeout(() => {
      // PNG atau JPG
      if (format === "png" || format === "jpg") {
        const captureFn = format === "png" ? toPng : toJpeg;
        captureFn(element, {
          backgroundColor: '#fff',
          width: elementWidth * scale,
          height: elementHeight * scale,
          style: {
            width: `${elementWidth}px`,
            height: `${elementHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          },
        }).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `Diagram_Sturktur_Organisasi.${format}`;
          link.click();
        }).catch((err) => {
          message.error('Gagal mengekspor gambar');
        });
      }

      // SVG
      if (format === "svg") {
        toSvg(element, {
          backgroundColor: '#fff',
          width: elementWidth * scale,
          height: elementHeight * scale,
          style: {
            width: `${elementWidth}px`,
            height: `${elementHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          },
        }).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "Diagram_Sturktur_Organisasi.svg";
          link.click();
        }).catch((err) => {
          message.error('Gagal mengekspor SVG');
        });
      }

      // PDF
      if (format === "pdf") {
        toPng(element, {
          backgroundColor: '#fff',
          width: elementWidth * scale,
          height: elementHeight * scale,
          style: {
            width: `${elementWidth}px`,
            height: `${elementHeight}px`,
            transform: `scale(${scale*(8.9/10)})`,
            transformOrigin: 'top left',
          },
        }).then((dataUrl) => {
          const pdf = new jsPDF({
            unit: 'px',
            format: [elementWidth * scale, elementHeight * scale], // Menyesuaikan ukuran halaman PDF dengan ukuran konten
          });

          // Menambahkan gambar ke PDF
          pdf.addImage(dataUrl, "PNG", 0, 0, elementWidth * scale, elementHeight * scale);
          pdf.save("Diagram_Sturktur_Organisasi.pdf");
        }).catch((err) => {
          message.error('Gagal mengekspor PDF');
        });
      }

      setTimeout(() => {
        // Menghapus kelas .c_hidden_element setelah proses selesai
        if (noDownloadElement) {
          noDownloadElement.classList.remove('c_hidden_element');
        }
      }, 1500);
    }, 300);
  };

  // Membuat menu untuk memilih format file
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="png">PNG</Menu.Item>
      <Menu.Item key="jpg">JPG</Menu.Item>
      <Menu.Item key="svg">SVG</Menu.Item>
      <Menu.Item key="pdf">PDF</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Tombol Download dengan dropdown menu */}
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          style={{
            position: "absolute",
            top: 20,
            right: 20, // Letakkan tombol download di posisi yang diinginkan
            zIndex: 10,
            width: 150,
          }}
        >
          Download {selectedFormat.toUpperCase()}
        </Button>
      </Dropdown>
    </div>
  );
};

export default ButtonDownload;
