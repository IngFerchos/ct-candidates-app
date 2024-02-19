<template>
    <header>
      <nav>
          <ul>
              <li><a href="#">Home</a></li>
          </ul>
      </nav>
  </header>
    
  </template>
    
  <script>
  export default {
      name: 'menuHome'
    }
  </script>
    
  <style scoped>
  header {
    background: rgba(0,0,0,0.9);
    width: 100%;;
    z-index: 100;
    border-radius: 5px;
    align-items: center;
    display: flex;
  }
  
  nav {
    float: left;
    display: flex; 
  }
  
  nav ul {
    list-style: none;
    overflow: hidden; 
  }
  
  nav ul li {
    float: left;
    font-family: serif;
    font-size: 20px;
  }
  
  nav ul li a {
    display: block; 
    padding: 20px;
    color: #fff;
    text-decoration: none;
  }
  
  </style>