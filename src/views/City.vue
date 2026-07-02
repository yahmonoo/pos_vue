<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
            CityId
        </th>
        <th class="text-left">
          Name
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in cityList"
        :key="item.cityId"
      >
        <td>{{ item.cityId }}</td>
        <td>{{ item.cityName }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import cityService from "../service/CityService.js";
export default {
  data: () => ({
    cityList:[],
  }),
   props: {},
  mounted: function() {
    this.getCity();
  },
  methods: {
    getCity:function(){
        cityService
        .getCity()
        .then((response) => {
          this.cityList.splice(0);
          this.cityList.push(...response);
        })
        .catch((error) => {
          // this.$swal("Fail!", error.response.data.message, "error");
        });

    }
},
  watch: {
},
  components: {}
};

</script>
<style scoped>

</style>