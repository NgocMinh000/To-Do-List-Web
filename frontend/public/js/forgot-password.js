document.getElementById('forgot-password-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form

  const email = document.getElementById('email').value.trim();

  if (!email) {
    alert('Please enter a valid email address.');
    return;
  }

  try {
    const response = await fetch('https://backend-86dc.onrender.com/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    // Xử lý phản hồi từ server
    const data = await response.json();
    if (response.ok && data.success) {
      alert('Please check your email for password reset instructions.');
    } else {
      alert(data.message || 'There was an error. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
