<script>  
    const path2 = window.location.pathname;

    // Helper function to determine if a path is active
    const isActive = (path) => {
      return path2 === path;
    };
  </script>
  
  <nav class="nav-bar">
    <div class="logo">TractDo</div>
    <div class="nav-links use:links">
      <a
        href="/"
        class="nav-link {isActive('/') ? 'active' : ''}"
      >
        Today's Tasks
    </a>
  
      <a
        href="/all-tasks"
        class="nav-link {isActive('/all-tasks') ? 'active' : ''}"
      >
        All Tasks
</a>
    </div>
  </nav>
  
  <style>
    .nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #6c63ff;
      padding: 10px 20px;
      color: white;
    }
  
    .logo {
      font-size: 20px;
      font-weight: bold;
    }
  
    .nav-links {
      display: flex;
      gap: 20px;
    }
  
    .nav-link {
      text-decoration: none;
      color: white;
      font-weight: bold;
      transition: opacity 0.3s ease;
      position: relative;
    }
  
    .nav-link:hover {
      opacity: 0.8;
    }
  
    /* Active link styling with underline */
    .nav-link.active::after {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
    }
  </style>