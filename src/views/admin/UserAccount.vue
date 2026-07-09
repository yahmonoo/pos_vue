<template>
  <v-container fluid>
    <!-- Header -->

    <div class="d-flex justify-end mb-4">
      <v-btn class="add-btn" prepend-icon="mdi-plus" @click="dialog = true">
        Add UserAccount
      </v-btn>
    </div>

    <!-- Table Card -->
    <v-card rounded="lg" elevation="0">
      <v-table fixed-header height="400px" density="compact" class="c-table">
        <thead>
          <tr>
            <th class="text-center">No.</th>
            <th class="text-center">Township Name</th>
            <th class="text-center">Profile Name</th>
            <th class="text-center"> Phone</th>
            <th class="text-center">Address </th>
            <th class="text-center">Username</th>
            <th class="text-center">Password </th>
                        <th class="text-center">userType </th>

            <th class="text-center" width="150">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in userAccountList"
            :key="item.userAccountId"
            @click="selectedOne = item"
            :style="{
              backgroundColor:
                item.userAccountId == selectedOne.userAccountId ? '#f5e2e5' : 'transparent',
            }"
          >
            <td class="text-center">{{ index + 1 }}</td>

            <td class="text-center">{{ item.townshipName }}</td>
            <td class="text-center">{{ item.profileName }}</td>
            <td class="text-center">{{ item.phone }}</td>
            <td class="text-center">{{ item.address }}</td>
            <td class="text-center">{{ item.userName }}</td>
            <td class="text-center">{{ item.password }}</td>
           <td class="text-center">{{ item.userType }}</td>


            <td class="text-center">
             <v-btn density="compact" icon="mdi-image" @click="viewPhoto(item)"></v-btn>

              <v-btn density="compact" icon="mdi-pencil" @click="editUseraccount(item)"></v-btn>
              <v-btn density="compact" icon="mdi-delete" @click="deleteUseraccount(item)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Add Dialog -->
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card rounded="xl" class="cdialog">
        <!-- Header -->
        <div class="dialog-header">
          <div class="d-flex align-center">
            <div>
              <div class="text-h6 font-weight-bold">Add New Useraccount</div>
            </div>
          </div>
        </div>

        <v-card-text class="pa-6">
          <v-text-field
            v-model.number="userForm.townshipId"
            class="cinput mb-3"
            label="Township Id"
            type="number"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model="userForm.profileName"
            class="cinput mb-3"
            label="Profile Name"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model="userForm.phone"
            class="cinput mb-3"
            label="Phone"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model="userForm.address"
            class="cinput mb-3"
            label=" Address"
            variant="outlined"
            density="compact"
          />
          <v-row dense class="mb-3">
            <v-col cols="6">
              <v-text-field
            v-model="userForm.userName"
            class="cinput"
            label="Username"
            variant="outlined"
            density="compact"
          />
            </v-col>
            <v-col cols="6">
              <v-text-field
            v-model="userForm.password"
            class="cinput "
            label="Password"
            variant="outlined"
            density="compact"
            type="password"
          />
            </v-col>
          </v-row>
          <v-select
            v-model="userForm.userType"
            :items="['ADMIN','ACCOUNTANT','CUSTOMER']"
            class="cinput"
            label="User Type"
            variant="outlined"
            density="compact"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn variant="tonal" rounded="pill" class="mr-2" @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn rounded="pill" class="add-btn" @click="saveuseraccount"> {{ saveOrUpdate }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog  -->
    <v-col>
      <v-dialog v-model="dialogDelete" width="500">
        <v-card>
          <v-card-title class="text-h5 white--text bg-red"> Delete </v-card-title>

          <v-card-text class="text-h6">
            Are you sure to delete({{ selectedOne.profileName || selectedOne.userName }})?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="black" text @click="dialogDelete = false"> CANCEL </v-btn>
            <v-btn dark class="bg-red" text @click="clickDeleteDialog()"> DELETE </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>
import UserAccountService from '../../service/UserAccountService'
export default {
  data() {
    return {
      dialog: false,
      selectedOne: {},
      saveOrUpdate: 'SAVE',
      dialogDelete: false,
      userAccountList: [],
      userForm:{
        userAccountId:0,
        townshipId:null,
        townshipName:'',
        profileName:'',
        phone:'',
        address:'',
        userName:'',
        password:'',
        userType:'ADMIN',
        }
      
        
    }
  },
  props: {},
  mounted: function () {
        this.userAccountListMethod()

  },
  methods: {
    userAccountListMethod() {
      UserAccountService
        .getUserAccount()
        .then((response) => {
          this.userAccountList.splice(0, this.userAccountList.length)
          this.userAccountList.push(...response)
        })
        // .catch((error) => {
        //   this.$swal('Fail!', error.response.data.message, 'error')
       // })
    },
    saveuseraccount() {

      const payload={
        ...this.userForm, date:new Date().toISOString()
      };
      if (this.saveOrUpdate == 'SAVE') {
        delete payload.userAccountId;
        console.log(this.saveOrUpdate)
                            console.log(this.userForm);


        UserAccountService
          .addUseraccount(this.userForm)
          .then((response) => {
            this.dialog=false
            this.userForm()
            this.userAccountListMethod()}
        )
          .catch((error) => {
            // this.$swal('Fail!', error.response.data.message, 'error')
            
          })
      } else {
        if(!payload.userAccountId){
          alert("Error");
          return;
        }
        console.log(this.saveOrUpdate)

        UserAccountService
          .updateUseraccount(this.userForm)
          .then((response) => {
         this.dialog=false
            this.userAccountListMethod()})
          .catch((error) => {
            // this.$swal('Fail!', error.response.data.message, 'error')
          })
      }
    },
    editUseraccount(item) {
      console.log(item)
      
      this.saveOrUpdate = 'UPDATE'
      this.userForm = { ...item };
      this.dialog = true
    },
    deleteUseraccount(item) {
      this.dialogDelete = true
      this.selectedOne = { ...item }
      console.log(item)
    },
    clickDeleteDialog() {
      UserAccountService
        .deleteUseraccount(this.selectedOne)
        .then((response) => {
          this.dialogDelete = false
        })
        .catch((error) => {
          // this.$swal('Fail!', error.response.data.message, 'error')
        })
    },
  },
  watch: {},
  components: {},
}
</script>

<style scoped>
.v-table {
  background: transparent;
}

.v-table thead th {
  font-weight: 700;
  background: #f8fafc;
}

.v-table tbody tr:hover {
  background: #f8fafc;
  transition: 0.2s;
}

table,
th,
td {
  border: 1px solid rgb(215, 215, 215);
  border-collapse: collapse;
  padding: 0 3px !important;
}

.add-btn {
  background: linear-gradient(135deg, #e48494 0%, rgb(214, 96, 130) 100%) !important;
  color: white;
  font-weight: 600;
  text-transform: none;
  border-radius: 999px;
  padding: 10px 18px;
  box-shadow: 0 8px 20px rgba(228, 132, 148, 0.35);

  transition: all 0.25s ease;
}

.add-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 28px rgba(228, 132, 148, 0.45);
}

.add-btn:active {
  transform: scale(0.98);
  box-shadow: 0 6px 14px rgba(228, 132, 148, 0.3);
}

.c-table thead th {
  background: #d66182 !important;
  font-weight: 700;

  text-transform: none;
  position: sticky;
  top: 0;
  z-index: 1;
}

/* .c-table tbody tr:hover {
  background: #f5e2e5;
  transition: 0.2s ease;
} */

.cdialog {
  overflow: hidden;
  border: 1px solid #f4d7de;
}

.dialog-header {
  background: linear-gradient(135deg, #e48494 0%, #d66182 100%);
  padding: 22px;
  color: white;
}

.cinput :deep(.v-field) {
  box-shadow: 0 0 0 3px rgba(35, 32, 33, 0.15);
  padding-left: 12px;
}

.cinput :deep(.v-field--focused) {
  box-shadow: 0 0 0 3px rgba(35, 32, 33, 0.15);
  padding-left: 12px;
}

.cinput :deep(.v-label.v-field-label) {
  background: white;
  padding: 0 3px;
}
</style>
