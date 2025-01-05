// import pako from "pako";


export async function handleFileUpload(file, task) {
  console.log(file)
  if (file) {
    try {
      // let fileUrl = await readAsDataURL(file);
      console.log(`Uploading file: ${file.name} for task: ${task.title}`);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);

      console.log('FormData content:', [...formData.entries()]);

      const userID = localStorage.getItem('userID');
      if (!userID) {
        console.error('UserID not found in localStorage');
        return;
      }
      const response = await fetch('https://backend-86dc.onrender.com/api/uploadfile/uploadfile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userID}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        console.log('File uploaded successfully:', data);
      } else {
        console.error('Error uploading file:', data.message);
      }

    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('No file selected');
  }
}
async function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
          resolve(fr.result);
      }
      fr.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  
  // Đảm bảo DOM đã tải xong và phần tử fileContainer đã sẵn sàng
 
    const fileContainer = document.getElementById('fileContainer');
    console.log('fileContainer:', fileContainer);
    
    if (fileContainer) {
      fetchUploadedFiles(); // Nếu fileContainer tồn tại, tiếp tục gọi hàm fetchUploadedFiles
    } else {
      console.error('fileContainer not found in the DOM');
    }
});

// Hàm lấy danh sách file từ server
async function fetchUploadedFiles() {
  try {
    const response = await fetch('https://backend-86dc.onrender.com/api/uploadfile/getfiles');
    const data = await response.json();

    if (data.success) {
      renderUploadedFiles(data.files);
    } else {
      console.error('Error fetching uploaded files:', data.message);
    }
  } catch (error) {
    console.error('Error fetching files:', error);
  }
}

// Hàm hiển thị danh sách file đã tải lên
function renderUploadedFiles(files) {
  const fileContainer = document.getElementById('fileContainer');
  if (!fileContainer) {
    console.error('Error: fileContainer not found in the DOM');
    return;
  }

  fileContainer.innerHTML = '';

  if (files.length === 0) {
    fileContainer.innerHTML = '<p>No files uploaded yet.</p>';
    return;
  }

  // Tạo bảng và tiêu đề cột
  const table = document.createElement('table');
  table.classList.add('file-table');
  
  // Tạo tiêu đề bảng
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Title</th>
    <th>File Name</th>
    <th>Path</th>
  
  `;
  // <th>Actions</th>
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Tạo phần thân bảng
  const tbody = document.createElement('tbody');
  
  files.forEach(file => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${file.title}</td>
      <td>${file.attachments[0].fileName}</td>
      <td>${file.attachments[0].filePath}</td>
      <td>
     
      </td>
    `;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  fileContainer.appendChild(table);
}

