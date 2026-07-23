<template>
  <v-app>
    <!-- Top Navbar -->
    <v-app-bar app elevation="2" color="#FFC0CB">
      <v-btn icon @click="drawer = !drawer">
        <v-icon icon="mdi-menu" />
      </v-btn>

      <router-link to="/" class="text-decoration-none text-black">
        <v-toolbar-title class="d-flex align-center">
          <v-avatar size="36">
            <v-img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" />
          </v-avatar>
          Glow Skin Cosmetics
        </v-toolbar-title>
      </router-link>

      <v-spacer />
      <!-- LEFT SIDE NAV LINKS -->
      <div class="d-flex align-center ml-4">
        <v-btn to="/" variant="text" v-if="role != 'ADMIN'" class="nav-link d-none d-md-flex">
          Home
        </v-btn>

        <v-btn
          to="/product"
          variant="text"
          v-if="role != 'ADMIN'"
          class="nav-link d-none d-md-flex"
        >
          Product
        </v-btn>

        <v-btn to="/about" variant="text" v-if="role != 'ADMIN'" class="nav-link d-none d-md-flex">
          About Us</v-btn
        >

        <!-- Admin -->

        <v-btn v-if="role == 'ADMIN'" to="/admin" variant="text" class="set-link d-none d-md-flex"
          >Dashboard</v-btn
        >

        <v-menu v-if="role === 'ADMIN'" class="ma-4 pl-5">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text" class="set-link d-none d-md-flex">
              Sale
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="menu in saleMenus"
              :key="menu.to"
              :to="menu.to"
              :prepend-icon="menu.icon"
              :title="menu.title"
            />
          </v-list>
        </v-menu>

        <v-btn
          v-if="role == 'ADMIN'"
          to="/admin/report"
          variant="text"
          class="set-link d-none d-md-flex"
          >Report</v-btn
        >

        <v-menu v-if="role === 'ADMIN'" class="ma-4 pl-5">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text" class="set-link d-none d-md-flex">
              Settings
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="menu in adminMenus"
              :key="menu.to"
              :to="menu.to"
              :prepend-icon="menu.icon"
              :title="menu.title"
            />
          </v-list>
        </v-menu>
      </div>

      <v-spacer />

      <!-- RIGHT ICONS -->
      <v-btn icon class="mr-4" to="/cart" v-if="role !== 'ADMIN'">
        <v-badge :content="cartCount" :value="cartCount" color="pink" overlap>
          <v-icon icon="mdi-cart" color="#d78f99"></v-icon>
        </v-badge>
      </v-btn>

      

      <v-menu v-if="loginUser.userAccountId > 0" class="ma-4 pl-5">
      <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="profile-btn" variant="text">
      
      <!-- Profile Avatar -->
      <v-avatar size="32" class="mr-2">
       
        <v-img 
          v-if="getUserPhoto()" 
          :src="getUserPhoto()" 
          alt="Profile Photo"
          cover 
        />
        
        <v-icon v-else icon="mdi-account-circle" color="grey-darken-1" size="32" />
      </v-avatar>

      <span class="username">{{ loginUser.profileName }}</span>

      <v-icon size="18" class="ml-1">mdi-chevron-down</v-icon>
    </v-btn>
  </template>

  <!-- Dropdown Menu items -->
  <v-list width="200" class="profile-menu">
    <v-list-item class="nav-link">
      <v-list-item-title>Profile</v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-list-item class="nav-link" @click="logout">
      <v-list-item-title class="text-red"> Logout </v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
      <v-btn icon to="/login" v-else>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar / Drawer -->
    <v-navigation-drawer v-model="drawer" app :temporary="$vuetify.display.smAndDown">
      <v-list nav>
        <!-- Customer Menu -->
        <template v-if="role !== 'ADMIN'">
          <v-list-item to="/" title="Home" prepend-icon="mdi-home" />

          <v-list-item to="/product" title="Product" prepend-icon="mdi-package-variant" />

          <v-list-item to="/about" title="About Us" prepend-icon="mdi-information" />
        </template>

        <!-- Admin Menu -->
        <template v-else>
          <v-list-item to="/admin" title="Dashboard" prepend-icon="mdi-view-dashboard" />

          <v-list-group value="sale">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Sale" prepend-icon="mdi-point-of-sale" />
            </template>

            <v-list-item
              v-for="menu in saleMenus"
              :key="menu.to"
              :to="menu.to"
              :title="menu.title"
              :prepend-icon="menu.icon"
            />
          </v-list-group>

          <v-list-item to="/admin/report" title="Report" prepend-icon="mdi-chart-box" />

          <v-list-group value="settings">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Settings" prepend-icon="mdi-cog" />
            </template>

            <v-list-item
              v-for="menu in adminMenus"
              :key="menu.to"
              :to="menu.to"
              :title="menu.title"
              :prepend-icon="menu.icon"
            />
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from "@/config";
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      cartCount: 0,
      role: null,
      adminMenus: [
        {
          title: 'City',
          icon: 'mdi-city',
          to: '/admin/city',
        },

        {
          title: 'Township',
          icon: 'mdi-home-city',
          to: '/admin/township',
        },
        {
          title: 'Category',
          icon: 'mdi-shape',
          to: '/admin/category',
        },
        {
          title: 'Products',
          icon: 'mdi-package-variant',
          to: '/admin/product',
        },
        {
          title: 'User Account',
          icon: 'mdi-account-group',
          to: '/admin/useraccount',
        },
      ],
      loginUser:{},
      saleMenus: [
        {
          title: 'Sale',
          icon: 'mdi-cash-register',
          to: '/admin/sale',
        },

        {
          title: 'Sale List',
          icon: 'mdi-format-list-bulleted',
          to: '/admin/salelist',
        },
      ],
    }
  },
  mounted() {
    this.loginUser = JSON.parse(localStorage.getItem("loginUser"));
    this.role = localStorage.getItem('user_role');
    this.checkLoginState()

    this.updateCartGlobalCount()
    window.addEventListener('cart-local-storage-changed', this.updateCartGlobalCount)
    window.addEventListener('login-state-changed',this.checkLoginState)
  },
  beforeUnmount() {
    window.removeEventListener('cart-local-storage-changed', this.updateCartCount)
    window.removeEventListener('login-state-changed',this.checkLoginState)
  },

  methods: {
  
 getUserPhoto() {
  if (this.loginUser && this.loginUser.photo) {
    const baseURL = axios?.defaults?.baseURL || "http://localhost:8088";
    const cleanBaseURL = baseURL.replace(/\/$/, "");
    return `${cleanBaseURL}/userphoto/${this.loginUser.photo}?t=${new Date().getTime()}`;
  }
  return null;
},
   
  checkLoginState() {
  const savedUser = localStorage.getItem("loginUser");
  if (savedUser) {
    this.loginUser = JSON.parse(savedUser);
    this.role = this.loginUser.userType || this.loginUser.usertype || localStorage.getItem('user_role');
  } else {
    this.loginUser = { userAccountId: 0 };
    this.role = null;
  }
},
    updateCartGlobalCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      this.cartCount = cart.reduce((total, item) => {
        return total + (item.buyQuantity || 1)
      }, 0)
    },
    logout() {
     localStorage.removeItem("loginUser");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user-token");
    
    this.loginUser = { userAccountId: 0 };
    this.role = null;
    
    this.$router.push('/login');
    },
  },
  // created(){
  //   const savedCart =localStorage.getItem('cart');
  //   if(savedCart){
  //     this.cart=JSON.parse(savedCart);
  //   }else{
  //     this.cart=[];
  //   }
  created() {
    // အကယ်၍ local storage ထဲမှာ cart ရှိရင် ကောင်တာ တန်းတွက်ဖို့
        this.checkLoginState()

    this.updateCartGlobalCount()
    this.role = localStorage.getItem('user_role')
  },
}
</script>
<style scoped>
.shop-brand {
  cursor: pointer;
}

.shop-name {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav-link {
  font-size: 16px;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.nav-link:hover {
  background-color: rgba(25, 118, 210, 0.1);
  transform: translateY(-2px);
}

.set-link {
  font-size: 16px;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 20px;
}

.set-link:hover {
  background-color: rgba(25, 118, 210, 0.1);
  transform: translateY(-2px);
}

.profile-btn {
  text-transform: none;
  border-radius: 12px;
  padding: 6px 10px;
}

.profile-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.username {
  font-weight: 500;
  font-size: 14px;
}

.profile-menu {
  border-radius: 12px;
  padding: 6px;
}
</style>
