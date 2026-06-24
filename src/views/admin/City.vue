<template>
  <v-container fluid>
    <!-- Header -->

    <div class="d-flex justify-end mb-4">
      <v-btn class="add-city-btn" prepend-icon="mdi-plus" @click="dialog = true"> Add City </v-btn>
    </div>

    <!-- Table Card -->
    <v-card rounded="lg" elevation="0">
      <v-table fixed-header height="400px" density="compact" class="city-table" bordered>
        <thead>
          <tr>
            <th class="text-center">No.</th>
            <th class="text-center">City Name</th>
            <th class="text-center" width="150">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(city, index) in cities" :key="city.id">
            <td class="text-center">{{ index + 1 }}</td>

            <td class="text-center">{{ city.name }}</td>

            <td class="text-center">
              <v-btn density="compact" icon="mdi-pencil"></v-btn>
              <v-btn density="compact" icon="mdi-delete"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Add Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card rounded="lg">
        <v-card-title class="text-h6 font-weight-bold"> Add New City </v-card-title>

        <v-divider />

        <v-card-text class="pt-5">
          <v-text-field
            label="City Name"
            v-model="cityName"
            variant="outlined"
            prepend-inner-icon="mdi-city"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn variant="text" @click="dialog = false"> Cancel </v-btn>

          <v-btn color="primary"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      cityName: '',

      cities: [
        {
          id: 1,
          name: 'Yangon',
        },
        {
          id: 2,
          name: 'Mandalay',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
        {
          id: 3,
          name: 'Naypyidaw',
        },
      ],
    }
  },
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

.add-city-btn {
  background: linear-gradient(135deg, #e48494 0%, rgb(214, 96, 130) 100%) !important;
  color: white;
  font-weight: 600;
  text-transform: none;
  border-radius: 999px;
  padding: 10px 18px;
  box-shadow: 0 8px 20px rgba(228, 132, 148, 0.35);

  transition: all 0.25s ease;
}

.add-city-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 28px rgba(228, 132, 148, 0.45);
}

.add-city-btn:active {
  transform: scale(0.98);
  box-shadow: 0 6px 14px rgba(228, 132, 148, 0.3);
}

.city-table thead th {
  background: #d66182 !important;
  font-weight: 700;

  text-transform: none;
  position: sticky;
  top: 0;
  z-index: 1;
}

.city-table tbody tr:hover {
  background: #f5e2e5;
  transition: 0.2s ease;
}
</style>
